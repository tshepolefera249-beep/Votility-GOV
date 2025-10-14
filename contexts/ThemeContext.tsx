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
