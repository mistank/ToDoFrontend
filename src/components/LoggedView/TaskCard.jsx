/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import three_dots from "../../assets/icons/three_dots.svg";
import TaskOptionsModal from "./TaskOptionsModal.jsx";
import EditTaskPopup from "./EditTaskPopup.jsx";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";

const apiURL = "http://localhost:8000";
export default function TaskCard({
  task,
  editTask,
  deleteTask,
  tasks,
  setTasks,
  projectId,
}) {
  const [taskOptionsVisible, setTaskOptionsVisible] = useState(false);
  const [editTaskPopupVisible, setEditTaskPopupVisible] = useState(false);
  const [people, setPeople] = useState([]);

  const handleDragStart = (e) => {
    const taskJson = JSON.stringify(task); // Convert the task object to a JSON string
    e.dataTransfer.setData("task", taskJson);
    console.log("Task dragged:", taskJson);
    e.dataTransfer.effectAllowed = "move";
  };

  useEffect(() => {
    fetchPeopleForTask();
  }, []);

  const fetchPeopleForTask = async () => {
    try {
      const response = await axios.get(
        `${apiURL}/people_assigned_to_task/${task.id}`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      setPeople(response.data);
    } catch (error) {
      console.error(error);
    }
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
    <>
      <div
        draggable
        className="relative flex flex-col gap-2 overflow-visible rounded-lg bg-gray-700 p-4"
        onDragStart={handleDragStart}
      >
        <div className="flex h-[35px] items-center justify-between">
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
          </div>
        </div>
        <h3 className="text-lg font-bold">{task.name}</h3>
        <p className="text-gray-400">{truncateText(task.description, 20)}</p>
        <div className="flex items-center justify-between">
          <span>{formatDate(task.deadline)}</span>
          {people?.length === 0 ? (
            <span>No one assigned</span>
          ) : (
            <div className="flex -space-x-2">
              {people.slice(0, 3).map((person) => (
                <img
                  key={person.email}
                  src={`https://api.dicebear.com/9.x/personas/svg?seed=${person.email}`}
                  alt="avatar"
                  className="h-6 w-6 rounded-full border-2 border-gray-900"
                />
              ))}
              {people.length > 3 && (
                <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-900 bg-gray-900">
                  +{people.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
        {taskOptionsVisible && (
          <TaskOptionsModal
            task={task}
            onClose={() => setTaskOptionsVisible(false)}
            taskOptionsVisible={taskOptionsVisible}
            editTask={editTask}
            deleteTask={deleteTask}
            tasks={tasks}
            setTasks={setTasks}
            setEditTaskPopupVisible={setEditTaskPopupVisible} // Prosleđujemo ovde
          />
        )}
      </div>
      {editTaskPopupVisible && (
        <EditTaskPopup
          task={task}
          tasks={tasks}
          setTasks={setTasks}
          onClose={() => {
            setEditTaskPopupVisible(false);
            setTaskOptionsVisible(false);
          }}
          setEditTaskPopupVisible={setEditTaskPopupVisible}
          setTaskOptionsVisible={setTaskOptionsVisible}
          editTask={editTask}
          people={people}
          setPeople={setPeople}
          projectId={projectId}
        />
      )}
    </>
  );
}
