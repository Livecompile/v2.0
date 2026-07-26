import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 sm:p-2.5 rounded-xl bg-surface border border-border shadow-sm hover:border-blue-500/30 hover:bg-bg transition-all group overflow-hidden relative"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10 flex items-center justify-center">
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 group-hover:rotate-90 transition-transform duration-500" />
        ) : (
          <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:-rotate-12 transition-transform duration-500" />
        )}
      </div>
    </button>
  );
}
