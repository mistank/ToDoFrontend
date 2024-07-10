/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../index.css";

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
}) {
  const [newTaskName, setNewTaskName] = useState(task.name);
  const [newTaskDescription, setNewTaskDescription] = useState(
    task.description,
  );
  const [newTaskDeadline, setNewTaskDeadline] = useState(
    new Date(task.deadline),
  );
  const [newTaskCategory, setNewTaskCategory] = useState(task.taskCategory);
  const [categories, setCategories] = useState([]);

  function handleSave() {
    if (tasks.some((task) => task.name === newTaskName)) {
      return;
    }
    task.name = newTaskName;
    task.description = newTaskDescription;
    task.deadline = new Date(newTaskDeadline);
    task.taskCategory = newTaskCategory;
    console.log("Task edited:", task);
    editTask(task);
    onClose();
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
      className="z-100 absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm backdrop-filter"
    >
      <div className="w-[90vw] max-w-md rounded-lg bg-[#1E1F25] p-8 text-white shadow-2xl">
        <h2 className="mb-4 text-lg font-semibold">Add new Task</h2>
        <input
          value={newTaskName}
          type="text"
          placeholder="Task name"
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
              color: "#9CA3AF",
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: "#131517",
              borderColor: "transparent",
              boxShadow: "none",
              "&:hover": {
                borderColor: "transparent",
              },
              marginBottom: "1rem",
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isSelected ? "#565656" : "transparent",
              color: "#9CA3AF",
              "&:hover": {
                backgroundColor: "#333333",
              },
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#FFF",
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: "#131517",
            }),
          }}
        />

        <DatePicker
          selected={newTaskDeadline}
          onChange={(date) => {
            setNewTaskDeadline(date);
          }}
          className="mb-4 w-[100%] rounded-lg bg-[#131517] p-2 text-white focus:outline-none"
          placeholderText="Task deadline"
          calendarClassName=""
          minDate={new Date()}
        />
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
    </div>
  );
}
