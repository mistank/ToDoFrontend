/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from "axios";
import add_cross from "../../assets/icons/add_plus.svg";
import { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard.jsx";
import { getAccessToken } from "../../utils/access_token.js";

const apiUrl = "http://localhost:8000";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${apiUrl}/projects/owned/`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setProjects(response.data); // Pretpostavimo da response.data sadrži niz projekata
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []); // Prazan niz znači da će se efekat pokrenuti samo jednom nakon montiranja komponente

  return (
    // <div className="shadow-lgs mt-5 h-[80vh] w-[100%] rounded-lg bg-[#1E1F25] p-8 text-white">
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>
        <button className="h-12 w-12 rounded-lg border-2 border-[#5F6388]">
          <img src={add_cross} className="" />
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>

    // </div>
  );
}

/*// Projects.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import add_cross from "../../assets/icons/add_plus.svg";
import ProjectCard from "./ProjectCard.jsx";
const apiUrl = "http://localhost:8000";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${apiUrl}/projects/`);
      setProjects(response.data); // Pretpostavimo da response.data sadrži niz projekata
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []); // Prazan niz znači da će se efekat pokrenuti samo jednom nakon montiranja komponente

  return (
    <>
      <div className="mb-6 flex flex-col items-center justify-between">
        <h2 className="text-3xl font-bold">Projects</h2>
        <button className="mt-4 h-12 w-12 rounded-lg border-2 border-[#5F6388]">
          <img src={add_cross} alt="Add project" />
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}
 */
