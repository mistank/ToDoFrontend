import UserLog from './UserLog.jsx';
import SearchBar from './SearchBar.jsx';
export default function Header() {
  return (
    <header className="bg-[#1E1F25] px-5 pt-2 h-[10vh] flex flex-row items-center justify-between">
      <button className="h-[80%]">
        <img className=" h-full" src="/src/assets/Logo.svg" alt="logo" />
      </button>
      <SearchBar></SearchBar>
      <UserLog></UserLog>
    </header>
  );
}
