/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

export default function UserModal({ isOpen, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target) && !event.target.closest('user-log-btn')) {
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

  return isOpen ? <div ref={modalRef} style={{ animation: `${isOpen ? 'fadein 0.25s' : 'fadeout 2s'}`, transition: 'transform 0.3s ease-out', transform: 'scale(1)', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }} className="absolute top-[150%] right-0 min-h-48 min-w-48 bg-[#1E1F25] rounded-md "></div> : null;
}
