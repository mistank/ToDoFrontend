/* eslint-disable react/prop-types */
import Icons from "./Icons";
import { useState } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext.jsx";
import "@theme-toggles/react/css/Classic.css";
import { Classic } from "@theme-toggles/react";
import MobileMenu from "./MobileMenu.jsx";
import rightArrow from "../../assets/icons/right-arrow.png";

export default function Sidebar({ mode, setMode, currentProject }) {
  const [isOpen, setIsOpen] = useState(false);
  const { darkTheme, toggleTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute mt-5 h-10 rounded-r-full bg-[#5051F9] xs:block sm:hidden"
      >
        <img className="h-[75%]" src={rightArrow} alt="Open sidebar" />
      </button>
      <div
        hidden={!isOpen}
        style={{
          zIndex: 100,
          transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
        }}
        className={`fixed left-0 h-full w-full transform bg-[#1E1F25] transition-transform duration-500 ease-in-out sm:static sm:w-auto sm:bg-transparent`}
      >
        <MobileMenu setMode={setMode} setIsOpen={setIsOpen} />
      </div>
      <section
        style={{
          backgroundColor: lighterColor,
          color: textColor,
          flexShrink: 0,
        }}
        className={`relative z-10 flex h-full w-20 flex-col items-center justify-center gap-5  xs:hidden`}
      >
        <Icons
          mode={mode}
          setMode={setMode}
          currentProject={currentProject}
        ></Icons>
        <Classic
          duration={500}
          toggle={toggleTheme}
          toggled={darkTheme}
          style={{
            transform: "scale(2.5)",
            color: "#5F6388",
            width: "1rem",
            height: "1rem",
            position: "fixed",
            bottom: "3rem",
          }}
        />
      </section>
    </>
  );
}
