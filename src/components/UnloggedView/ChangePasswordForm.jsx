import { useState, useEffect } from "react";
import axios from "axios";
const apiURL = "http://localhost:8000";
export default function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");
    if (token) {
      setToken(token);
    }
  }, []);

  async function handleSubmit(token, newPassword) {
    const payload = {
      token: token,
      new_password: newPassword,
    };
    console.log("Payload:", payload);
    try {
      const response = await axios
        .post(apiURL + "/reset-password/", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          //Posalji korisnika na login stranicu
          window.location.href = "/login";
        });
      console.log("Password reset successfully:", response.data);
    } catch (error) {
      console.error("Error resetting password:", error.response.data);
    }
  }

  return (
    <main className="flex h-[100vh] items-center justify-center bg-[#131517]">
      <div
        style={{ boxShadow: "0px 0px 30px rgba(0, 0, 0, 0.3)" }}
        className="relative flex h-[80vh] w-[30%] items-center justify-center xs:w-2/3 sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4"
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
          <form
            className="relative flex w-[80%] flex-col items-center space-y-4 text-white"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(token, password);
            }}
          >
            <h2 className="mb-2 w-[100%] text-left text-3xl font-bold">
              Reset Password
            </h2>
            <input
              type="password"
              placeholder="New Password"
              className="w-[100%] rounded-md border bg-transparent p-2 placeholder:text-white focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-[100%] rounded-md border bg-transparent p-2 placeholder:text-white focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-[100%] rounded-md bg-blue-500 p-2 text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
