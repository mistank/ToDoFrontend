/* eslint-disable react/prop-types */
import UserLog from "./UserLog.jsx";
// import SearchBar from "./SearchBar.jsx";
export default function Header({ setMode }) {
  return (
    //probna promena, sklonio sam fixed iz headera
    <header className="z-20 flex h-[10vh] flex-row items-center justify-between bg-[#1E1F25] px-5 pt-2">
      <button className="h-[80%]">
        <img className=" h-full" src="/src/assets/Logo.svg" alt="logo" />
      </button>
      {/* <SearchBar></SearchBar> */}
      <UserLog setMode={setMode}></UserLog>
    </header>
  );
}
