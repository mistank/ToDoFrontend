/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../index.css";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext.jsx";

// bg-transparent border border-white border-solid rounded-3xl backdrop-filter backdrop-blur-md bg-opacity-10

const apiURL = "http://localhost:8000";

export default function CreateTaskPopup({
  onClose,
  addTask,
  setNewTask,
  newTask,
  tasks,
}) {
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState(1);
  const [categories, setCategories] = useState([]);
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--background-color",
      darkerColor,
    );
    document.documentElement.style.setProperty("--text-color", textColor);
  }, [darkerColor, textColor]);

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
      style={{ zIndex: 1001 }}
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm backdrop-filter"
    >
      <div
        style={{ backgroundColor: lighterColor, color: textColor }}
        className="w-[90vw] max-w-md rounded-lg p-8 text-white shadow-2xl"
      >
        <h2 className="mb-4 text-lg font-semibold">Add new Task</h2>
        <input
          type="text"
          placeholder="Task name"
          style={{ backgroundColor: darkerColor }}
          className="mb-4 w-full rounded-lg p-2 focus:outline-none"
          onChange={(e) => setNewTask(e.target.value)}
        />
        {tasks.some((task) => task.name === newTask) && (
          <p className="mb-4 text-[#D8000C]">Task already exists</p>
        )}
        <textarea
          placeholder="Task description"
          onChange={(e) => setNewTaskDescription(e.target.value)}
          style={{ backgroundColor: darkerColor }}
          className="mb-4 max-h-48 w-full rounded-lg p-2 focus:outline-none"
          rows="3" // Adjust the number of rows as needed
        />
        <Select
          value={categories.find(
            (category) => category.value === newTaskCategory,
          )}
          onChange={(selectedOption) =>
            setNewTaskCategory(selectedOption.value)
          }
          options={categories.map((category) => ({
            value: category,
            label: category.name,
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
        {/* <input
            type="date"
            placeholder="Task deadline"
            onChange={(e) => setNewTaskDeadline(e.target.value)}
            className="mb-4 w-full rounded-lg bg-[#131517] p-2  focus:outline-none"
          /> */}
        <DatePicker
          selected={newTaskDeadline}
          onChange={(date) => setNewTaskDeadline(date)}
          style={{ backgroundColor: darkerColor }}
          className="mb-4 w-[100%] rounded-lg  p-2 text-white focus:outline-none"
          placeholderText="Task deadline"
          calendarClassName=""
          minDate={new Date()}
        />
        <div>
          <button
            onClick={() => {
              if (tasks.some((task) => task.name === newTask)) {
                return;
              }
              console.log("Task deadline:", newTaskDeadline);
              addTask(
                newTask,
                newTaskDescription,
                newTaskDeadline,
                newTaskCategory,
              );
              setNewTask("");
              onClose();
            }}
            className="rounded-lg bg-[#5051F9] px-4 py-2 font-bold text-white hover:bg-[#4646f8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Task
          </button>
          <button
            onClick={onClose}
            className="ml-4 rounded-lg bg-[#5051F9] px-4 py-2 font-bold text-white hover:bg-[#4646f8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
