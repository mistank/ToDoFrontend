import { useState } from "react";
import add_cross from "../../assets/icons/add_plus.svg";
import "../../App.css";

export default function EmptyColumn() {
  const [isHovered, setIsHovered] = useState(false); // State za praćenje hover stanja

  // Stilovi koji se primenjuju kada nije hover
  const defaultStyle = {
    animation: "rotate2 0.5s",
  };

  // Stilovi koji se primenjuju na hover
  const hoverStyle = {
    animation: "rotate 0.5s",
  };

  return (
    <div className="relative mr-4 min-w-[20%] flex-1 rounded-lg">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex h-[100%] cursor-pointer flex-col items-center justify-center gap-4 rounded-lg hover:border-2 hover:border-gray-400 hover:border-opacity-50"
      >
        <div className="rounded-lg align-middle">
          <img
            src={add_cross}
            className="w-24 "
            style={isHovered ? hoverStyle : defaultStyle}
          />
        </div>
      </div>
    </div>
  );
}
