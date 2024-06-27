// hooks/useGoogleLogin.js
import { useGoogleLogin } from "@react-oauth/google";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../api_calls/user_info.js";

export default function useGoogleLoginHook() {
  const { login, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginGoogle = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      console.log("Google Login Successful:", codeResponse);
      // Call getUserInfo with the access token
      const userInfoResponse = await getUserInfo(codeResponse.access_token);
      setUserInfo(userInfoResponse.data);

      //set local storage flag that user is logged via Google
      localStorage.setItem("GoogleLogin", "true");

      console.log("User Info:", userInfoResponse.data);
      login(navigate);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return loginGoogle;
}
