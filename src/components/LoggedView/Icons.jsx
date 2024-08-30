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

export default function Icons({ setMode, currentProject }) {
  return (
    // <div className="w-full h-auto space-y-10 flex flex-col">
    <>
      <SidebarButton
        icon={projects_icon}
        whiteIcon={projects_icon_white}
        onClick={() => {
          setMode("projects-view");
        }}
      />
      <SidebarButton
        icon={list_icon}
        whiteIcon={list_icon_white}
        onClick={() => {
          setMode("task-list-view");
        }}
      />
      <SidebarButton
        icon={kanban}
        whiteIcon={kanban_white}
        onClick={() => {
          setMode("task-view");
        }}
      />
      <SidebarButton
        icon={add_person}
        whiteIcon={add_person_white}
        onClick={() => {
          setMode("add-people");
        }}
      />
      <SidebarButton
        icon={setting_icon}
        whiteIcon={setting_icon_white}
        onClick={() => {
          setMode("profile-settings");
        }}
      />
    </>

    // </div>
  );
}
