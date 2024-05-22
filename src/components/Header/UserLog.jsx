import { useState } from 'react';
import UserModal from '../Modals/UserModal.jsx';
import NotificationModal from '../Modals/NotificationModal.jsx';
// }
export default function UserLog() {
  const [userModalIsOpen, setUserModalIsOpen] = useState(false);
  const [notificationModalIsOpen, setNotificationModalIsOpen] = useState(false);
  return (
    <div className="relative flex gap-5 justify-between w-auto">
      <button
        onClick={() => {
          setNotificationModalIsOpen((notificationModalIsOpen) => !notificationModalIsOpen);
          if (userModalIsOpen) {
            setUserModalIsOpen((userModalIsOpen) => !userModalIsOpen);
          }
        }}
      >
        <img className="w-6 h-6" src={`${notificationModalIsOpen ? '/src/assets/icons/notification_bell_fill.png' : '/src/assets/icons/notification_bell.png'}`} alt="notifications" />
      </button>
      <div className="flex flex-col h-auto relative">
        <button
          onClick={() => {
            setUserModalIsOpen((userModalIsOpen) => !userModalIsOpen);
            if (notificationModalIsOpen) {
              setNotificationModalIsOpen((notificationModalIsOpen) => !notificationModalIsOpen);
            }
          }}
          className="flex flex-row log-btn items-center justify-between w-[auto]"
        >
          <div className="flex flex-row items-center">
            <img className="w-6 h-6" src="/src/assets/icons/user.png" alt="user" />
            <img className={`w-4 h-4 transition-transform duration-500 ${userModalIsOpen ? 'rotate-180' : ''}`} src="/src/assets/icons/arrow-down.png" alt="" />
          </div>
        </button>
        {userModalIsOpen && <UserModal isOpen={userModalIsOpen}></UserModal>}
      </div>
      {notificationModalIsOpen && <NotificationModal isOpen={notificationModalIsOpen}></NotificationModal>}
    </div>
  );
}
