import TaskBoard from "./TaskBoard.jsx";

/* eslint-disable react/prop-types */
export default function TaskView({ currentProject }) {
  return <TaskBoard currentProject={currentProject} />;
}
