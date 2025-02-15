/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import add_cross from "../../assets/icons/add_plus.svg";
import { useEffect, useState, useContext } from "react";
import ProjectCard from "./ProjectCard.jsx";
import { getAccessToken } from "../../utils/access_token.js";
import CreateProjectPopup from "./CreateProjectPopup.jsx";
import { AuthContext } from "../AuthProvider.jsx";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../../ThemeContext.jsx";

const apiURL = "http://localhost:8000";

export default function Projects({ currentProject, setCurrentProject }) {
  const { userInfo, setUserInfo, logout } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [originalProjects, setOriginalProjects] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  //zelim da se ponovo renderuju projekti kada se promeni currentProject

  async function editProject(project) {
    const editProjectPromise = () => {
      return axios.put(
        `${apiURL}/projects/${project.id}`,
        {
          name: project.name,
          description: project.description,
          deadline: project.deadline,
          creation_date: project.creation_date,
          id: project.id,
          user: project.user,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
    };

    toast
      .promise(editProjectPromise(), {
        pending: "Editing project...",
        success: "Project edited successfully!",
        error: "Failed to edit project",
      })
      .then((response) => {
        setProjects(
          projects.map((p) => (p.id === project.id ? response.data : p)),
        );
        setOriginalProjects(
          originalProjects.map((p) =>
            p.id === project.id ? response.data : p,
          ),
        );
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("You are not authorized to view this page. Please log in");
          logout();
        }
        console.error("Failed to edit project:", error);
      });
  }

  async function deleteProject(projectId) {
    "Deleting project with id:", projectId;

    const deleteProjectPromise = () => {
      return axios.delete(`${apiURL}/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
    };

    toast
      .promise(deleteProjectPromise(), {
        pending: "Deleting project...",
        success: "Project deleted successfully!",
        error: "Failed to delete project",
      })
      .then((response) => {
        setProjects(projects.filter((p) => p.id !== projectId));
        setOriginalProjects(originalProjects.filter((p) => p.id !== projectId));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("You are not authorized to view this page. Please log in");
          logout();
        }
        console.error("Failed to delete project:", error);
      });
  }

  const fetchProjects = async () => {
    try {
      //izvlacenje svih projekata na kojima radi ulogovani korisnik, kao vlasnik ili kao neka druga uloga (npr. developer)
      const response = await axios.get(`${apiURL}/projects/related/`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setOriginalProjects(response.data);
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
      owner: userInfo.id,
    };

    const addProjectPromise = () => {
      if (originalProjects.map((p) => p.name).includes(newProject.name)) {
        return Promise.reject(
          new Error("Project with this name already exists"),
        );
      }
      return axios.post(`${apiURL}/projects/`, newProject, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
      });
    };

    toast
      .promise(addProjectPromise(), {
        pending: "Creating project...",
        success: "Project created successfully!",
        error: "Failed to create project",
      })
      .then((response) => {
        setProjects([...projects, response.data]);
        setOriginalProjects([...originalProjects, response.data]);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("You are not authorized to view this page. Please log in");
          logout();
        }
        console.error("Failed to create project:", error);
      });
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

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      setProjects(originalProjects); // Resetujte na originalnu listu projekata
      return;
    }

    const filteredProjects = originalProjects.filter((project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    // Dodajte currentProject ako nije već u filtriranoj listi
    if (
      currentProject &&
      !filteredProjects.some((project) => project.id === currentProject.id)
    ) {
      filteredProjects.push(currentProject);
    }

    setProjects(filteredProjects);
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        draggable
        theme={darkTheme ? "dark" : "light"}
        transition={Slide}
      />
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>
        <div className="flex items-center gap-10">
          <input
            style={{
              backgroundColor: darkerColor,
              color: textColor,
            }}
            className="h-10 w-64 rounded-lg p-4 focus:outline-none"
            placeholder="Search by name.."
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            className="h-12 w-12 rounded-lg border-2 border-[#5F6388]"
            onClick={() => showPopupForm()}
          >
            <img src={add_cross} className="" />
          </button>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-10 xs:flex-col sm:flex-row">
        <div className="xs:w-full sm:w-full lg:w-1/3">
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
        <div className="w-[100%]">
          <h3 className="p-5 text-xl font-semibold">Other Projects</h3>
          <div className="no-scrollbar max-h-[80vh] overflow-y-auto pb-60">
            <div className="grid gap-4 sm:grid-cols-[repeat(auto-fit,minmax(20vw,20vw))]">
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
                      toast={toast}
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
                        toast={toast}
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
          toast={toast}
        />
      )}
    </>
  );
}
