import React, { memo } from 'react';
import { Terminal, Play, Loader2, XCircle, CheckCircle2, History, Trash2 } from 'lucide-react';
import { ExecutionResult } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface ConsoleProps {
  result: ExecutionResult | null;
  isLoading: boolean;
  onClear: () => void;
  onClose?: () => void;
}

const Console = memo(function Console({ result, isLoading, onClear, onClose }: ConsoleProps) {
  return (
    <div className="flex flex-col h-full bg-surface text-ink font-mono text-sm border-t md:border-t-0 md:border-l border-border/50 transition-colors">
      <div className="flex items-center justify-between px-5 py-3 bg-surface border-b border-border/20">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-muted" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted">Output Console</span>
        </div>
        <div className="flex items-center gap-3">
          {result && !isLoading && (
            <>
              {result.error || result.stderr ? (
                <span className="flex items-center gap-1 text-[10px] text-muted font-bold uppercase">
                  <XCircle className="w-3 h-3" /> Error
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] text-ink font-bold uppercase">
                  <CheckCircle2 className="w-3 h-3" /> Success
                </span>
              )}
            </>
          )}
          <button 
            onClick={onClear}
            className="p-1.5 hover:bg-bg rounded-md text-muted hover:text-ink transition-all flex items-center gap-1.5 group"
            title="Clear Console"
            aria-label="Clear Console"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold uppercase hidden sm:inline">Clear</span>
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className="md:hidden p-1.5 hover:bg-bg rounded-md text-muted hover:text-ink transition-all"
              title="Close Terminal"
              aria-label="Close Terminal"
            >
              <XCircle className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6 overflow-auto custom-scrollbar relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface/90 backdrop-blur-sm z-10"
            >
              <Loader2 className="w-6 h-6 text-ink animate-spin" />
              <p className="text-muted text-[10px] font-bold uppercase tracking-widest">Executing...</p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {!result && !isLoading && (
          <div className="h-full flex flex-col items-center justify-center text-muted gap-4">
            <History className="w-10 h-10 stroke-[1.5] opacity-20" />
            <p className="text-center text-[10px] font-bold uppercase tracking-widest opacity-40">
              Awaiting execution
            </p>
          </div>
        )}

        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            {(!result.stdout && !result.stderr && !result.error) && (
              <div className="flex flex-col items-center justify-center py-10 opacity-20">
                <Terminal className="w-8 h-8 mb-2" />
                <p className="text-[10px] font-bold uppercase tracking-widest">No output produced</p>
              </div>
            )}
            
            {result.stdout && (
              <div className="space-y-2 group">
                <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="h-px flex-1 bg-emerald-500/20" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">Stdout</span>
                  <div className="h-px flex-1 bg-emerald-500/20" />
                </div>
                <pre className="whitespace-pre-wrap break-all text-emerald-950 dark:text-emerald-100 leading-relaxed font-mono text-[11px] sm:text-xs p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10">
                  {result.stdout}
                </pre>
              </div>
            )}
            
            {(result.stderr || result.error) && (
              <div className="space-y-2 group">
                <div className="flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <div className="h-px flex-1 bg-rose-500/20" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-rose-600 dark:text-rose-400">Stderr</span>
                  <div className="h-px flex-1 bg-rose-500/20" />
                </div>
                <pre className="whitespace-pre-wrap break-all text-rose-950 dark:text-rose-100 leading-relaxed font-mono italic text-[11px] sm:text-xs p-3 bg-rose-500/5 rounded-lg border border-rose-500/10">
                  {result.stderr || result.error}
                </pre>
              </div>
            )}

            {!result.error && !result.stderr && (
              <div className="mt-8 pt-4 border-t border-border/10 flex items-center justify-between">
                <div className="text-[10px] text-muted font-bold uppercase tracking-widest">
                  Process finished with exit code 0
                </div>
                {result.time !== undefined && (
                  <div className="text-[10px] text-muted font-bold uppercase tracking-widest">
                    Time: {result.time}ms
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-5 py-2 border-t border-border/20 bg-bg/50 flex items-center gap-3">
        <span className="text-ink font-bold text-xs select-none">&gt;</span>
        <div className="h-4 w-1.5 bg-border animate-pulse" />
      </div>
    </div>
  );
});

export default Console;
