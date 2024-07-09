/* eslint-disable react/prop-types */
import { useState } from "react";
import three_dots from "../../assets/icons/three_dots.svg";
import TaskOptionsModal from "./TaskOptionsModal.jsx";

export default function TaskCard({ task, editTask, deleteTask, tasks }) {
  //task predstavlja objekat task, a ne task.id

  const [taskOptionsVisible, setTaskOptionsVisible] = useState(false);

  const handleDragStart = (e) => {
    const taskJson = JSON.stringify(task); // Convert the task object to a JSON string
    e.dataTransfer.setData("task", taskJson);
    console.log("Task dragged:", taskJson);
    e.dataTransfer.effectAllowed = "move";
  };

  // Funkcija za skraćivanje teksta
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Januar je 0!
    const year = date.getFullYear();
    return `${day}.${month}.${year}.`;
  }

  return (
    <div
      draggable
      className="flex flex-col gap-2 rounded-lg bg-gray-700 p-4"
      onDragStart={handleDragStart}
    >
      <div className="flex justify-between">
        <span className="rounded bg-[#5051F9] px-2 py-1 text-sm font-semibold text-white">
          {task.taskCategory.name}
        </span>
        <div>
          <button
            onClick={() => {
              setTaskOptionsVisible(
                (taskOptionsVisible) => !taskOptionsVisible,
              );
            }}
          >
            <img src={three_dots} className="three-dots-button" />
          </button>
          {taskOptionsVisible && (
            <TaskOptionsModal
              task={task}
              onClose={() => setTaskOptionsVisible(false)}
              taskOptionsVisible={taskOptionsVisible}
              editTask={editTask}
              deleteTask={deleteTask}
              tasks={tasks}
              setTaskOptionsVisible={setTaskOptionsVisible}
            />
          )}
        </div>
      </div>
      <h3 className="text-lg font-bold">{task.name}</h3>
      <p className="text-gray-400">{truncateText(task.description, 20)}</p>
      <div className="flex items-center justify-between">
        <span>{formatDate(task.deadline)}</span>
        {/* <div className="flex -space-x-2">
          {task.avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt="avatar"
              className="h-6 w-6 rounded-full border-2 border-gray-900"
            />
          ))}
        </div> */}
      </div>
    </div>
  );
}
