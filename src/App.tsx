/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback, useEffect } from 'react';
import { useMediaQuery } from './hooks/useMediaQuery';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Console from './components/Console';
import HelpModal from './components/HelpModal';
import { Language, LANGUAGES, ExecutionResult, File } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { ThemeProvider } from './components/ThemeProvider';
import ThemeToggle from './components/ThemeToggle';
import SEOContent from './components/SEOContent';
import { cn } from './lib/utils';
import { Menu, X, HelpCircle, Plus, Terminal, Play, PanelLeftClose, PanelLeftOpen, Zap } from 'lucide-react';

function AppContent() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('polycode_selected_lang');
    if (saved) {
      const found = LANGUAGES.find(l => l.id === saved);
      if (found) return found;
    }
    return LANGUAGES[0];
  });

  const [files, setFiles] = useState<Record<string, File[]>>(() => {
    const saved = localStorage.getItem('polycode_saved_files');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved files', e);
      }
    }
    return Object.fromEntries(LANGUAGES.map(l => [
      l.id, 
      [{ id: 'main', name: `main.${l.extension}`, content: l.defaultCode, isDefault: true }]
    ]));
  });

  const [activeFileId, setActiveFileId] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('polycode_active_file_id');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return Object.fromEntries(LANGUAGES.map(l => [l.id, 'main']));
  });

  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isConsoleVisible, setIsConsoleVisible] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(new Date());

  // Persistence Effects with debouncing for performance
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('polycode_saved_files', JSON.stringify(files));
      setLastSaved(new Date());
    }, 1000);
    return () => clearTimeout(timeout);
  }, [files]);

  useEffect(() => {
    localStorage.setItem('polycode_selected_lang', selectedLanguage.id);
  }, [selectedLanguage]);

  useEffect(() => {
    localStorage.setItem('polycode_active_file_id', JSON.stringify(activeFileId));
  }, [activeFileId]);

  const activeFile = files[selectedLanguage.id]?.find(f => f.id === activeFileId[selectedLanguage.id]) 
    || files[selectedLanguage.id]?.[0];

  const handleCodeChange = useCallback((value: string | undefined) => {
    if (value !== undefined && activeFile) {
      setFiles(prev => {
        const langFiles = prev[selectedLanguage.id] || [];
        const newFiles = langFiles.map(f => 
          f.id === activeFile.id ? { ...f, content: value } : f
        );
        return { ...prev, [selectedLanguage.id]: newFiles };
      });
    }
  }, [selectedLanguage.id, activeFile?.id]);

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    setResult(null);
    setIsSidebarOpen(false);
  };

  const handleCreateFile = (name?: string) => {
    let fileName = name;
    if (fileName === undefined || fileName === null) {
      fileName = window.prompt('Enter file name (e.g. utils.py):') || undefined;
    }
    
    if (fileName && fileName.trim()) {
      const finalName = fileName.trim();
      const id = Date.now().toString();
      
      setFiles(prev => {
        const langFiles = prev[selectedLanguage.id] || [];
        if (langFiles.some(f => f.name === finalName)) {
          alert('A file with this name already exists.');
          return prev;
        }
        
        const updatedFiles = {
          ...prev,
          [selectedLanguage.id]: [...langFiles, { id, name: finalName, content: '' }]
        };
        return updatedFiles;
      });
      setActiveFileId(prev => ({ ...prev, [selectedLanguage.id]: id }));
    }
  };

  const handleRenameFile = (fileId: string, newName?: string) => {
    let updatedName = newName;
    if (updatedName === undefined) {
      const file = files[selectedLanguage.id]?.find(f => f.id === fileId);
      if (!file) return;
      updatedName = window.prompt('Enter new file name:', file.name) || undefined;
    }

    if (updatedName && updatedName.trim()) {
      const finalName = updatedName.trim();
      setFiles(prev => {
        const langFiles = prev[selectedLanguage.id] || [];
        const file = langFiles.find(f => f.id === fileId);
        if (!file || file.name === finalName) return prev;

        if (langFiles.some(f => f.name === finalName)) {
          alert('A file with this name already exists.');
          return prev;
        }

        const newFiles = langFiles.map(f => 
          f.id === fileId ? { ...f, name: finalName } : f
        );
        return { ...prev, [selectedLanguage.id]: newFiles };
      });
    }
  };

  const handleDeleteFile = (fileId: string) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      setFiles(prev => {
        const langFiles = prev[selectedLanguage.id] || [];
        if (langFiles.length <= 1) return prev;
        
        const newFiles = langFiles.filter(f => f.id !== fileId);
        
        // Update active file if we deleted it
        if (activeFileId[selectedLanguage.id] === fileId) {
          setActiveFileId(activePrev => ({ 
            ...activePrev, 
            [selectedLanguage.id]: newFiles[0].id 
          }));
        }

        return {
          ...prev,
          [selectedLanguage.id]: newFiles
        };
      });
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset this file to default code?')) {
      if (activeFile?.isDefault) {
        handleCodeChange(selectedLanguage.defaultCode);
      } else {
        handleCodeChange('');
      }
      setResult(null);
    }
  };

  const handleClearConsole = () => {
    setResult(null);
  };

  const runCode = useCallback(async () => {
    if (!activeFile) return;
    
    if (selectedLanguage.category === 'web') {
      setResult({
        stdout: 'Preview updated.',
        stderr: '',
        output: 'Preview updated.',
        time: 0
      });
      return;
    }

    setIsLoading(true);
    setResult(null);
    setIsConsoleVisible(true);
    
    try {
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: selectedLanguage.id,
          code: activeFile.content,
          files: files[selectedLanguage.id]?.map(f => ({ name: f.name, content: f.content })),
          entry: activeFile.name
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult({
          stdout: data.run.stdout,
          stderr: data.run.stderr,
          output: data.run.output,
          code: data.run.code,
          time: data.run.time,
        });
      } else {
        setResult({
          stdout: '',
          stderr: data.message,
          output: data.message,
          error: data.message,
        });
      }
    } catch (err) {
      setResult({
        stdout: '',
        stderr: 'Network error occurred',
        output: 'Network error occurred',
        error: 'Network error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  }, [activeFile, selectedLanguage, files]);

  // Keyboard shortcut: Ctrl/Cmd + Enter to run
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        setIsHelpOpen(true);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setIsSidebarOpen(prev => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        handleCreateFile();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [files, selectedLanguage, activeFileId]); // Re-bind when state changes

  const [consoleWidth, setConsoleWidth] = useState(450);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth > 200 && newWidth < window.innerWidth - 300) {
        setConsoleWidth(newWidth);
      }
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResizing);
    } else {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, resize, stopResizing]);

  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <div className="h-screen bg-bg text-ink selection:bg-muted/30 overflow-y-auto overflow-x-hidden scroll-smooth">
      <div className="h-full flex flex-col shrink-0">
        {/* Global Header */}
        <header className="flex items-center justify-between px-4 py-2.5 bg-surface border-b border-border shrink-0 z-50 shadow-sm relative">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-blue-600/20">
              <Zap className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm text-ink tracking-tight leading-none">LiveCompile</span>
              <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest leading-none mt-1">Engine v2.0</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button 
              onClick={() => setIsHelpOpen(true)}
              className="p-2 sm:p-2.5 rounded-xl bg-surface border border-border shadow-sm hover:border-blue-500/30 hover:bg-bg transition-all group overflow-hidden relative"
              aria-label="Help"
              title="Help"
            >
              <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-muted group-hover:text-ink transition-colors relative z-10" />
            </button>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 sm:p-2.5 rounded-xl bg-surface border border-border shadow-sm hover:border-blue-500/30 hover:bg-bg transition-all group overflow-hidden relative ml-1"
              aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
              title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isSidebarOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-muted group-hover:text-ink relative z-10" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-muted group-hover:text-ink relative z-10" />}
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-row min-h-0 overflow-hidden relative">
          {/* Sidebar - Responsive */}
          <AnimatePresence mode="wait">
            {(isSidebarOpen || !isMobile) && (
              <motion.div
            initial={isMobile ? { x: -256 } : { width: 0, opacity: 0 }}
            animate={isSidebarOpen ? { x: 0, width: 256, opacity: 1 } : (isMobile ? { x: -256 } : { width: 0, opacity: 0, overflow: 'hidden' })}
            exit={isMobile ? { x: -256 } : { width: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed inset-y-0 left-0 z-40 md:relative md:flex shrink-0 border-r border-border",
              !isSidebarOpen && isMobile && "hidden"
            )}
          >
            <Sidebar 
              selectedLanguage={selectedLanguage} 
              onSelect={handleLanguageSelect}
              files={files[selectedLanguage.id] || []}
              activeFileId={activeFile?.id || ''}
              onFileSelect={(id) => setActiveFileId(prev => ({ ...prev, [selectedLanguage.id]: id }))}
              onCreateFile={handleCreateFile}
              onRenameFile={handleRenameFile}
              onDeleteFile={handleDeleteFile}
              onShowHelp={() => setIsHelpOpen(true)}
              onShowAbout={() => {
                setIsSidebarOpen(false);
                const aboutSection = document.getElementById('about-us');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onShowDoc={() => {
                setIsSidebarOpen(false);
                const docSection = document.getElementById('documentation');
                if (docSection) {
                  docSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <main id="ide-container" className="flex-1 flex flex-col min-w-0 relative h-full overflow-hidden" role="main">
        <div className="flex-1 flex flex-col md:flex-row min-w-0 overflow-hidden">
          <div className="flex-1 flex flex-col min-w-0 min-h-0">
            <Editor 
              language={selectedLanguage}
              code={activeFile?.content || ''}
              filename={activeFile?.name || ''}
              onChange={handleCodeChange}
              onRun={runCode}
              onReset={handleReset}
              isExecuting={isLoading}
              isSidebarOpen={isSidebarOpen}
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              isConsoleVisible={isConsoleVisible}
              onToggleConsole={() => setIsConsoleVisible(!isConsoleVisible)}
              isMobile={isMobile}
            />
          </div>
          
          <div 
            className="hidden md:block w-1 hover:bg-muted/50 cursor-col-resize transition-colors z-20 relative group"
            onMouseDown={startResizing}
          >
            <div className="absolute inset-y-0 -left-2 -right-2 cursor-col-resize" />
          </div>

          <AnimatePresence>
            {isConsoleVisible && (
              <motion.div 
                initial={isMobile ? { y: '100%' } : { x: '100%', opacity: 0 }}
                animate={{ y: 0, x: 0, opacity: 1 }}
                exit={isMobile ? { y: '100%' } : { x: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className={cn(
                  "bg-terminal-bg min-w-0 shrink-0 flex flex-col border-t md:border-t-0 md:border-l border-border/20 shadow-[0_-4px_12px_rgba(0,0,0,0.1)] md:shadow-none",
                  isMobile ? "fixed inset-x-0 bottom-12 z-40 rounded-t-xl overflow-hidden" : "relative"
                )}
                style={{ 
                  width: !isMobile ? `${consoleWidth}px` : '100%',
                  height: isMobile ? '50%' : '100%'
                }}
              >
                {selectedLanguage.category === 'web' ? (
                  <div className="flex-1 h-full flex flex-col bg-white overflow-hidden">
                    <div className="h-10 border-b border-slate-200 bg-slate-50 flex items-center px-4 justify-between shrink-0">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Live Preview</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Active</span>
                      </div>
                    </div>
                    <iframe
                      title="Preview"
                      className="flex-1 w-full border-none"
                      srcDoc={selectedLanguage.id === 'css' ? `
                        <!DOCTYPE html>
                        <html>
                          <head><style>${activeFile?.content || ''}</style></head>
                          <body><div class="box">CSS Preview</div></body>
                        </html>
                      ` : (activeFile?.content || '')}
                      sandbox="allow-scripts"
                    />
                  </div>
                ) : (
                  <Console 
                    result={result} 
                    isLoading={isLoading} 
                    onClear={handleClearConsole} 
                    onClose={() => setIsConsoleVisible(false)} 
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <footer className="hidden md:flex h-8 bg-surface border-t border-border items-center justify-between px-6 text-[10px] text-muted font-bold uppercase tracking-widest transition-colors shrink-0" role="contentinfo">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-ink">
              <div className="w-1 h-1 rounded-full bg-muted" />
              Environment: Cloud Node
            </span>
            <span className="flex items-center gap-1.5 text-muted">
              <div className="w-1 h-1 rounded-full bg-ink" />
              Auto-save active {lastSaved && `(Saved ${lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsHelpOpen(true)} className="hover:text-ink transition-colors flex items-center gap-1">
              <HelpCircle className="w-3 h-3" /> Shortcuts
            </button>
            <span>UTF-8</span>
          </div>
        </footer>

        {/* Mobile Status Bar */}
        <div className="md:hidden h-12 bg-surface/95 backdrop-blur-md border-t border-border flex items-center justify-between px-4 shrink-0 z-50 shadow-[0_-1px_10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-bg/50 px-2 py-1 rounded-full border border-border/50">
              <div className={cn(
                "w-2 h-2 rounded-full",
                isLoading ? "bg-muted animate-pulse" : "bg-ink"
              )} />
              <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                {isLoading ? 'Running' : 'Ready'}
              </span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex flex-col">
              <span className="text-[10px] text-ink font-mono font-bold leading-none">
                {selectedLanguage.name}
              </span>
              <span className="text-[8px] text-muted font-medium uppercase tracking-tighter">
                Language
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsConsoleVisible(!isConsoleVisible)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight transition-all border active:scale-95",
                isConsoleVisible 
                  ? "text-bg bg-ink border-ink" 
                  : "text-muted bg-surface border-border"
              )}
            >
              <Terminal className="w-4 h-4" />
              Terminal
            </button>
          </div>
        </div>
      </main>
        </div>
      </div>

      <SEOContent />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

