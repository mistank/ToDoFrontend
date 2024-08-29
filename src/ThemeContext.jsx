/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
