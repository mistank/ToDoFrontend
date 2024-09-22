/* eslint-disable react/prop-types */
import { useState } from "react";

export default function SidebarButton({ icon, whiteIcon, onClick, isActive }) {
  const [currentIcon, setCurrentIcon] = useState(icon);

  return (
    <button
      onClick={onClick}
      className={`${isActive ? "bg-[#5051F9]" : "hover:bg-[#5051F9]"} flex h-12 w-12 justify-center rounded-lg p-2`}
      onMouseEnter={() => setCurrentIcon(whiteIcon)}
      onMouseLeave={() => setCurrentIcon(icon)}
    >
      <img
        src={isActive ? whiteIcon : currentIcon}
        className="w-[100%] hover:fill-current"
      />
    </button>
  );
}
//    <div className="h-8 w-8 p-5 hover:bg-[#5051F9]">
