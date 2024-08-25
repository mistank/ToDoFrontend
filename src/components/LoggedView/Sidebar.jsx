/* eslint-disable react/prop-types */
import Icons from "./Icons";
import { useState } from "react";

export default function Sidebar({ setMode, currentProject }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute mt-5 h-10 rounded-r-full bg-[#5051F9] xs:block sm:hidden"
      >
        <img
          className="h-[75%]"
          src="/src/assets/icons/right-arrow.png"
          alt="Open sidebar"
        />
      </button>
      <div
        style={{ zIndex: 100 }}
        className={`fixed left-0 h-full w-full transform bg-[#1E1F25] transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:static sm:w-auto sm:bg-transparent`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="ml-5 mt-5 rounded-lg bg-[#5051F9] p-3 xs:block sm:hidden"
        >
          <img
            className="h-8"
            src="/src/assets/icons/close.png"
            alt="Close sidebar"
          />
        </button>
      </div>
      <section className=" z-10 flex w-20 flex-col items-center justify-center gap-10 bg-[#1E1F25] xs:hidden">
        <Icons setMode={setMode} currentProject={currentProject}></Icons>
      </section>
    </>
  );
}
