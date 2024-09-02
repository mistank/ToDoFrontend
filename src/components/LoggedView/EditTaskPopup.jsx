/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../index.css";
import close from "../../assets/icons/close.png";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext.jsx";
import UploadFileSection from "./UploadFileSection.jsx";

// bg-transparent border border-white border-solid rounded-3xl backdrop-filter backdrop-blur-md bg-opacity-10

const apiURL = "http://localhost:8000";

export default function EditTaskPopup({
  task,
  onClose,
  newTask,
  tasks,
  editTask,
  setEditTaskPopupVisible,
  setTaskOptionsVisible,
  people,
  setPeople,
  projectId,
}) {
  const [newTaskName, setNewTaskName] = useState(task.name);
  const [newTaskDescription, setNewTaskDescription] = useState(
    task.description,
  );
  const [newTaskDeadline, setNewTaskDeadline] = useState(
    new Date(task.deadline),
  );
  const [newTaskCategory, setNewTaskCategory] = useState(task.taskCategory);
  const [newTaskPriority, setNewTaskPriority] = useState(task.priority);
  const [categories, setCategories] = useState([]);
  const [isAddingNewMember, setIsAddingNewMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [usersOnProject, setUsersOnProject] = useState([]);
  const [suggestedCompletion, setSuggestedCompletion] = useState("");
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";
  const priorities = ["Low", "Medium", "High"];

  const inputRef = useRef(null);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-color",
      darkerColor,
    );
    document.documentElement.style.setProperty("--text-color", textColor);
  }, [darkerColor, textColor]);

  useEffect(() => {
    // Ako postoji potreba da se postavi fokus, možete to uraditi ovako
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchTerm]);

  useEffect(() => {
    try {
      axios
        .get(`${apiURL}/users-from-project/${projectId}/`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        .then((response) => {
          setUsersOnProject(response.data);
        });
    } catch (error) {
      console.error("Failed to fetch people:", error);
    }
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab" && suggestedCompletion) {
      e.preventDefault(); // Sprečava prelazak na sledeći element forme
      setSearchTerm(suggestedCompletion);
      setSuggestedCompletion("");
    } else if (e.key === "Enter") {
      // Ovde pozovi Axios post metodu sa newMemberName kao podatkom
      // Na primer: axios.post('/api/task/addMember', { name: newMemberName, taskId: task.id })
      try {
        const user = usersOnProject.find(
          (user) => user.firstName + " " + user.lastName === searchTerm,
        );
        axios
          .post(
            `${apiURL}/tasks/add_user/`,
            JSON.stringify({
              tid: task.id,
              uid: user.id,
            }),
            {
              headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                "Content-Type": "application/json",
              },
            },
          )
          .then((response) => {
            setPeople([...people, user]);
          });
      } catch (error) {
        console.error("Failed to add new member to task:", error);
      }
      console.log("Submitting new member:", newMemberName); // Zameni ovo pravim pozivom
      setIsAddingNewMember(false);
      setNewMemberName("");
      setSearchTerm("");
    } else if (e.key === "Escape") {
      setIsAddingNewMember(false);
    }
  };

  // Funkcije za rukovanje događajima
  const handleAddNewMember = () => {
    setIsAddingNewMember(true);
  };

  const handleNewMemberNameChange = (e) => {
    setNewMemberName(e.target.value);
  };

  function handleSave() {
    task.name = newTaskName;
    task.description = newTaskDescription;
    task.deadline = new Date(newTaskDeadline);
    task.taskCategory = newTaskCategory;
    task.priority = newTaskPriority;
    console.log("Task edited:", task);
    editTask(task);
    onClose();
  }

  async function removeFromTask(taskId, personId) {
    try {
      const response = await axios.delete(
        `${apiURL}/remove_user_from_task/?task_id=${taskId}&user_id=${personId}`,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );

      setPeople(people.filter((person) => person.id !== personId));
    } catch (error) {
      console.error("Failed to remove person from task:", error);
    }
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${apiURL}/taskCategories/`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        });
        setCategories(response.data);
        console.log("Fetched categories:", response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return (
    <div
      style={{
        zIndex: 1001,
      }}
      className="z-100 absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm backdrop-filter"
    >
      <div
        className="flex flex-row gap-5 rounded-lg p-8 text-white shadow-2xl xs:flex-col-reverse"
        style={{
          backgroundColor: lighterColor,
        }}
      >
        <div className="w-[30vw] xs:w-[60vw]">
          <h2
            style={{
              color: textColor,
            }}
            className="mb-4 text-lg font-semibold"
          >
            Edit Task
          </h2>
          <input
            value={newTaskName}
            type="text"
            placeholder="Task name"
            style={{
              backgroundColor: darkerColor,
              color: textColor,
            }}
            className="mb-4 w-full rounded-lg bg-[#131517] p-2 focus:outline-none"
            onChange={(e) => {
              setNewTaskName(e.target.value);
            }}
          />
          {tasks.some((task) => task.name === newTask) && (
            <p className="mb-4 text-[#D8000C]">Task already exists</p>
          )}
          <textarea
            value={newTaskDescription}
            placeholder="Task description"
            onChange={(e) => {
              setNewTaskDescription(e.target.value);
            }}
            style={{
              backgroundColor: darkerColor,
              color: textColor,
            }}
            className="mb-4 max-h-48 w-full rounded-lg bg-[#131517] p-2 focus:outline-none"
            rows="3" // Adjust the number of rows as needed
          />
          <Select
            value={{
              value: newTaskCategory,
              label: newTaskCategory.name,
            }}
            onChange={(selectedOption) => {
              setNewTaskCategory(selectedOption.value);
            }}
            options={categories.map((category) => ({
              value: category,
              label: category.name,
            }))}
            styles={{
              placeholder: (provided) => ({
                ...provided,
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: darkerColor,
                borderColor: "transparent",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "transparent",
                },

                marginBottom: "1rem",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? darkerColor : "transparent",
                color: textColor,
                "&:hover": {
                  backgroundColor: lighterColor,
                },
              }),
              singleValue: (provided) => ({
                ...provided,
                color: textColor,
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: darkerColor,
              }),
            }}
          />

          <DatePicker
            selected={newTaskDeadline}
            onChange={(date) => {
              setNewTaskDeadline(date.setHours(23, 59, 58, 999));
            }}
            style={{
              backgroundColor: darkerColor,
              color: textColor,
            }}
            className="custom-datepicker mb-4 w-full rounded-lg p-2 text-white focus:outline-none"
            placeholderText="Task deadline"
            calendarClassName=""
            minDate={new Date()}
            dateFormat="dd.MM.yyyy." //ovo mozda pokvari ubacivanje datuma u bazu pa obrati paznju
          />
          <Select
            value={
              newTaskPriority && {
                value: newTaskPriority,
                label: newTaskPriority,
              }
            }
            onChange={(selectedOption) =>
              setNewTaskPriority(selectedOption.value)
            }
            options={priorities.map((priority) => ({
              value: priority,
              label: priority,
            }))}
            styles={{
              placeholder: (provided) => ({
                ...provided,
                color: "#9CA3AF",
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: darkerColor,
                borderColor: "transparent",
                boxShadow: "none",
                "&:hover": {
                  borderColor: "transparent",
                },
                marginBottom: "1rem",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? darkerColor : "transparent",
                color: textColor,
                "&:hover": {
                  backgroundColor: lighterColor,
                },
              }),
              singleValue: (provided) => ({
                ...provided,
                color: textColor,
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: darkerColor,
              }),
            }}
          />
          <div className="">
            <div
              style={{
                backgroundColor: darkerColor,
                color: textColor,
              }}
              className={`${darkTheme ? "scrollbar" : ""} my-4 flex h-36 flex-wrap overflow-y-scroll rounded-lg p-2`}
            >
              <div
                style={{
                  color: textColor,
                }}
                className="mr-2 h-10 rounded-lg p-2"
              >
                Assigned to:{" "}
              </div>
              {people.length > 0 &&
                people.map((person) => (
                  <div
                    key={person.id}
                    className="mb-2 mr-2 flex h-10 items-center justify-between gap-3 overflow-hidden text-nowrap rounded-lg bg-gray-400 p-2"
                  >
                    {person.firstName + " " + person.lastName}
                    <button
                      className="h-full cursor-pointer"
                      onClick={() => removeFromTask(task.id, person.id)}
                    >
                      <img src={close} className="h-[50%]" />
                    </button>
                  </div>
                ))}
              {isAddingNewMember ? (
                <div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="mb-2 mr-2 flex h-10 items-center justify-between gap-3 rounded-lg bg-gray-400 p-2 focus:outline-none"
                    placeholder="Enter new member name"
                    list="users"
                    ref={inputRef}
                  />
                  <datalist id="users">
                    {usersOnProject
                      .filter(
                        (user) => !people.some((user2) => user2.id === user.id),
                      )
                      .map((user) => (
                        <option
                          key={user.id}
                          value={user.firstName + " " + user.lastName}
                        />
                      ))}
                  </datalist>
                </div>
              ) : (
                <button
                  onClick={handleAddNewMember}
                  className="mb-2 mr-2 flex h-10 items-center justify-between gap-3 rounded-lg bg-gray-400 p-2"
                >
                  Add New
                </button>
              )}
            </div>
          </div>
          <div>
            <button
              onClick={handleSave}
              className="rounded-lg bg-[#5051F9] px-4 py-2 hover:bg-[#4646f8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="ml-4 rounded-lg bg-[#5051F9] px-4 py-2 hover:bg-[#4646f8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="w-[30vw] xs:w-[60vw]">
          <div className="h-[30vh]">
            <UploadFileSection task={task} projectId={projectId} />
          </div>
        </div>
      </div>
    </div>
  );
}
