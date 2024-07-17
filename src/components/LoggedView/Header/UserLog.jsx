/* eslint-disable react/prop-types */
import { useState } from "react";
import UserModal from "../../Modals/UserModal.jsx";
import NotificationModal from "../../Modals/NotificationModal.jsx";
// }
export default function UserLog({ setMode }) {
  const [userModalIsOpen, setUserModalIsOpen] = useState(false);
  const [notificationModalIsOpen, setNotificationModalIsOpen] = useState(false);
  return (
    <div className="relative flex w-auto justify-between gap-5">
      {/* <button
        className="notif-btn"
        onClick={() => {
          setNotificationModalIsOpen(
            (notificationModalIsOpen) => !notificationModalIsOpen,
          );
          if (userModalIsOpen) {
            setUserModalIsOpen((userModalIsOpen) => !userModalIsOpen);
          }
        }}
      >
        <img
          className="notif-bell h-6 w-6"
          src={`${notificationModalIsOpen ? "/src/assets/icons/notification_bell_fill.png" : "/src/assets/icons/notification_bell.png"}`}
          alt="notifications"
        />
      </button> */}
      <div className="relative flex h-auto flex-col">
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
              src="/src/assets/icons/user.png"
              alt="user"
            />
            <img
              className={`h-4 w-4 transition-transform duration-500 ${userModalIsOpen ? "rotate-180" : ""}`}
              src="/src/assets/icons/arrow-down.png"
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
      {notificationModalIsOpen && (
        <NotificationModal
          isOpen={notificationModalIsOpen}
          onClose={() => {
            setNotificationModalIsOpen(false);
          }}
        ></NotificationModal>
      )}
    </div>
  );
}
