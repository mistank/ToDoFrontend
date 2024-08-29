/* eslint-disable react/prop-types */
import UserLog from "./UserLog.jsx";
// import SearchBar from "./SearchBar.jsx";
import { useContext } from "react";
import { ThemeContext } from "../../../ThemeContext.jsx";

export default function Header({ setMode }) {
  const { darkTheme } = useContext(ThemeContext);
  const color = darkTheme ? "#1E1F25" : "#FBFAFF";
  return (
    <header
      className={`z-20 flex h-[10vh] flex-row items-center justify-between px-5 pt-2`}
      style={{ backgroundColor: color }}
    >
      <button className="h-[80%]">
        <img
          className=" h-full"
          src={`${darkTheme ? "/src/assets/Logo.svg" : "/src/assets/Logo_light.svg"}`}
          alt="logo"
        />
      </button>
      {/* <SearchBar></SearchBar> */}
      <UserLog setMode={setMode}></UserLog>
    </header>
  );
}
