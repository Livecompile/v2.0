import React from 'react';
import { ChevronRight, Folder, FileCode } from 'lucide-react';
import { Language } from '../types';
import { cn } from '../lib/utils';

interface BreadcrumbsProps {
  language: Language;
  activeFileName: string;
}

export default function Breadcrumbs({ language, activeFileName }: BreadcrumbsProps) {
  return (
    <div className="flex items-center gap-2 px-4 py-1.5 bg-surface/50 border-b border-border/40 text-[11px] font-medium text-muted select-none">
      <div className="flex items-center gap-1.5 hover:text-ink transition-colors cursor-pointer group">
        <Folder className="w-3.5 h-3.5 group-hover:text-ink transition-colors" />
        <span>LiveCompile Project</span>
      </div>
      <ChevronRight className="w-3 h-3 text-muted/50" />
      <div className="flex items-center gap-1.5 hover:text-ink transition-colors cursor-pointer">
        <img src={language.logo} alt={language.name} className="w-3.5 h-3.5 grayscale" />
        <span>{language.name}</span>
      </div>
      <ChevronRight className="w-3 h-3 text-muted/50" />
      <div className="flex items-center gap-1.5 text-ink font-bold">
        <FileCode className="w-3.5 h-3.5" />
        <span>{activeFileName}</span>
      </div>
    </div>
  );
}
