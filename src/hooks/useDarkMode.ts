import { useEffect, useState } from 'react';

function useDarkMode(): [string, (theme: string) => void] {
  const [theme, setTheme] = useState<string>(localStorage.theme || 'light');  
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme]; 
}

export default useDarkMode;
