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
      .get(`${apiURL}/statuses_from_project/${projectId}`, {
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
  }, []); // Uklonjena je zavisnost od isStatusesLoaded jer se koristi samo jednom za inicijalno učitavanje

  useEffect(() => {
    axios
      .get(`${apiURL}/tasks_from_project/${projectId}`, {
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
  }, []); // Uklonjena je zavisnost od isTasksLoaded jer se koristi samo jednom za inicijalno učitavanje

  return (
    <div className="flex h-[100%] flex-row gap-4 p-8 text-white">
      {statuses.map((status) => (
        <Column
          key={status.id}
          status={status}
          tasks={
            tasks.length != 0
              ? tasks.filter((task) => task.status.name === status.name)
              : []
          }
          setTasks={setTasks}
        />
      ))}
      <EmptyColumn />
    </div>
  );
}
