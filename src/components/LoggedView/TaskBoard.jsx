/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import Column from "./Column";
import EmptyColumn from "./EmptyColumn";
import { getAccessToken } from "../../utils/access_token.js";

const apiURL = "http://localhost:8000";

export default function TaskBoard({ currentProject }) {
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
    currentProject && ( // Dodata provera da li je currentProject postavljen
      <div className="flex h-[100%] flex-row gap-6 text-white">
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
          />
        ))}
        <EmptyColumn
          statuses={statuses}
          setStatuses={setStatuses}
          projectId={currentProject.id}
        />
      </div>
    )
  );
}
