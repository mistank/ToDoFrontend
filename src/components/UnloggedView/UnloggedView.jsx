/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import LoginForm from "./LoginForm.jsx";
import ForgotPasswordForm from "./ForgotPasswordForm.jsx";
import SignUpForm from "./SignupForm.jsx";
import { ThemeContext } from "../../ThemeContext.jsx";

export default function UnloggedView() {
  const [mode, setMode] = useState("login");
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  let form;
  switch (mode) {
    case "login":
      form = <LoginForm setMode={setMode} />;
      break;
    case "signup":
      form = <SignUpForm setMode={setMode} />;
      break;
    case "forgot-pass":
      form = <ForgotPasswordForm setMode={setMode} />;
      break;
    default:
      form = <LoginForm setMode={setMode} />;
  }

  return (
    <main
      style={{ backgroundColor: darkerColor, color: textColor }}
      className="flex h-[100vh] items-center justify-center"
    >
      <div
        style={{
          boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.3)",
          color: textColor,
        }}
        className="relative flex h-[80vh] w-[30%] items-center justify-center rounded-3xl xs:w-2/3 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4"
      >
        <div
          className="absolute left-0 top-0 z-0"
          style={{ animation: "slowfloat 5s ease-in-out infinite" }}
        >
          <div className="h-48 w-48 translate-x-[-30%] translate-y-[-30%] transform rounded-full bg-[#5051F9]"></div>
        </div>
        <div
          className="absolute bottom-0 right-0 z-0"
          style={{
            animation: "slowfloat 5s ease-in-out infinite",
            animationDelay: "2s",
          }}
        >
          <div className="h-48 w-48 translate-x-[30%] translate-y-[40%] transform rounded-full bg-[#5051F9]"></div>
        </div>
        <div className="flex h-[80vh] w-[100%] items-center justify-center rounded-3xl border border-solid border-white bg-transparent bg-opacity-10 backdrop-blur-md backdrop-filter">
          {form}
        </div>
      </div>
    </main>
  );
}
