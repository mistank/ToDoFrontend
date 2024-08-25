/* eslint-disable react/prop-types */
import Sidebar from "./Sidebar.jsx";
import ProfileSettings from "./ProfileSettings/ProfileSettings.jsx";
import Projects from "./Projects.jsx";
import TaskView from "./TaskView.jsx";
import AddPeople from "./AddPeople.jsx";
import { useState, useEffect } from "react";

export default function Mainboard({ mode, setMode }) {
  let form;
  const [currentProject, setCurrentProject] = useState(
    JSON.parse(localStorage.getItem("currentProject")),
  );

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
  }

  return (
    <main className="flex h-full w-full bg-[#131517]">
      <Sidebar setMode={setMode} currentProject={currentProject} />
      <div className="flex w-[100%] flex-col items-center justify-start">
        {/* overflow-x-auto overflow-y-clip */}
        <div className="scrollbar shadow-lgs mt-5 h-[85vh] w-[90vw] overflow-hidden rounded-lg bg-[#1E1F25] p-8 text-white">
          {form}
        </div>
      </div>
    </main>
  );
}
