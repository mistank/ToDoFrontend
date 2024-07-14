import TaskBoard from "./TaskBoard.jsx";

/* eslint-disable react/prop-types */
export default function TaskView({ currentProject, setMode }) {
  return <TaskBoard setMode={setMode} currentProject={currentProject} />;
}
