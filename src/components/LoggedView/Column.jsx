/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import TaskCard from "./TaskCard.jsx";
import { useEffect, useState } from "react";
import add_cross from "../../assets/icons/add_plus.svg";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";
import delete_column from "../../assets/icons/delete_column.svg";
import CreateTaskPopup from "./CreateTaskPopup.jsx";

const apiURL = "http://localhost:8000";

export default function Column({
  status,
  tasks,
  columnTasks,
  setTasks,
  statuses,
  setStatuses,
  projectId,
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isTasksEmpty, setIsTasksEmpty] = useState(false); // State za praćenje da li su taskovi prazni
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    status_id: status.id,
    project_id: projectId,
    deadline: "",
    taskCategory_id: 1,
  });

  async function deleteTask(taskId) {
    console.log("Deleting task with id:", taskId);
    try {
      const response = await axios.delete(`${apiURL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  async function editTask(task) {
    try {
      const response = await axios.put(
        `${apiURL}/tasks/${task.id}`,
        {
          name: task.name,
          description: task.description,
          deadline: task.deadline,
          project_id: task.project.id,
          taskCategory_id: task.taskCategory.id,
          status_id: task.status.id,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
    } catch (error) {
      console.error("Failed to edit task:", error);
    }
  }

  async function deleteColumn() {
    console.log("Deleting column with id:", status.id);
    try {
      const response = await axios.delete(
        `${apiURL}/delete_project_status/${projectId}`,
        { data: status }, // Axios DELETE zahtevi zahtevaju da se telo zahteva šalje kao `data` svojstvo
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      setStatuses(statuses.filter((s) => s.id !== status.id));
    } catch (error) {
      console.error("Failed to delete column:", error);
    }
  }

  useEffect(() => {
    if (columnTasks.length === 0) {
      setIsTasksEmpty(true);
    } else {
      setIsTasksEmpty(false);
    }
  }, [columnTasks]);

  async function updateTaskStatus(taskId, newStatus) {
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

  async function addTask(
    newTask,
    newTaskDescription,
    newTaskDeadline,
    newTaskCategory,
  ) {
    console.log("Adding task to column with id:", status.id);
    try {
      const response = await axios.post(
        `${apiURL}/tasks/`,
        {
          name: newTask,
          description: newTaskDescription,
          status_id: status.id,
          project_id: projectId,
          deadline: newTaskDeadline,
          taskCategory_id: newTaskCategory.id,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Failed to add task:", error);
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

  const handleDragLeave = () => {
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

  const showPopupForm = () => {
    setIsPopupVisible(true);
    document.body.style.overflow = "hidden"; // Sprečava skrolovanje dok je popup aktivan
  };

  const hidePopupForm = () => {
    setIsPopupVisible(false);
    document.body.style.overflow = "auto"; // Dozvoljava skrolovanje kada se popup zatvori
  };

  return (
    <div className="h-[100%] min-w-[20%] max-w-[25%] flex-1 rounded-lg">
      <div className="mb-4 flex justify-between rounded-lg bg-gray-500 p-4 align-middle">
        <h2 className="text-xl font-bold">
          {status.name} ({columnTasks.length})
        </h2>
        {isTasksEmpty ? (
          <button className="w-6" onClick={() => deleteColumn()}>
            <img src={delete_column} />
          </button>
        ) : null}
      </div>
      <div
        className="no-scrollbar flex h-[80vh] flex-col gap-4 overflow-scroll pb-32"
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {columnTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            editTask={editTask}
            tasks={tasks}
          />
        ))}
        {!isDragOver && (
          <button
            className="flex w-full items-center gap-2 rounded-lg p-2 text-[#5F6388] hover:bg-black hover:bg-opacity-10"
            onClick={() => showPopupForm()}
          >
            <img src={add_cross} className="h-5 w-5" />
            Add Task
          </button>
        )}

        {isDragOver && (
          <div className="flex h-36 w-[100%] justify-center border-4 border-dashed border-[#5F6388] align-middle">
            <img src={add_cross} alt="" />
          </div>
        )}

        {isPopupVisible && (
          <CreateTaskPopup
            newTask={newTask}
            tasks={tasks}
            addTask={addTask}
            onClose={hidePopupForm}
            setNewTask={setNewTask}
          />
        )}
      </div>
    </div>
  );
}
