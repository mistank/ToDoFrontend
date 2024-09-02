/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { getAccessToken } from "../utils/access_token.js";
import axios from "axios";

const apiUrl = "http://localhost:8000";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const base = "/ToDoFrontend";
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
    if (isAuthenticated) {
      fetchDataAsync();
    }
  }, [isAuthenticated]);

  const fetchDataAsync = async () => {
    const accessToken = getAccessToken();
    try {
      const response = await axios.get(`${apiUrl}/current-user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log("Korisnicki podaci su: ", response.data);
      setUserInfo(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You are not authorized to view this page. Please log in");
        logout();
      }
    }
  };

  useEffect(() => {
    // Provera lokalnog skladišta za prethodno stanje autentifikacije
    const storedAuthState = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(storedAuthState);
  }, []);

  const login = (navigate) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    navigate("/ToDoFrontend/");
  };
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
    localStorage.removeItem("GoogleLogin");
    localStorage.clear();
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
