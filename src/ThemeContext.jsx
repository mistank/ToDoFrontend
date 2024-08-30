/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Proverite localStorage prilikom inicijalizacije teme
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("darkTheme");
    return savedTheme !== null ? JSON.parse(savedTheme) : true; // Podrazumevana vrednost je true (dark theme)
  };

  const [darkTheme, setDarkTheme] = useState(getInitialTheme);

  const toggleTheme = () => {
    setDarkTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem("darkTheme", newTheme);
      return newTheme;
    });
  };

  // Koristite useEffect da ažurirate localStorage kada se tema promeni
  useEffect(() => {
    localStorage.setItem("darkTheme", darkTheme);
  }, [darkTheme]);

  return (
    <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext };
