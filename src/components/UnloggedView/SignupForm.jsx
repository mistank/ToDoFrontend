/* eslint-disable react/prop-types */
import axios from "axios";
import googleIcon from "../../assets/icons/google_icon.svg";
import { useState } from "react";
import useRegularLogin from "../hooks/useRegularLogin.jsx";
import { useGoogleLogin } from "@react-oauth/google";
import useGoogleSignupHook from "../hooks/useGoogleSignup.jsx";
import shownPassword from "../../assets/icons/show_password.svg";
import hiddenPassword from "../../assets/icons/hidden_password.svg";

const apiURL = "http://localhost:8000";
export default function SignUpForm({ setMode }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [visibility, setVisibility] = useState(false);

  const initiateRegularLogin = useRegularLogin();
  const initiateGoogleSignup = useGoogleSignupHook();

  const handleSubmit = (e) => {
    if (password !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
    e.preventDefault();
    axios
      .post(`${apiURL}/signup/`, {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      })
      .then(() => {
        initiateRegularLogin(username, password);
      })
      .catch((error) => {
        alert(error.response.data.detail);
      });
  };

  return (
    <form className="flex w-[80%] flex-col items-center space-y-4 ">
      <h2 className="mb-2 w-[100%] text-left text-3xl font-bold">Sign Up</h2>
      <p className="w-[100%] text-left ">
        Please enter your details to sign up.
      </p>
      <input
        type="text"
        placeholder="First Name"
        className=" w-[100%] rounded-md border bg-transparent p-2  focus:outline-none"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Last Name"
        className=" w-[100%] rounded-md border bg-transparent p-2  focus:outline-none"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Username"
        className=" w-[100%] rounded-md border bg-transparent p-2  focus:outline-none"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder="Email"
        className=" w-[100%] rounded-md border bg-transparent p-2  focus:outline-none"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <div className="relative w-full">
        <input
          type={visibility ? "text" : "password"}
          placeholder="Password"
          className="w-[100%] rounded-md border bg-transparent p-2 focus:outline-none"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
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
      <div className="relative w-full">
        <input
          type={visibility ? "text" : "password"}
          placeholder="Confirm Password"
          className="w-[100%] rounded-md border bg-transparent p-2  focus:outline-none"
          onChange={(e) => {
            setConfirmPass(e.target.value);
          }}
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
      <button
        type="submit"
        className="w-[100%] rounded-md bg-[#5051F0] p-2 text-white"
        onClick={handleSubmit}
      >
        Sign Up
      </button>
      <div className="my-4 flex w-[100%] items-center">
        <hr style={{ borderColor: "#4D4D4D" }} className="flex-grow border-t" />
        <span className="px-2 text-[#4D4D4D]">Or</span>
        <hr style={{ borderColor: "#4D4D4D" }} className="flex-grow border-t" />
      </div>
      <button
        className="w-[15%] rounded-md p-2 text-white"
        onClick={(e) => {
          e.preventDefault();
          initiateGoogleSignup();
        }}
      >
        <img className="w-[100%]" src={googleIcon} alt="" />
      </button>
      <p className="text-center">
        Already Registered?{" "}
        <a
          onClick={() => setMode("login")}
          style={{ cursor: "pointer" }}
          className="text-blue-500"
        >
          Login
        </a>
      </p>
    </form>
  );
}
