import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Keyboard, Zap, Play, RotateCcw, Save, Search, Plus, Replace } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HelpModal({ isOpen, onClose }: HelpModalProps) {
  const shortcuts = [
    { key: 'Ctrl + Enter', desc: 'Run code / Update preview', icon: <Play className="w-3 h-3" /> },
    { key: 'Alt + Shift + F', desc: 'Format code', icon: <Zap className="w-3 h-3" /> },
    { key: 'Ctrl + M', desc: 'Create new file', icon: <Plus className="w-3 h-3" /> },
    { key: 'Ctrl + /', desc: 'Show this help modal', icon: <Keyboard className="w-3 h-3" /> },
    { key: 'Ctrl + S', desc: 'Auto-saved to local storage', icon: <Save className="w-3 h-3" /> },
    { key: 'Ctrl + F', desc: 'Search in editor', icon: <Search className="w-3 h-3" /> },
    { key: 'Ctrl + H', desc: 'Replace in editor', icon: <Replace className="w-3 h-3" /> },
    { key: 'Alt + R', desc: 'Reset current file', icon: <RotateCcw className="w-3 h-3" /> },
  ];

  const features = [
    { title: 'Multi-Language', desc: 'Support for C, C++, Java, Python, JS, TS, and more.' },
    { title: 'AI Execution', desc: 'C, C++, and Java are executed via an AI-powered sandbox.' },
    { title: 'Live Preview', desc: 'Instant feedback for HTML and CSS projects.' },
    { title: 'Persistence', desc: 'Your work is automatically saved in your browser.' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-surface border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-bg/50">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-muted" />
                <h2 className="text-lg font-bold text-ink tracking-tight">Shortcuts & Help</h2>
              </div>
              <button onClick={onClose} className="p-1 hover:bg-border/50 rounded-lg transition-colors">
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto max-h-[70vh] space-y-8">
              <section>
                <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-muted" /> Keyboard Shortcuts
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {shortcuts.map((s, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-bg border border-border group hover:border-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 rounded bg-surface border border-border text-muted">
                          {s.icon}
                        </div>
                        <span className="text-sm font-medium text-ink">{s.desc}</span>
                      </div>
                      <kbd className="px-2 py-1 bg-surface border border-border rounded text-[10px] font-bold text-muted">
                        {s.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4">Core Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((f, i) => (
                    <div key={i} className="space-y-1">
                      <h4 className="text-sm font-bold text-ink">{f.title}</h4>
                      <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="px-6 py-4 bg-bg border-t border-border flex justify-end">
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-ink hover:bg-muted text-bg rounded-lg text-sm font-bold transition-all border border-border active:scale-95"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
