/* eslint-disable react/prop-types */
import three_dots from "../../assets/icons/three_dots.svg";
import { useState } from "react";
import ProjectOptionsModal from "./ProjectOptionsModal.jsx";
import EditProjectPopup from "./EditProjectPopup.jsx";

export default function ProjectCard({
  project,
  projects,
  setProjects,
  editProject,
  deleteProject,
}) {
  const [projectOptionsVisible, setProjectOptionsVisible] = useState(false);
  const [editProjectPopupVisible, setEditProjectPopupVisible] = useState(false);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Januar je 0!
    const year = date.getFullYear();
    return `${day}.${month}.${year}.`;
  }

  return (
    <>
      <div className="relative flex w-[32%] flex-col gap-3 rounded-lg border-2 border-[#5F6388] p-5 shadow-xl">
        <div className="flex justify-end">
          <div className="h-[35px]">
            <button
              onClick={() => {
                setProjectOptionsVisible(
                  (projectOptionsVisible) => !projectOptionsVisible,
                );
              }}
            >
              <img src={three_dots} className="three-dots-button" />
            </button>
          </div>
        </div>
        <h3 className="text-xl font-bold">{project.name}</h3>
        <p className="text-gray-300">{project.summary}</p>
        <div className="flex items-center justify-between">
          <span>{formatDate(project.deadline)}</span>
        </div>
        <div className="flex  justify-end">
          <button>Details</button>
        </div>
        {projectOptionsVisible && (
          <ProjectOptionsModal
            project={project}
            onClose={() => setProjectOptionsVisible(false)}
            projectOptionsVisible={projectOptionsVisible}
            editProject={editProject}
            deleteProject={deleteProject}
            projects={projects}
            setProjects={setProjects}
            setEditProjectPopupVisible={setEditProjectPopupVisible} // Prosleđujemo ovde
          />
        )}
      </div>
      {editProjectPopupVisible && (
        <EditProjectPopup
          project={project}
          projects={projects}
          setProjects={setProjects}
          onClose={() => {
            setEditProjectPopupVisible(false);
            setProjectOptionsVisible(false);
          }}
          editProject={editProject}
        />
      )}
    </>
  );
}
