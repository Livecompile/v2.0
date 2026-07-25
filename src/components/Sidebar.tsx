import React, { memo, useState } from 'react';
import { Language, LANGUAGES, File } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Code2, 
  Settings, 
  Plus, 
  FileCode, 
  Trash2, 
  HelpCircle,
  FolderOpen,
  Pencil,
  Star,
  BookOpen,
  Keyboard,
  Check,
  X
} from 'lucide-react';

interface SidebarProps {
  selectedLanguage: Language;
  onSelect: (lang: Language) => void;
  files: File[];
  activeFileId: string;
  onFileSelect: (id: string) => void;
  onCreateFile: (name: string) => void;
  onRenameFile: (id: string, newName: string) => void;
  onDeleteFile: (id: string) => void;
  onShowHelp: () => void;
  onShowAbout: () => void;
  onShowDoc: () => void;
}

const Sidebar = memo(function Sidebar({ 
  selectedLanguage, 
  onSelect, 
  files, 
  activeFileId, 
  onFileSelect, 
  onCreateFile, 
  onRenameFile,
  onDeleteFile,
  onShowHelp,
  onShowAbout,
  onShowDoc
}: SidebarProps) {
  const [isCreating, setIsCreating] = React.useState(false);
  const [newName, setNewName] = React.useState('');
  const [renamingId, setRenamingId] = React.useState<string | null>(null);
  const [renameValue, setRenameValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if ((isCreating || renamingId) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCreating, renamingId]);

  const handleCreateSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newName.trim()) {
      onCreateFile(newName.trim());
      setNewName('');
      setIsCreating(false);
    } else {
      setIsCreating(false);
    }
  };

  const handleRenameSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (renamingId && renameValue.trim()) {
      onRenameFile(renamingId, renameValue.trim());
      setRenamingId(null);
      setRenameValue('');
    } else {
      setRenamingId(null);
    }
  };

  return (
    <div className="w-full bg-surface border-r border-border flex flex-col h-full shrink-0 transition-colors shadow-2xl md:shadow-none overflow-hidden">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6 pt-5">
        {/* Files Section */}
        <section className="space-y-1">
          <div className="px-3 py-2 flex items-center justify-between">
            <h2 className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1.5">
              <FolderOpen className="w-3 h-3" /> Explorer
            </h2>
            <button 
              onClick={() => setIsCreating(true)}
              className="p-1 hover:bg-muted/10 text-muted hover:text-ink rounded transition-colors"
              title="New File"
              aria-label="Create new file"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-0.5">
            {isCreating && (
              <form onSubmit={handleCreateSubmit} className="px-3 py-1">
                <input
                  ref={inputRef}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onBlur={() => handleCreateSubmit()}
                  placeholder="filename.py"
                  className="w-full bg-bg border border-border rounded px-2 py-1 text-xs text-ink focus:outline-none focus:ring-1 focus:ring-ink"
                />
              </form>
            )}
            {files.map((file) => (
              <div
                key={file.id}
                onClick={() => onFileSelect(file.id)}
                className={cn(
                  "group flex items-center justify-between px-3 py-1.5 rounded-lg cursor-pointer transition-all",
                  activeFileId === file.id 
                    ? "bg-ink text-bg font-bold" 
                    : "text-muted hover:bg-bg hover:text-ink"
                )}
              >
                <div className="flex items-center gap-2 overflow-hidden flex-1">
                  <FileCode className={cn("w-3.5 h-3.5 shrink-0", activeFileId === file.id ? "text-bg" : "text-slate-400")} />
                  {renamingId === file.id ? (
                    <form onSubmit={handleRenameSubmit} className="flex-1">
                      <input
                        ref={inputRef}
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={() => handleRenameSubmit()}
                        className="w-full bg-bg border border-border rounded px-1 py-0.5 text-xs text-ink focus:outline-none"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </form>
                  ) : (
                    <span className={cn("text-xs truncate transition-colors", activeFileId === file.id ? "font-semibold" : "")}>{file.name}</span>
                  )}
                </div>
                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all shrink-0">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setRenamingId(file.id);
                      setRenameValue(file.name);
                    }}
                    className={cn(
                      "p-1 rounded-md transition-all",
                      activeFileId === file.id ? "hover:bg-surface/20" : "hover:bg-ink/10"
                    )}
                    title="Rename"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                  {!file.isDefault && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteFile(file.id);
                      }}
                      className={cn(
                        "p-1 rounded-md transition-all",
                        activeFileId === file.id ? "hover:bg-surface/20" : "hover:bg-ink/10"
                      )}
                      title="Delete"
                      aria-label={`Delete ${file.name}`}
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Languages Section */}
        <section className="space-y-1">
          <h2 className="px-3 py-2 text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-1.5">
            <Terminal className="w-3 h-3" /> Languages
          </h2>
          <div className="space-y-0.5">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => onSelect(lang)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all",
                  selectedLanguage.id === lang.id
                    ? "bg-ink text-bg border border-border"
                    : "text-muted hover:bg-bg hover:text-ink"
                )}
              >
                <div className={cn(
                  "w-5 h-5 flex items-center justify-center rounded-md overflow-hidden shrink-0",
                  selectedLanguage.id === lang.id ? "bg-bg" : "bg-surface border border-border/50"
                )}>
                  <img 
                    src={lang.logo} 
                    alt={lang.name} 
                    className="w-3.5 h-3.5 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-xs font-medium">{lang.name}</span>
                {selectedLanguage.id === lang.id && (
                  <motion.div layoutId="active-indicator" className="ml-auto w-1.5 h-1.5 rounded-full bg-bg" />
                )}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className="p-3 border-t border-border bg-bg/30 space-y-1">
        <button 
          onClick={onShowAbout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted hover:text-ink hover:bg-surface border border-transparent hover:border-border transition-all text-left group"
        >
          <Star className="w-4 h-4 group-hover:scale-105 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">About Us</span>
        </button>
        <button 
          onClick={onShowDoc}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted hover:text-ink hover:bg-surface border border-transparent hover:border-border transition-all text-left group"
        >
          <BookOpen className="w-4 h-4 group-hover:scale-105 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Documentation</span>
        </button>
        <button 
          onClick={onShowHelp} 
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted hover:text-ink hover:bg-surface transition-all text-left group"
        >
          <Keyboard className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Shortcuts</span>
        </button>
        <button 
          onClick={onShowHelp}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-muted hover:text-ink hover:bg-surface transition-all text-left group"
        >
          <HelpCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Help Center</span>
        </button>
      </div>
    </div>
  );
});

export default Sidebar;
