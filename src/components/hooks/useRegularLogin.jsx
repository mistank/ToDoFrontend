import { useContext } from "react";
import axios from "axios";
import { AuthContext } from "../AuthProvider.jsx";
const apiUrl = "http://127.0.0.1:8000";

export default function useRegularLogin() {
  const { login } = useContext(AuthContext);

  const initiateRegularLogin = async (username, password) => {
    try {
      // Regular login logic here
      console.log("Logging in");
      const response = await axios.post(apiUrl + "/login", {
        username, // Prosleđivanje korisničkog imena
        password, // Prosleđivanje lozinke
      });
      login(response.data); // Pretpostavka da login funkcija prima neke podatke iz odgovora
    } catch (error) {
      console.error("Failed to log in", error);
    }
  };

  return initiateRegularLogin;
}
