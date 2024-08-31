/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { ThemeContext } from "../../../ThemeContext.jsx";
import { getAccessToken } from "../../../utils/access_token.js";

export default function ChangePasswordForm() {
  const apiURL = "http://localhost:8000";

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  // useEffect(() => {
  //   //get me an access token from cookies
  //   const accessToken =
  //     document.cookie
  //       .split("; ")
  //       .find((row) => row.startsWith("access_token="))
  //       ?.split("=")[1] || "";
  //   setToken(accessToken);
  //   // if (token) {
  //   //   setToken(token);
  //   // }
  // }, []);

  async function handleSubmit(newPassword) {
    const payload = {
      token: getAccessToken(),
      old_password: oldPassword,
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
      alert(
        "Error resetting password. " + error.response.data.detail.toString(),
      );
    }
  }

  return (
    <div style={{ color: textColor }} className="flex h-full w-full flex-col">
      <h2 className="text-2xl font-semibold">Change Password</h2>
      <div className="mt-5 flex w-full flex-col items-center justify-center">
        <input
          type="password"
          placeholder="Old Password"
          style={{ backgroundColor: darkerColor }}
          className="w-full rounded-lg p-2 focus:outline-none"
          onChange={(e) => {
            setOldPassword(e.target.value);

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
          style={{ backgroundColor: darkerColor }}
          className="mt-4 w-full rounded-lg p-2 focus:outline-none"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          style={{ backgroundColor: darkerColor }}
          className="mt-4 w-full rounded-lg p-2 focus:outline-none"
          onChange={(e) => {
            setConfirmPassword(e.target.value);

            if (e.target.value !== password) {
              e.target.setCustomValidity("Passwords do not match");
            } else {
              e.target.setCustomValidity("");
            }
          }}
        />
        <div className="flex w-full justify-end">
          <button
            className="bold mt-5 rounded-lg bg-[#5051F9] px-4 py-2 font-bold text-white hover:bg-[#4646f8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            onClick={(e) => {
              e.preventDefault();
              if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
              } else if (
                password.length === 0 ||
                confirmPassword.length === 0
              ) {
                alert("Password cannot be empty");
                return;
              }
              handleSubmit(password);
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}
