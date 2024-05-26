/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import profileDemo from '../../assets/profile_demo.avif';
export default function UserModal({ isOpen, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target) && !event.target.closest('.user-log-btn')) {
        onClose();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleEditProfile = () => {
    // Handle edit profile logic here
  };

  return isOpen ? (
    <div ref={modalRef} style={{ animation: `${isOpen ? 'fadein 0.25s' : ''}`, transition: 'transform 0.3s ease-out', transform: 'scale(1)', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }} className="absolute top-[150%] right-0  min-h-48 min-w-48 bg-[#1E1F25] text-[#D8DCF0] rounded-md ">
      <div className="p-4">
        <img className=" object-cover w-16 h-16 rounded-full mx-auto" src={`${profileDemo}`} alt="Profile" />
        <h2 className="mt-2 text-center text-lg font-semibold">Ime i Prezime</h2>
        <p className="mt-1 text-center text-sm">Email</p>
      </div>
      <button className="px-4 py-2 w-full text-[#D8DCF0] rounded" onClick={handleEditProfile}>
        Edit Profile
      </button>
      <button className="px-4 py-2 w-full text-[#D8DCF0] rounded" onClick={handleLogout}>
        Logout
      </button>
    </div>
  ) : null;
}
