/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import delete_icon from "../../assets/icons/delete_icon.svg";
import edit_icon from "../../assets/icons/edit_icon.svg";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider.jsx";
import { ThemeContext } from "../../ThemeContext.jsx";

export default function TaskOptionsModal({
  taskOptionsVisible,
  setTaskOptionsVisible,
  deleteTaskPopupVisible,
  setDeleteTaskPopupVisible,
  tasks,
  task,
  setTasks,
  onClose,
  editTask,
  deleteTask,
  setEditTaskPopupVisible, // Dodajemo ovde
  currentProject,
}) {
  const modalRef = useRef();

  const auth = useContext(AuthContext);
  const isOwner = auth.userInfo.id === currentProject.user.id;
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !deleteTaskPopupVisible &&
        event.target.className != "three-dots-button"
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, deleteTaskPopupVisible]);

  return (
    <>
      <div
        ref={modalRef}
        style={{
          animation: `${taskOptionsVisible ? "fadein 0.25s" : ""}`,
          transition: "transform 0.3s ease-out",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
          backgroundColor: lighterColor,
        }}
        className="absolute right-[16px] top-[40px] w-48 rounded-lg"
      >
        <div className="flex flex-col rounded-lg p-4">
          <span className="mb-2 pl-2 text-xs text-gray-400">Task options</span>
          <button
            className={`flex items-center justify-start gap-5 rounded-lg p-2 text-left hover:bg-gray-600 hover:bg-opacity-50 ${!isOwner ? "disabled-button" : ""}`}
            onClick={() => {
              deleteTask(task.id);
              setTasks(tasks.filter((t) => t.id !== task.id));
              onClose();
            }}
            disabled={!isOwner}
          >
            <img className="h-5 w-5" src={delete_icon} />
            Delete
          </button>
          <button
            className={`flex items-center justify-start gap-5 rounded-lg p-2 text-left hover:bg-gray-600 hover:bg-opacity-50 ${!isOwner ? "disabled-button" : ""} `}
            onClick={() => {
              setEditTaskPopupVisible(
                (editTaskPopupVisible) => !editTaskPopupVisible,
              );
            }}
            disabled={!isOwner}
          >
            <img className="h-5 w-5" src={edit_icon} />
            Edit
          </button>
        </div>
      </div>
    </>
  );
}
