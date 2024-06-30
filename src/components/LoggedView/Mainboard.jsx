import Sidebar from "./Sidebar.jsx";
import ProfileSettings from "./ProfileSettings/ProfileSettings.jsx";
import Projects from "./Projects.jsx";
import TaskView from "./TaskView.jsx";
import { useState } from "react";

export default function Mainboard() {
  const [mode, setMode] = useState("profile-settings");

  let form;
  switch (mode) {
    case "profile-settings":
      form = <ProfileSettings setMode={setMode} />;
      break;
    case "create-project":
      form = <Projects setMode={setMode} />;
      break;
    case "task-view":
      form = <TaskView setMode={setMode} />;
      break;
  }

  return (
    <main className="flex h-[100vh] w-[100vw] bg-[#131517]">
      <Sidebar />
      <div className="no-scrollbar flex h-[100%] w-[100%] flex-1 flex-col items-center justify-center overflow-scroll px-10 pt-[5%]">
        {form}
      </div>
    </main>
  );
}
