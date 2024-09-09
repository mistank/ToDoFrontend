/* eslint-disable react/prop-types */
import { useEffect, useState, useContext, forwardRef } from "react";
import axios from "axios";
import Column from "./Column";
import EmptyColumn from "./EmptyColumn";
import { getAccessToken } from "../../utils/access_token.js";
import { ThemeContext } from "../../ThemeContext.jsx";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiURL = "http://localhost:8000";

export default function TaskBoard({ currentProject, setMode }) {
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

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
      {currentProject && (
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
      )}
      {currentProject != null || currentProject != undefined ? ( // Dodata provera da li je currentProject postavljen
        <div
          style={{
            backgroundColor: lighterColor,
            color: textColor,
          }}
          className={`${darkTheme ? "scrollbar" : "light-scrollbar"} flex h-[90%] min-w-[full] flex-row gap-6 overflow-y-clip overflow-x-scroll text-white`}
        >
          {statuses.map((status) => (
            <Column
              toast={toast}
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
              index={statuses.indexOf(status)}
            />
          ))}
          <EmptyColumn
            toast={toast}
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
