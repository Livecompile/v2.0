import { editor } from 'monaco-editor';

export const defineThemes = (monaco: any) => {
  monaco.editor.defineTheme('polycode-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '71717a', fontStyle: 'italic' },
      { token: 'keyword', foreground: '7dd3fc', fontStyle: 'bold' },
      { token: 'string', foreground: 'bef264' },
      { token: 'number', foreground: 'fde047' },
      { token: 'type', foreground: 'd8b4fe' },
      { token: 'function', foreground: '60a5fa' },
      { token: 'variable', foreground: 'f8fafc' },
      { token: 'operator', foreground: '94a3b8' },
      { token: 'delimiter', foreground: '64748b' },
    ],
    colors: {
      'editor.background': '#0a0a0b',
      'editor.foreground': '#f1f5f9',
      'editor.lineHighlightBackground': '#17171a',
      'editorCursor.foreground': '#7dd3fc',
      'editor.selectionBackground': '#26262a',
      'editor.inactiveSelectionBackground': '#1c1c1f',
      'editorLineNumber.foreground': '#404040',
      'editorLineNumber.activeForeground': '#a3a3a3',
      'editorWidget.background': '#0a0a0b',
      'editorWidget.border': '#1e293b',
      'editorIndentGuide.background': '#1e293b',
      'editorIndentGuide.activeBackground': '#334155',
    }
  });

  monaco.editor.defineTheme('polycode-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '94a3b8', fontStyle: 'italic' },
      { token: 'keyword', foreground: '0369a1', fontStyle: 'bold' },
      { token: 'string', foreground: '4d7c0f' },
      { token: 'number', foreground: 'b45309' },
      { token: 'type', foreground: '7e22ce' },
      { token: 'function', foreground: '0c4a6e' },
      { token: 'variable', foreground: '#020617' },
      { token: 'operator', foreground: '475569' },
      { token: 'delimiter', foreground: '94a3b8' },
    ],
    colors: {
      'editor.background': '#fcfcfd',
      'editor.foreground': '#020617',
      'editor.lineHighlightBackground': '#f1f5f9',
      'editorCursor.foreground': '#0284c7',
      'editor.selectionBackground': '#e2e8f0',
      'editor.inactiveSelectionBackground': '#f1f5f9',
      'editorLineNumber.foreground': '#cbd5e1',
      'editorLineNumber.activeForeground': '#64748b',
      'editorWidget.background': '#ffffff',
      'editorWidget.border': '#e2e8f0',
      'editorIndentGuide.background': '#f1f5f9',
      'editorIndentGuide.activeBackground': '#e2e8f0',
    }
  });
};
