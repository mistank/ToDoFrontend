import { useEffect, useState } from "react";
import axios from "axios";

export default function ChangePasswordForm() {
  const apiURL = "http://localhost:8000";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    //get me an access token from cookies
    const accessToken =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token="))
        ?.split("=")[1] || "";
    setToken(accessToken);
    // if (token) {
    //   setToken(token);
    // }
  }, []);

  async function handleSubmit(token, newPassword) {
    const payload = {
      token: token,
      old_password: password,
      new_password: newPassword,
    };
    console.log("Payload:", payload);
    try {
      const response = await axios
        .post(apiURL + "/change-password/", JSON.stringify(payload), {
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
    <div className="flex h-full w-full flex-col">
      <h2 className="text-2xl font-semibold text-white">Change Password</h2>
      <div className="mt-5 flex w-full flex-col items-center justify-center">
        <input
          type="password"
          placeholder="Old Password"
          className="w-full rounded-lg bg-[#131517] p-2 focus:outline-none"
          onChange={(e) => {
            setPassword(e.target.value);

            if (e.target.value !== password) {
              e.target.setCustomValidity("Passwords do not match");
            } else {
              e.target.setCustomValidity("");
            }
          }}
        />
        <input
          type="password"
          placeholder="New Password"
          className="mt-4 w-full rounded-lg bg-[#131517] p-2 focus:outline-none"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          className="mt-4 w-full rounded-lg bg-[#131517] p-2 focus:outline-none"
          onChange={(e) => {
            setConfirmPassword(e.target.value);

            if (e.target.value !== password) {
              e.target.setCustomValidity("Passwords do not match");
            } else {
              e.target.setCustomValidity("");
            }
          }}
        />
        <button
          className="mt-5 rounded-lg bg-[#5051F9] px-4 py-2 hover:bg-[#4646f8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          onClick={(e) => {
            e.preventDefault();
            if (password !== confirmPassword) {
              alert("Passwords do not match");
              return;
            }
            handleSubmit(token, password);
          }}
        >
          Change Password
        </button>
      </div>
    </div>
  );
}
