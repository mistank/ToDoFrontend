// hooks/useGoogleLogin.js
import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api_calls/user_info.js";
import axios from "axios";

const apiURL = "http://localhost:8000";
export default function useGoogleSignupHook() {
  const { login, setUserInfo, userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const initiateGoogleSignup = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("Google Login Successful:", response);

      const googleAccessToken = response.access_token;

      // Call getUserInfo with the access token
      const userInfoResponse = await getUserInfo(googleAccessToken);
      console.log("User Info:", userInfoResponse.data);
      setUserInfo(userInfoResponse.data);
      const serverResponse = await axios
        .post(
          apiURL + "/google-signup/",
          JSON.stringify({
            firstName: userInfoResponse.data.given_name,
            lastName: userInfoResponse.data.family_name,
            username: userInfoResponse.data.name,
            email: userInfoResponse.data.email,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        )
        .then((response) => {
          console.log("Server Response:", response);
          const accessToken = response.data.access_token;
          document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; Secure; SameSite=Strict`;
          login(navigate);
        })
        .catch((error) => alert(("Error:", error.response.data.detail)));
      // const accessToken = serverResponse.access_token;

      // document.cookie = `accessToken=${accessToken}; path=/; max-age=3600; Secure; SameSite=Strict`;

      // login(navigate);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return initiateGoogleSignup;
}
