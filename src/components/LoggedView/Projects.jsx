/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import add_cross from "../../assets/icons/add_plus.svg";
import { useEffect, useState, useContext } from "react";
import ProjectCard from "./ProjectCard.jsx";
import { getAccessToken } from "../../utils/access_token.js";
import CreateProjectPopup from "./CreateProjectPopup.jsx";
import { AuthContext } from "../AuthProvider.jsx";

const apiURL = "http://localhost:8000";

export default function Projects({ currentProject, setCurrentProject }) {
  const { userInfo, setUserInfo, logout } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  //zelim da se ponovo renderuju projekti kada se promeni currentProject

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
      if (error.response && error.response.status === 401) {
        alert("You are not authorized to view this page. Please log in");
        logout();
      }
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
      if (error.response && error.response.status === 401) {
        alert("You are not authorized to view this page. Please log in");
        logout();
      }
      console.error("Failed to delete project:", error);
    }
  }

  const fetchProjects = async () => {
    try {
      //izvlacenje svih projekata na kojima radi ulogovani korisnik, kao vlasnik ili kao neka druga uloga (npr. developer)
      const response = await axios.get(`${apiURL}/projects/related/`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setProjects(response.data); // Pretpostavimo da response.data sadrži niz projekata
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You are not authorized to view this page. Please log in");
        logout();
      }
      console.log(error);
    }
  };

  async function addProject(project) {
    const newProject = {
      name: project.name,
      description: project.description,
      deadline: project.deadline,
    };
    try {
      console.log("Creating project:", newProject);
      const response = await axios.post(`${apiURL}/projects/`, newProject, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setProjects([...projects, response.data]);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("You are not authorized to view this page. Please log in");
        logout();
      }
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
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>
        <button
          className="h-12 w-12 rounded-lg border-2 border-[#5F6388]"
          onClick={() => showPopupForm()}
        >
          <img src={add_cross} className="" />
        </button>
      </div>
      <div className="flex flex-row justify-between">
        <div className="w-[25%]">
          <h3 className="p-5 text-xl font-semibold">Current Project</h3>
          {
            // Ako trenutni projekat nije postavljen, prikaži poruku
            currentProject === null ? (
              <p className="p-5 text-gray-300">No current project selected</p>
            ) : (
              projects
                .filter((project) => project.id == currentProject.id)
                .map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    projects={projects}
                    setProjects={setProjects}
                    editProject={editProject}
                    deleteProject={deleteProject}
                    setCurrentProject={setCurrentProject}
                    currentProject={currentProject}
                  />
                ))
            )
          }
        </div>
        <div className="w-[65%]">
          <h3 className="p-5 text-xl font-semibold">Other Projects</h3>
          <div className="no-scrollbar max-h-[80vh] overflow-y-auto pb-60">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentProject === null
                ? projects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      projects={projects}
                      setProjects={setProjects}
                      editProject={editProject}
                      deleteProject={deleteProject}
                      setCurrentProject={setCurrentProject}
                      currentProject={currentProject}
                    />
                  ))
                : projects
                    .filter((project) => project.id !== currentProject.id)
                    .map((project) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        projects={projects}
                        setProjects={setProjects}
                        editProject={editProject}
                        deleteProject={deleteProject}
                        setCurrentProject={setCurrentProject}
                      />
                    ))}
            </div>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <CreateProjectPopup
          onClose={hidePopupForm}
          addProject={addProject}
          projects={projects}
        />
      )}
    </div>
  );
}
