import UserLog from "./UserLog.jsx";
import SearchBar from "./SearchBar.jsx";
export default function Header() {
  return (
    <header className="fixed z-10 flex h-[10vh] w-[100vw] flex-row items-center justify-between bg-[#1E1F25] px-5 pt-2">
      <button className="h-[80%]">
        <img className=" h-full" src="/src/assets/Logo.svg" alt="logo" />
      </button>
      <SearchBar></SearchBar>
      <UserLog></UserLog>
    </header>
  );
}
