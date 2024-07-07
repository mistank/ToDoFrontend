/* eslint-disable react/prop-types */
import TaskCard from "./TaskCard.jsx";
import { useState } from "react";
import add_cross from "../../assets/icons/add_plus.svg";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";

const apiURL = "http://localhost:8000";

export default function Column({ status, tasks, setTasks }) {
  const [isDragOver, setIsDragOver] = useState(false);

  async function updateTaskStatus(taskId, newStatus) {
    console.log("Updating task status to:", newStatus);
    try {
      const response = await axios.patch(
        `${apiURL}/change_task_status/${taskId}`,
        newStatus,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Failed to update task status:", error);
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault(); // Ovo omogućava da se ispusti
    setIsDragOver(true);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    setIsDragOver(false);
  };

  const handleDrop = async (e) => {
    const taskStr = e.dataTransfer.getData("task");
    const task = JSON.parse(taskStr);
    task.status = status; // Odmah ažuriramo status zadatka u UI

    // Ažuriramo UI pre nego što API poziv završi
    setTasks((prevTasks) => {
      return [...prevTasks.filter((t) => t.id !== task.id), task];
    });

    // Paralelno šaljemo zahtev za ažuriranje statusa zadatka na serveru
    updateTaskStatus(task.id, status).catch((error) => {
      console.error("Failed to update task status:", error);
      // Ovde možemo dodati logiku za vraćanje promene ako API poziv ne uspe
    });

    setIsDragOver(false); // Resetujemo stanje kada se zadatak ispusti
  };

  return (
    <div className="h-[100%] min-w-[20%] max-w-[25%] flex-1 rounded-lg">
      <h2 className="mb-4 text-xl font-bold">
        {status.name} ({tasks.length})
      </h2>
      <div
        className="no-scrollbar flex h-[80vh] flex-col gap-4 overflow-scroll pb-32"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {isDragOver && (
          <div className="flex h-36 w-[100%] justify-center border-4 border-dashed border-[#5F6388] align-middle">
            <img src={add_cross} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
