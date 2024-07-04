/* eslint-disable react/prop-types */
import SidebarButton from "./SidebarButton.jsx";

import add_person from "../../assets/icons/menu-icons/add_person.svg";
import kanban from "../../assets/icons/menu-icons/kanban.svg";
import files_icon from "../../assets/icons/menu-icons/files_icon.svg";
import message_icon from "../../assets/icons/menu-icons/message_icon.svg";
import projects_icon from "../../assets/icons/menu-icons/projects_icon.svg";
import setting_icon from "../../assets/icons/menu-icons/setting_icon.svg";
import tasks_icon from "../../assets/icons/menu-icons/tasks_icon.svg";

export default function Icons({ setMode }) {
  return (
    // <div className="w-full h-auto space-y-10 flex flex-col">
    <>
      <SidebarButton
        icon={kanban}
        onClick={() => {
          setMode("task-view");
        }}
      />
      <SidebarButton
        icon={projects_icon}
        onClick={() => {
          setMode("projects-view");
        }}
      />
      <SidebarButton
        icon={add_person}
        onClick={() => {
          setMode("add-people");
        }}
      />
      <SidebarButton
        icon={setting_icon}
        onClick={() => {
          setMode("profile-settings");
        }}
      />
    </>

    // </div>
  );
}
