/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";
import delete_icon from "../../assets/icons/delete_icon.svg";
import edit_icon from "../../assets/icons/edit_icon.svg";
import EditTaskPopup from "./EditTaskPopup.jsx";

export default function TaskOptionsModal({
  taskOptionsVisible,
  setTaskOptionsVisible,
  tasks,
  task,
  setTasks,
  onClose,
  editTask,
  deleteTask,
}) {
  const modalRef = useRef();
  const [editTaskPopupVisible, setEditTaskPopupVisible] = useState(false);
  const [deleteTaskPopupVisible, setDeleteTaskPopupVisible] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !editTaskPopupVisible &&
        event.target.className != "three-dots-button"
      ) {
        onClose();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, editTaskPopupVisible]);

  return (
    <>
      <div
        ref={modalRef}
        style={{
          animation: `${taskOptionsVisible ? "fadein 0.25s" : ""}`,
          transition: "transform 0.3s ease-out",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
        className="absolute w-48 rounded-lg bg-gray-700"
      >
        <div className="flex flex-col rounded-lg p-4">
          <span className="mb-2 pl-2 text-xs text-gray-400">Task options</span>
          <button
            className="flex items-center justify-start gap-5 rounded-lg p-2 text-left hover:bg-gray-600 hover:bg-opacity-50"
            onClick={() =>
              setDeleteTaskPopupVisible(
                (deleteTaskPopupVisible) => !deleteTaskPopupVisible,
              )
            }
          >
            <img className="h-5 w-5" src={delete_icon} />
            Delete
          </button>
          <button
            className="flex items-center justify-start gap-5 rounded-lg p-2 text-left hover:bg-gray-600 hover:bg-opacity-50"
            onClick={() =>
              setEditTaskPopupVisible(
                (editTaskPopupVisible) => !editTaskPopupVisible,
              )
            }
          >
            <img className="h-5 w-5" src={edit_icon} />
            Edit
          </button>
        </div>
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
          editTask={editTask}
        />
      )}
    </>
  );
}
