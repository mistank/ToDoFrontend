import { useEffect, useState } from "react";
import axios from "axios";
import Column from "./Column";
import EmptyColumn from "./EmptyColumn";
import { getAccessToken } from "../../utils/access_token.js";

const apiURL = "http://localhost:8000";
const projectId = 1;

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    axios
      .get(`${apiURL}/tasks_from_project/${projectId}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      .then((response) => {
        console.log("Tasks: " + response.data);
        setTasks(response.data);
        // Izvlačenje svih različitih statusa iz taskova
        const uniqueStatuses = [
          ...new Set(response.data.map((task) => task.status.name)),
        ];
        console.log("Unique statuses: " + uniqueStatuses);
        setStatuses(uniqueStatuses);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []); // Uklonjena je zavisnost od isTasksLoaded jer se koristi samo jednom za inicijalno učitavanje

  return (
    <div className="flex h-[100%] gap-4 text-white">
      {statuses.map((status) => (
        <Column
          key={status}
          title={status}
          tasks={tasks.filter((task) => task.status.name === status)}
        />
      ))}
      <EmptyColumn />
    </div>
  );
}
