// export default function SearchBar() {
//   return (
//     <div className="relative w-[30%] flex flex-row items-center overflow-hidden">
//       <input type="text" className="w-[100%] box-border p-3 bg-[#050505] h-[50%] placeholder-[#9BABC5] font-dm rounded-lg text-[#9BABC5] text-sm focus:outline-none" placeholder="Search anything..." />
//       <div className=" h-[50%] w-[10%] absolute right-0 bg-[#050505] flex items-center justify-center">
//         <img className="" src="/src/assets/icons/search.svg" alt="" />
//       </div>
//     </div>
//   );
// }

export default function SearchBar() {
  return (
    <div className="relative w-[30%] flex-row items-center overflow-hidden sm:block hidden">
      <input type="text" className="w-[100%] box-border p-3 bg-[#050505] h-[50%] placeholder-[#9BABC5] font-dm rounded-lg text-[#9BABC5] text-sm focus:outline-none" placeholder="Search anything..." />
      <div className=" h-[50%] w-[10%] absolute right-0 bg-[#050505] flex items-center justify-center">
        <img className="" src="/src/assets/icons/search.svg" alt="" />
      </div>
    </div>
  );
}
