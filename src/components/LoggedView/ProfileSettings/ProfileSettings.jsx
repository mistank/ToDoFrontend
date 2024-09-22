/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthProvider.jsx";
import { getAccessToken } from "../../../utils/access_token.js";
import { getCsrfToken } from "../../../utils/csrf_token.js";
import Details from "./Details.jsx";
import ChangePasswordForm from "./ChangePassword.jsx";
import { ThemeContext } from "../../../ThemeContext.jsx";

const apiURL = "http://localhost:8000";

export default function ProfileSettings({ setMode }) {
  const { userInfo, setUserInfo, logout } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [detailsVisible, setDetailsVisible] = useState(true);
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  const handleSave = async () => {
    // const csrfToken = getCsrfToken(); // Pretpostavka da imate ovu funkciju
    // console.log("CSRF Token: " + csrfToken);
    axios
      .put(
        `${apiURL}/users/${userInfo.username}`,
        {
          firstName,
          lastName,
          email,
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
            // "X-CSRF-TOKEN": csrfToken,
          },
        },
      )
      .then(() => {
        setUserInfo({
          firstName,
          lastName,
          email,
          username,
        });
      });
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      const accessToken = getAccessToken();
      try {
        const response = await axios.get(`${apiURL}/current-user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUserInfo(response.data);
        setFirstName(response.data.firstName);
        setLastName(response.data.lastName);
        setEmail(response.data.email);
        setUsername(response.data.username);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("You are not authorized to view this page. Please log in");
          logout();
        }
      }
    };
    fetchDataAsync();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <div className="shadow-lgs mt-5 h-[80vh] w-[100%] rounded-lg bg-[#1E1F25] p-8 text-white"> */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Settings</h2>
        <div>
          {/* <button
            onClick={() => localStorage.setItem("mode", "projects-view")}
            className="mr-4 rounded bg-[#5051F9] px-4 py-2 font-bold text-white hover:bg-gray-600"
          >
            Cancel
          </button> */}
          <button
            className="rounded bg-[#5051F9] px-4 py-2 font-bold text-white hover:bg-[#6d6dfc]"
            onClick={() => {
              handleSave();
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="mb-4 flex space-x-4" style={{ color: textColor }}>
        <button
          className={`${detailsVisible && "border-b-2 border-[#5051F9]"}  px-4 py-2`}
          onClick={() => setDetailsVisible(true)}
        >
          My details
        </button>
        <button
          className={`${!detailsVisible && "border-b-2 border-[#5051F9]"} px-4 py-2`}
          onClick={() => setDetailsVisible(false)}
        >
          Password
        </button>
      </div>
      {detailsVisible ? (
        <Details
          firstName={firstName}
          lastName={lastName}
          username={username}
          email={email}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setUsername={setUsername}
          setEmail={setEmail}
        />
      ) : (
        <ChangePasswordForm />
      )}
    </>
  );
}
