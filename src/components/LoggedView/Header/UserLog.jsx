/* eslint-disable react/prop-types */
import { useState } from "react";
import UserModal from "../../Modals/UserModal.jsx";
import { useContext } from "react";
import { ThemeContext } from "../../../ThemeContext.jsx";
import arrow_down from "../../../assets/icons/arrow-down.png";
import arrow_down_light from "../../../assets/icons/arrow-down-light.svg";
import user from "../../../assets/icons/user.svg";
import user_light from "../../../assets/icons/user-light.svg";

// }
export default function UserLog({ setMode }) {
  const [userModalIsOpen, setUserModalIsOpen] = useState(false);
  const [notificationModalIsOpen, setNotificationModalIsOpen] = useState(false);
  const { darkTheme } = useContext(ThemeContext);

  return (
    <div className="relative flex h-auto items-center">
      <button
        onClick={() => {
          setUserModalIsOpen((userModalIsOpen) => !userModalIsOpen);
          if (notificationModalIsOpen) {
            setNotificationModalIsOpen(
              (notificationModalIsOpen) => !notificationModalIsOpen,
            );
          }
        }}
        className="user-log-btn log-btn flex w-[auto] flex-row items-center justify-between"
      >
        <div className="flex flex-row items-center">
          <img
            className="h-6 w-6"
            src={`${darkTheme ? user : user_light}`}
            alt="user"
          />
          <img
            className={`h-4 w-4 transition-transform duration-500 ${userModalIsOpen ? "rotate-180" : ""}`}
            src={`${darkTheme ? arrow_down : arrow_down_light}`}
            alt=""
          />
        </div>
      </button>
      {userModalIsOpen && (
        <UserModal
          isOpen={userModalIsOpen}
          onClose={() => {
            setUserModalIsOpen(false);
          }}
          setMode={setMode}
        ></UserModal>
      )}
    </div>
  );
}
