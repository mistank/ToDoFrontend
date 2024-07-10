/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";
import delete_icon from "../../assets/icons/delete_icon.svg";
import edit_icon from "../../assets/icons/edit_icon.svg";
import star_icon from "../../assets/icons/star_icon.svg";
import EditProjectPopup from "./EditProjectPopup.jsx";

export default function TaskOptionsModal({
  projectOptionsVisible,
  setProjectOptionsVisible,
  projects,
  project,
  setProjects,
  onClose,
  editProject,
  deleteProject,
  setEditProjectPopupVisible,
  editProjectPopupVisible,
}) {
  const modalRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        !editProjectPopupVisible &&
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
  }, [onClose, editProjectPopupVisible]);

  return (
    <>
      <div
        ref={modalRef}
        style={{
          animation: `${projectOptionsVisible ? "fadein 0.25s" : ""}`,
          transition: "transform 0.3s ease-out",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
        className="absolute right-[16px] top-[40px] w-56 rounded-lg bg-gray-700"
      >
        <div className="flex flex-col rounded-lg p-4">
          <span className="mb-2 pl-2 text-xs text-gray-400">
            Project options
          </span>
          <button
            className="flex items-center justify-start gap-5 rounded-lg p-2 text-left hover:bg-gray-600 hover:bg-opacity-50"
            onClick={() => {
              deleteProject(project.id).then(() =>
                setProjects(projects.filter((p) => p.id !== project.id)),
              );
              onClose();
            }}
          >
            <img className="h-5 w-5" src={delete_icon} />
            Delete
          </button>
          <button
            className="flex items-center justify-start gap-5 rounded-lg p-2 text-left hover:bg-gray-600 hover:bg-opacity-50"
            onClick={() =>
              setEditProjectPopupVisible(
                (editProjectPopupVisible) => !editProjectPopupVisible,
              )
            }
          >
            <img className="h-5 w-5" src={edit_icon} />
            Edit
          </button>
          <button
            className="flex items-center justify-start gap-5 rounded-lg p-2 text-left hover:bg-gray-600 hover:bg-opacity-50"
            onClick={() =>
              setDeleteProjectPopupVisible(
                (deleteProjectPopupVisible) => !deleteProjectPopupVisible,
              )
            }
          >
            <img className="h-5 w-5" src={star_icon} />
            Choose as current
          </button>
        </div>
      </div>
    </>
  );
}
