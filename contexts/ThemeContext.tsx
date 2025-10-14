import React, { createContext, useState, useContext } from 'react';
import { Appearance } from 'react-native';

const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const colorScheme = Appearance.getColorScheme();
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');

  return (
    <ThemeContext.Provider value={{ darkMode, toggle: () => setDarkMode(!darkMode) }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
import React, { createContext, useState, useContext, useEffect } from 'react';
import { isDarkMode, setDarkMode } from '@/services/darkMode';

const ThemeContext = createContext({ dark: false, toggle: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    async function loadTheme() {
      setDark(await isDarkMode());
    }
    loadTheme();
  }, []);

  const toggle = async () => {
    await setDarkMode(!dark);
    setDark(!dark);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
