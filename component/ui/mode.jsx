import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import Button from './button';

const getInitialMode = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'light';
};

const ModeToggle = () => {
  const [mode, setMode] = useState(getInitialMode);

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Button
      type="button"
      onClick={toggleMode}
      icon={mode === 'dark' ? <Sun className="w-6 h-6 text-whtie" strokeWidth={2} /> : <Moon className="w-6 h-6 text-black dark:text-white" strokeWidth={2} />}
      className="p-2 w-10 h-10 flex items-center justify-center"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    />
  );
};

export default ModeToggle;
