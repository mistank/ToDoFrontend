/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import TaskCard from "./TaskCard.jsx";
import { useEffect, useState, useContext } from "react";
import add_cross from "../../assets/icons/add_plus.svg";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";
import delete_column from "../../assets/icons/delete_column.svg";
import CreateTaskPopup from "./CreateTaskPopup.jsx";
import { AuthContext } from "../AuthProvider.jsx";
import arrow_left from "../../assets/icons/arrow-left.svg";
import arrow_right from "../../assets/icons/arrow-right.svg";

const apiURL = "http://localhost:8000";

export default function Column({
  toast,
  status,
  tasks,
  columnTasks,
  setTasks,
  statuses,
  setStatuses,
  projectId,
  currentProject,
}) {
  const { userInfo, setUserInfo, logout } = useContext(AuthContext);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isTasksEmpty, setIsTasksEmpty] = useState(false); // State za praćenje da li su taskovi prazni
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [people, setPeople] = useState([]);
  const isOwner = userInfo.id === currentProject.user.id;
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

    const deleteTaskPromise = () => {
      return axios.delete(`${apiURL}/tasks/${taskId}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });
    };

    toast
      .promise(deleteTaskPromise(), {
        pending: "Deleting task...",
        success: "Task deleted successfully",
        error: "Failed to delete task",
      })
      .then((response) => {
        setTasks(tasks.filter((t) => t.id !== taskId));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("You are not authorized to view this page. Please log in");
          logout();
        }
        console.error("Failed to delete task:", error);
      });
  }

  async function editTask(task) {
    const editTaskPromise = () => {
      return axios.put(
        `${apiURL}/tasks/${task.id}`,
        {
          name: task.name,
          description: task.description,
          deadline: task.deadline,
          project_id: task.project.id,
          taskCategory_id: task.taskCategory.id,
          status_id: task.status.id,
          priority: task.priority,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
    };

    toast
      .promise(editTaskPromise(), {
        pending: "Editing task...",
        success: "Task edited successfully",
        error: "Failed to edit task",
      })
      .then((response) => {
        setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("You are not authorized to view this page. Please log in");
          logout();
        }
        console.error("Failed to edit task:", error);
      });
  }

  async function deleteColumn() {
    console.log("Deleting column with id:", status.id);

    const deleteColumnPromise = () => {
      return axios.delete(
        `${apiURL}/delete_project_status/${projectId}`,
        { data: status }, // Axios DELETE zahtevi zahtevaju da se telo zahteva šalje kao `data` svojstvo
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
    };

    toast
      .promise(deleteColumnPromise(), {
        pending: "Deleting column...",
        success: "Column deleted successfully",
        error: "Failed to delete column",
      })
      .then((response) => {
        setStatuses(statuses.filter((s) => s.id !== status.id));
      })
      .catch((error) => {
        console.error("Failed to delete column:", error);
      });
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
      if (error.response && error.response.status === 401) {
        alert("You are not authorized to view this page. Please log in");
        logout();
      }
      console.error("Failed to update task status:", error);
    }
  }

  async function addTask(
    newTask,
    newTaskDescription,
    newTaskDeadline,
    newTaskCategory,
    newTaskPriority,
  ) {
    const addTaskPromise = () => {
      return axios.post(
        `${apiURL}/tasks/`,
        {
          name: newTask,
          description: newTaskDescription,
          status_id: status.id,
          project_id: projectId,
          deadline: newTaskDeadline,
          taskCategory_id: newTaskCategory.id,
          priority: newTaskPriority,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );
    };

    toast
      .promise(addTaskPromise(), {
        pending: "Adding task...",
        success: "Task added successfully!",
        error: "Failed to add task",
      })
      .then((response) => {
        setTasks([...tasks, response.data]);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          alert("You are not authorized to view this page. Please log in");
          logout();
        }
        console.error("Failed to add task:", error);
      });
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
    console.log("Project ID:", projectId);
    setIsPopupVisible(true);
    document.body.style.overflow = "hidden"; // Sprečava skrolovanje dok je popup aktivan
  };

  const hidePopupForm = () => {
    setIsPopupVisible(false);
    document.body.style.overflow = "auto"; // Dozvoljava skrolovanje kada se popup zatvori
  };

  const moveColumnLeft = () => {
    const index = statuses.indexOf(status);
    if (index > 0) {
      const newStatuses = [...statuses];
      [newStatuses[index - 1], newStatuses[index]] = [
        newStatuses[index],
        newStatuses[index - 1],
      ];
      setStatuses(newStatuses);
    }
  };

  const moveColumnRight = () => {
    const index = statuses.indexOf(status);
    if (index < statuses.length - 1) {
      const newStatuses = [...statuses];
      [newStatuses[index + 1], newStatuses[index]] = [
        newStatuses[index],
        newStatuses[index + 1],
      ];
      setStatuses(newStatuses);
    }
  };

  return (
    <div
      style={{
        flex: "0 0 auto",
      }}
      className="h-[100%] min-w-[20vw] flex-1 overflow-x-visible rounded-lg"
    >
      <div className="group mb-4 flex min-w-full justify-between rounded-lg bg-gray-500 p-4 align-middle">
        <h2 className="text-xl font-bold text-white">
          {status.name} ({columnTasks.length})
        </h2>
        <div className="flex items-center gap-5 ">
          <div className="flex items-center gap-5 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100">
            <button onClick={moveColumnLeft}>
              <img src={arrow_left} className="h-5 w-5" />
            </button>
            <button onClick={moveColumnRight}>
              <img src={arrow_right} className="h-5 w-5" />
            </button>
          </div>

          {isTasksEmpty ? (
            <button
              className={`w-6 ${isOwner ? "" : "hidden"}`}
              onClick={() => deleteColumn()}
            >
              <img src={delete_column} />
            </button>
          ) : null}
        </div>
      </div>
      <div
        className="no-scrollbar flex h-[80vh] flex-col gap-4 overflow-x-hidden overflow-y-scroll pb-48"
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
            setTasks={setTasks}
            projectId={projectId}
            currentProject={currentProject}
          />
        ))}
        {!isDragOver && (
          <button
            className={`flex w-full items-center gap-2 rounded-lg p-2 text-[#5F6388] hover:bg-black hover:bg-opacity-10 ${isOwner ? "" : "hidden"}`}
            onClick={() => showPopupForm()}
            disabled={!isOwner}
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
      </div>
      {isPopupVisible && (
        <CreateTaskPopup
          onClose={hidePopupForm}
          addTask={addTask}
          setNewTask={setNewTask}
          newTask={newTask}
          tasks={tasks}
        />
      )}
    </div>
  );
}
