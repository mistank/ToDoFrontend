/* eslint-disable react/prop-types */
import Sidebar from "./Sidebar.jsx";
import ProfileSettings from "./ProfileSettings/ProfileSettings.jsx";
import Projects from "./Projects.jsx";
import TaskView from "./TaskView.jsx";
import AddPeople from "./AddPeople.jsx";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext.jsx";
import TaskListView from "./TaskListView.jsx";

export default function Mainboard({ mode, setMode }) {
  let form;
  const [currentProject, setCurrentProject] = useState(
    JSON.parse(localStorage.getItem("currentProject")),
  );

  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  useEffect(() => {
    // Sačuvati currentProject u localStorage
    localStorage.setItem("currentProject", JSON.stringify(currentProject));
  }, [currentProject]); // Ovaj useEffect reaguje samo na promene currentProject

  switch (mode) {
    case "profile-settings":
      form = <ProfileSettings setMode={setMode} />;
      break;
    case "projects-view":
      form = (
        <Projects
          setMode={setMode}
          currentProject={currentProject}
          setCurrentProject={setCurrentProject}
        />
      );
      break;
    case "task-view":
      form = <TaskView setMode={setMode} currentProject={currentProject} />;
      break;
    case "add-people":
      form = <AddPeople setMode={setMode} currentProject={currentProject} />;
      break;
    case "task-list-view":
      form = <TaskListView setMode={setMode} currentProject={currentProject} />;
      break;
  }

  return (
    <main
      className="flex h-full w-full"
      style={{ backgroundColor: darkerColor }}
    >
      <Sidebar setMode={setMode} currentProject={currentProject} />
      <div className="flex w-[100%] flex-col items-center justify-start">
        {/* overflow-x-auto overflow-y-clip */}
        <div
          style={{ backgroundColor: lighterColor, color: textColor }}
          className="scrollbar shadow-lgs mt-5 h-[85vh] w-[90vw] overflow-hidden rounded-lg p-8"
        >
          {form}
        </div>
      </div>
    </main>
  );
}
