import React, { useState, useRef, memo, useCallback } from 'react';
import MonacoEditor, { OnMount, loader } from '@monaco-editor/react';
import { Language } from '../types';
import { Play, RotateCcw, Copy, Check, Download, Wand2, PanelLeftClose, PanelLeftOpen, Terminal } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';
import { cn } from '../lib/utils';
import Breadcrumbs from './Breadcrumbs';
import { defineThemes } from '../lib/editorThemes';

// Initialize themes
loader.init().then(monaco => {
  defineThemes(monaco);
});

interface EditorProps {
  language: Language;
  code: string;
  filename: string;
  onChange: (value: string | undefined) => void;
  onRun: () => void;
  onReset: () => void;
  isExecuting: boolean;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  isConsoleVisible: boolean;
  onToggleConsole: () => void;
  isMobile?: boolean;
}

const Editor = memo(function Editor({ 
  language, 
  code, 
  filename, 
  onChange, 
  onRun, 
  onReset, 
  isExecuting,
  isSidebarOpen,
  onToggleSidebar,
  isConsoleVisible,
  onToggleConsole,
  isMobile = false
}: EditorProps) {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const editorRef = useRef<any>(null);

  const handleEditorMount: OnMount = useCallback((editor) => {
    editorRef.current = editor;
  }, []);

  const handleFormat = useCallback(async () => {
    if (editorRef.current) {
      setIsFormatting(true);
      try {
        await editorRef.current.getAction('editor.action.formatDocument').run();
      } catch (err) {
        console.error('Formatting failed:', err);
      } finally {
        setTimeout(() => setIsFormatting(false), 500);
      }
    }
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }, [code]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || `main.${language.extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [code, filename, language.extension]);

  return (
    <div className="flex flex-col h-full bg-surface transition-colors">
      <div className="flex items-center justify-between px-4 md:px-6 py-2.5 border-b border-border/50 bg-surface">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <button 
              onClick={onToggleSidebar}
              className="hidden md:flex p-1.5 rounded-md hover:bg-bg text-muted hover:text-ink transition-colors border border-transparent hover:border-border mr-1"
              title={isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            >
              {isSidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
            </button>
            <span className="hidden sm:inline text-[10px] font-bold text-muted uppercase tracking-widest">Active File</span>
            <span className="text-[10px] sm:text-xs font-mono font-medium text-ink px-2 py-0.5 bg-bg rounded border border-border">
              {filename}
            </span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-border" />
          <div className="flex items-center gap-3 md:gap-4">
            <button 
              onClick={handleFormat}
              className={cn(
                "flex items-center gap-1.5 text-[10px] sm:text-xs font-medium transition-colors",
                isFormatting ? "text-ink font-bold" : "text-muted hover:text-ink"
              )}
              aria-label="Format code"
              title="Format code"
            >
              <Wand2 className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5")} />
              <span className="hidden xs:inline">{isFormatting ? 'Formatting...' : 'Format'}</span>
            </button>
            <button 
              onClick={onReset}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-muted hover:text-ink transition-colors"
              aria-label="Reset code"
              title="Reset code"
            >
              <RotateCcw className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline">Reset</span>
            </button>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-muted hover:text-ink transition-colors"
              aria-label="Copy code"
              title="Copy code"
            >
              {copied ? <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-ink" /> : <Copy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
              <span className="hidden xs:inline">{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-muted hover:text-ink transition-colors"
              aria-label="Download code"
              title="Download code"
            >
              <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline">Download</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.02 }}
            onClick={onRun}
            disabled={isExecuting}
            className="flex items-center gap-2 px-4 sm:px-6 py-1.5 sm:py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-surface disabled:text-muted disabled:cursor-not-allowed text-white rounded-xl text-[10px] sm:text-sm font-bold border border-blue-500/20 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
          >
            {isExecuting ? (
              <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            )}
            <span className="whitespace-nowrap uppercase tracking-widest">
              {isExecuting ? 'Running' : (language.category === 'web' ? 'Preview' : 'Run')}
            </span>
          </motion.button>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col min-h-0 bg-surface">
        <Breadcrumbs language={language} activeFileName={filename} />
        <div className="flex-1 relative">
          <MonacoEditor
            height="100%"
            language={language.monaco}
            value={code}
            theme={theme === 'dark' ? 'polycode-dark' : 'polycode-light'}
            onChange={onChange}
            onMount={handleEditorMount}
          options={{
            fontSize: isMobile ? 13 : 14,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: isMobile ? 12 : 20 },
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            lineNumbersMinChars: isMobile ? 2 : 3,
            renderLineHighlight: "none",
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              useShadows: false,
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
            },
            overviewRulerBorder: false,
            hideCursorInOverviewRuler: true,
            glyphMargin: false,
            folding: true,
            lineNumbers: "on",
            renderWhitespace: "none",
            bracketPairColorization: { enabled: true },
            guides: { bracketPairs: true, indentation: true },
          }}
        />
      </div>
    </div>
  </div>
  );
});

export default Editor;
