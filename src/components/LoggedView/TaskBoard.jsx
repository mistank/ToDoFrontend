/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import Column from "./Column";
import EmptyColumn from "./EmptyColumn";
import { getAccessToken } from "../../utils/access_token.js";

const apiURL = "http://localhost:8000";

export default function TaskBoard({ currentProject, setMode }) {
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    if (currentProject) {
      axios
        .get(`${apiURL}/statuses_from_project/${currentProject.id}`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        .then((response) => {
          setStatuses(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []); // Uklonjena je zavisnost od isStatusesLoaded jer se koristi samo jednom za inicijalno učitavanje

  useEffect(() => {
    if (currentProject) {
      axios
        .get(`${apiURL}/tasks_from_project/${currentProject.id}`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        .then((response) => {
          setTasks(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []); // Uklonjena je zavisnost od isTasksLoaded jer se koristi samo jednom za inicijalno učitavanje

  return (
    <>
      <div className="xs: mb-6 flex items-center gap-3 pr-8 xs:flex-col xs:justify-start sm:justify-between">
        <h2 className="font-bold  xs:text-lg sm:text-2xl lg:text-3xl">
          Task Board - {currentProject?.name}
        </h2>
        <button
          className="flex h-10 w-36 items-center justify-center text-nowrap rounded-lg bg-[#5051F9] p-4 font-bold text-white hover:bg-[#4646f8]"
          onClick={() => setMode("projects-view")}
        >
          Change Project
        </button>
      </div>
      {currentProject != null || currentProject != undefined ? ( // Dodata provera da li je currentProject postavljen
        <div className="flex h-[100%] min-w-[full] max-w-[200%] flex-row gap-6 overflow-x-auto overflow-y-clip text-white">
          {statuses.map((status) => (
            <Column
              key={status.id}
              status={status}
              statuses={statuses}
              setStatuses={setStatuses}
              projectId={currentProject.id}
              columnTasks={
                tasks.length != 0
                  ? tasks.filter((task) => task.status.name === status.name)
                  : []
              }
              tasks={tasks}
              setTasks={setTasks}
              currentProject={currentProject}
            />
          ))}
          <EmptyColumn
            statuses={statuses}
            setStatuses={setStatuses}
            projectId={currentProject.id}
            currentProject={currentProject}
          />
        </div>
      ) : (
        <div className="flex h-[100%] items-center justify-center">
          <button
            className="h-16 rounded-lg bg-[#5051F9] p-4 font-bold text-white"
            onClick={() => setMode("projects-view")}
          >
            Select a Project
          </button>
        </div>
      )}
    </>
  );
}
