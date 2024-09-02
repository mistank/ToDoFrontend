/* eslint-disable react/prop-types */
import SidebarButton from "./SidebarButton.jsx";
import add_person from "../../assets/icons/menu-icons/add_person.svg";
import add_person_white from "../../assets/icons/menu-icons/add_person_white.svg";
import kanban from "../../assets/icons/menu-icons/kanban.svg";
import kanban_white from "../../assets/icons/menu-icons/kanban_white.svg";
import projects_icon from "../../assets/icons/menu-icons/projects_icon.svg";
import projects_icon_white from "../../assets/icons/menu-icons/projects_icon_white.svg";
import setting_icon from "../../assets/icons/menu-icons/setting_icon.svg";
import setting_icon_white from "../../assets/icons/menu-icons/setting_icon_white.svg";
import list_icon from "../../assets/icons/menu-icons/list_icon.svg";
import list_icon_white from "../../assets/icons/menu-icons/list_icon_white.svg";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext.jsx";

export default function MobileMenu({ setMode, setIsOpen }) {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  return (
    <div className="absolute flex h-full w-full items-center justify-center transition-transform duration-500 ease-in-out">
      <button
        onClick={() => setIsOpen(false)}
        className="fixed right-5 top-0 ml-5 mt-5 rounded-lg bg-[#5051F9] p-3 xs:block sm:hidden"
      >
        <img
          className="h-5"
          src="/src/assets/icons/close.png"
          alt="Close sidebar"
        />
      </button>
      <div className="flex flex-col gap-5">
        <div
          style={{ color: textColor }}
          className="flex w-56 flex-row items-center justify-between"
        >
          <span>Projects</span>
          <SidebarButton
            icon={projects_icon}
            whiteIcon={projects_icon_white}
            onClick={() => {
              setMode("projects-view");
              setIsOpen(false);
            }}
          />
        </div>
        <div
          style={{ color: textColor }}
          className="flex w-56 flex-row items-center justify-between"
        >
          <span>Task View</span>
          <SidebarButton
            icon={list_icon}
            whiteIcon={list_icon_white}
            onClick={() => {
              setMode("task-list-view");
              setIsOpen(false);
            }}
          />
        </div>
        <div
          style={{ color: textColor }}
          className="flex w-56 flex-row items-center justify-between"
        >
          <span> Kanban View</span>
          <SidebarButton
            icon={kanban}
            whiteIcon={kanban_white}
            onClick={() => {
              setMode("task-view");
              setIsOpen(false);
            }}
          />
        </div>
        <div
          style={{ color: textColor }}
          className="flex w-56 flex-row items-center justify-between"
        >
          <span>Add People</span>
          <SidebarButton
            icon={add_person}
            whiteIcon={add_person_white}
            onClick={() => {
              setMode("add-people");
              setIsOpen(false);
            }}
          />
        </div>
        <div
          style={{ color: textColor }}
          className="flex w-56 flex-row items-center justify-between"
        >
          <span>Settings</span>
          <SidebarButton
            icon={setting_icon}
            whiteIcon={setting_icon_white}
            onClick={() => {
              setMode("profile-settings");
              setIsOpen(false);
            }}
          />
        </div>
      </div>
    </div>
  );
}
