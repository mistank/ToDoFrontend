/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../AuthProvider.jsx";
import useGoogleLogout from "../hooks/useGoogleLogout.jsx";

export default function UserModal({ isOpen, onClose, setMode }) {
  const modalRef = useRef();
  const { userInfo, logout } = useContext(AuthContext);
  const initiateGoogleLogout = useGoogleLogout();

  // Close modal when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !event.target.closest(".user-log-btn")
      ) {
        onClose();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out");
    const googleLogin = localStorage.getItem("GoogleLogin");
    console.log(googleLogin);
    if (googleLogin) {
      initiateGoogleLogout();
    } else {
      // Handle regular logout logic here
      logout();
    }
  };

  return isOpen ? (
    <div
      ref={modalRef}
      style={{
        animation: `${isOpen ? "fadein 0.25s" : ""}`,
        transition: "transform 0.3s ease-out",
        transform: "scale(1)",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
      }}
      className="absolute right-0 top-[150%] z-50  min-h-48 min-w-48 rounded-md bg-[#1E1F25] text-[#D8DCF0] "
    >
      <div className="p-4">
        <img
          className="mx-auto h-16 w-16 rounded-full object-cover"
          src="src/assets/icons/user.png"
          alt="Profile"
        />
        <h2 className="mt-2 text-center text-lg font-semibold">
          {userInfo.firstName + " " + userInfo.lastName}
        </h2>
        <p className="mt-1 text-center text-sm">{userInfo.email}</p>
      </div>
      <button
        className="w-full rounded px-4 py-2 text-[#D8DCF0]"
        onClick={() => setMode("profile-settings")}
      >
        Edit Profile
      </button>
      <button
        onClick={() => {
          handleLogout();
          onClose();
        }}
        className="w-full rounded px-4 py-2 text-[#D8DCF0]"
      >
        Logout
      </button>
    </div>
  ) : null;
}
