/* eslint-disable react/prop-types */
export default function UserModal({ isOpen }) {
  return <div style={{ animation: `${isOpen ? 'fadein 0.25s' : 'fadeout 2s'}`, transition: 'transform 0.3s ease-out', transform: 'scale(1)', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)' }} className="absolute top-[150%] right-0 min-h-48 min-w-48 bg-[#1E1F25] rounded-md "></div>;
}
