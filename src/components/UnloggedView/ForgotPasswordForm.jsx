/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useState } from "react";
import axios from "axios";

const apiURL = "http://localhost:8000";

export default function ForgotPasswordForm({ setMode }) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Dodato

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Postavljanje na true pre slanja zahteva
    try {
      await axios.post(apiURL + `/forgot-password/${email}`); // Ispravka na pravilan način slanja email-a
      alert("Please check your email to reset your password.");
    } catch (error) {
      console.error("Error sending forgot password request:", error);
      alert(error.response.data.detail);
    } finally {
      setIsLoading(false); // Postavljanje na false nakon završetka zahteva
    }
  };

  return (
    <form className="relative flex w-[80%] flex-col items-center space-y-4 text-white">
      <h2 className="mb-2 w-[100%] text-left text-3xl font-bold">
        Forgot Password
      </h2>
      <p className="w-[100%] text-left ">
        Please enter your email to reset your password.
      </p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className=" w-[100%] rounded-md border bg-transparent p-2 placeholder:text-white focus:outline-none"
      />
      <button
        type="submit"
        className="w-[100%] rounded-md bg-blue-500 p-2 text-white"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Reset Password"}
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
      <p className="text-center">
        Back to{" "}
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
