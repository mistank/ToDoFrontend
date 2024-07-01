/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") == "true",
  );
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    // Provera lokalnog skladišta za prethodno stanje autentifikacije
    const storedAuthState = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(storedAuthState);
  }, []);

  const login = (navigate) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    navigate("/");
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("GoogleLogin");
    setUserInfo(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, setUserInfo, userInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
}
