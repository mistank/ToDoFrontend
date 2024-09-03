/* eslint-disable no-unused-vars */
import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
const apiURL = "http://localhost:8000";

export default function useRegularLogin() {
  const { login, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const initiateRegularLogin = async (username, password) => {
    try {
      // Regular login logic here
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post(apiURL + "/login", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      const accessToken = response.data.access_token;
      document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; Secure; SameSite=Strict`;
      login(navigate); // Pretpostavka da login funkcija prima neke podatke iz odgovora
    } catch (error) {
      console.log("Error:", error);
      alert(("Error:", error));
    }
  };

  return initiateRegularLogin;
}
