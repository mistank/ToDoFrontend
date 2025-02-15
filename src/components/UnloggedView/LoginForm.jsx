/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import googleIcon from "../../assets/icons/google_icon.svg";
import useGoogleLoginHook from "../hooks/useGoogleLogin.jsx";
import useRegularLogin from "../hooks/useRegularLogin.jsx";
import { useState, useContext } from "react";
import shownPassword from "../../assets/icons/show_password.svg";
import hiddenPassword from "../../assets/icons/hidden_password.svg";
import { ThemeContext } from "@emotion/react";
export default function LoginForm({ setMode }) {
  const initiateGoogleLogin = useGoogleLoginHook();
  const initiateRegularLogin = useRegularLogin();
  const [visibility, setVisibility] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  const handleRegularLogin = () => {
    // Handle regular login logic here
    const username = document.querySelector("input[type=text]").value;
    const password = document.querySelector("input[type=password]").value;
    initiateRegularLogin(username, password);
  };

  console.log("local storage: ", localStorage.getItem("isAuthenticated"));

  return (
    <form className="flex w-[80%] flex-col items-center space-y-4 ">
      <h2 className="mb-2 w-[100%] text-left text-3xl font-bold">Login</h2>
      <p className="w-[100%] text-left ">
        Please enter your credentials to login.
      </p>
      <input
        type="text"
        placeholder="Username"
        autoComplete="name"
        className=" w-[100%] rounded-md border bg-transparent p-2  focus:outline-none"
      />
      <div className="relative w-full">
        <input
          type={visibility ? "text" : "password"}
          placeholder="Password"
          autoComplete="email"
          className="w-[100%] rounded-md border bg-transparent p-2  focus:outline-none"
        />
        <button
          onClick={(event) => {
            event.preventDefault();
            setVisibility((visibility) => !visibility);
          }}
          className="absolute right-5 top-1/2 translate-y-[-50%]"
        >
          <img src={visibility ? shownPassword : hiddenPassword} alt="" />
        </button>
      </div>
      {/* <div className="flex w-[100%] items-center">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me" className="ml-2">
          Remember me
        </label>
      </div> */}
      <button
        onClick={(event) => {
          event.preventDefault();
          handleRegularLogin(event);
        }}
        type="submit"
        className="w-[100%] rounded-md bg-[#5051F9] p-2 text-white"
      >
        Login
      </button>
      <a
        onClick={() => setMode("forgot-pass")}
        style={{ cursor: "pointer" }}
        className="text-center text-blue-500"
      >
        Forgot password?
      </a>
      <div className="my-4 flex w-[100%] items-center">
        <hr style={{ borderColor: "#4D4D4D" }} className="flex-grow border-t" />
        <span className="px-2 text-[#4D4D4D]">Or</span>
        <hr style={{ borderColor: "#4D4D4D" }} className="flex-grow border-t" />
      </div>
      <button
        onClick={(event) => {
          event.preventDefault();
          initiateGoogleLogin();
        }}
        className="w-[15%] rounded-md p-2 text-white"
      >
        <img className="w-[100%]" src={googleIcon} alt="" />
      </button>
      <p className="text-center">
        Don't have an account?{" "}
        <a
          onClick={() => setMode("signup")}
          style={{ cursor: "pointer" }}
          className="text-blue-500"
        >
          Sign up
        </a>
      </p>
    </form>
  );
}
