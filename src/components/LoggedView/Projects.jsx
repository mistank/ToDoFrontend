/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import add_cross from "../../assets/icons/add_plus.svg";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import { getAccessToken } from "../../utils/access_token.js";

const apiURL = "http://localhost:8000";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  async function editProject(project) {
    try {
      const response = await axios.put(
        `${apiURL}/projects/${project.id}`,
        {
          name: project.name,
          description: project.description,
          deadline: project.deadline,
          creation_date: project.creation_date,
          id: project.id,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      setProjects(
        projects.map((p) => (p.id === project.id ? response.data : p)),
      );
    } catch (error) {
      console.error("Failed to edit project:", error);
    }
  }

  async function deleteProject(projectId) {
    console.log("Deleting project with id:", projectId);
    try {
      const response = await axios.delete(`${apiURL}/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setProjects(projects.filter((p) => p.id !== projectId));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  }

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${apiURL}/projects/owned/`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setProjects(response.data); // Pretpostavimo da response.data sadrži niz projekata
    } catch (error) {
      console.log(error);
    }
  };

  async function addProject() {
    const newProject = {
      name: "New Project",
      description: "New Project Description",
      deadline: new Date(),
      creation_date: new Date(),
    };
    try {
      const response = await axios.post(`${apiURL}/projects/`, newProject, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setProjects([...projects, response.data]);
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []); // Prazan niz znači da će se efekat pokrenuti samo jednom nakon montiranja komponente

  const showPopupForm = () => {
    setIsPopupVisible(true);
    document.body.style.overflow = "hidden"; // Sprečava skrolovanje dok je popup aktivan
  };

  const hidePopupForm = () => {
    setIsPopupVisible(false);
    document.body.style.overflow = "auto"; // Dozvoljava skrolovanje kada se popup zatvori
  };

  return (
    // <div className="shadow-lgs mt-5 h-[80vh] w-[100%] rounded-lg bg-[#1E1F25] p-8 text-white">
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>
        <button
          className="h-12 w-12 rounded-lg border-2 border-[#5F6388]"
          onClick={() => showPopupForm()}
        >
          <img src={add_cross} className="" />
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            projects={projects}
            setProjects={setProjects}
            editProject={editProject}
            deleteProject={deleteProject}
          />
        ))}
      </div>
    </>
  );
}
