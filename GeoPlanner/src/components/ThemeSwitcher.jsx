import React from 'react';

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  const themes = [
    { id: 'default', label: 'Olive' },
    { id: 'forest', label: 'Forest' },
    { id: 'mint', label: 'Mint' },
    { id: 'sage', label: 'Sage' },
    { id: 'lime', label: 'Lime' }
  ];

  return (
    <select
      value={currentTheme}
      onChange={(e) => onThemeChange(e.target.value)}
      className="px-3 py-1.5 w-36 bg-[var(--theme-panel)] border border-[var(--theme-border)] hover:bg-[var(--theme-bg)] transition-all duration-200 cursor-pointer shadow-[2px_2px_0px_0px_var(--theme-border)] text-xs font-bold text-[var(--theme-border)] uppercase tracking-wider font-mono outline-none"
    >
      {themes.map((theme) => (
        <option key={theme.id} value={theme.id} className="bg-[var(--theme-panel)] text-[var(--theme-border)]">
          THEME: {theme.label}
        </option>
      ))}
    </select>
  );
}

