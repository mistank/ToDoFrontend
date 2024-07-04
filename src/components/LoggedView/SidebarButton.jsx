/* eslint-disable react/prop-types */
export default function SidebarButton({ icon, onClick }) {
  return (
    <button onClick={onClick} className="flex h-8 w-8 justify-center ">
      <img src={icon} className="w-[100%]" />
    </button>
  );
}
