/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated') === 'true');

  useEffect(() => {
    // Provera lokalnog skladišta za prethodno stanje autentifikacije
    const storedAuthState = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuthState === 'true');
  }, []);

  const login = (navigate) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    console.log('Pokusavam da navigiram, userLoggedIn: ', isAuthenticated);
    navigate('/');
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    console.log('Pokusavam da navigiram, userLoggedOut: ', isAuthenticated);
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
}
