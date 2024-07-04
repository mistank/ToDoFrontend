/* eslint-disable react/prop-types */
import Icons from "./Icons";
import { useState } from "react";

export default function Sidebar({ setMode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="absolute mt-5 h-10 rounded-r-full bg-[#1E1F25] xs:block sm:hidden"
      >
        <img
          className="h-[75%]"
          src="/src/assets/icons/right-arrow.png"
          alt="Open sidebar"
        />
      </button>
      <div
        className={`fixed left-0 h-full w-full transform bg-[#1E1F25] transition-transform duration-500 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:static sm:w-auto sm:bg-transparent`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="ml-5 mt-5 h-10 xs:block sm:hidden"
        >
          <img
            className="h-8"
            src="/src/assets/icons/close.png"
            alt="Close sidebar"
          />
        </button>
      </div>
      <section className=" z-10 flex h-[100vh] w-20 flex-col items-center justify-center gap-10 bg-[#1E1F25] xs:hidden">
        <Icons setMode={setMode}></Icons>
      </section>
    </>
  );
}
