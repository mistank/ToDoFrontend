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

export default function EditProjectPopup({
  project,
  onClose,
  newProject,
  projects,
  editProject,
}) {
  const [newProjectName, setNewProjectName] = useState(project.name);
  const [newProjectDescription, setNewProjectDescription] = useState(
    project.description,
  );
  const [newProjectDeadline, setNewProjectDeadline] = useState(
    new Date(project.deadline),
  );

  function handleSave() {
    if (projects.some((project) => project.name === newProject)) {
      return;
    }
    project.name = newProjectName;
    project.description = newProjectDescription;
    project.deadline = new Date(newProjectDeadline);
    project.creation_date = new Date(project.creation_date);
    console.log("Project edited:", project);
    editProject(project);
    onClose();
  }

  return (
    <div
      style={{ zIndex: 1001 }}
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm backdrop-filter"
    >
      <div className="w-[90vw] max-w-md rounded-lg bg-[#1E1F25] p-8 text-white shadow-2xl">
        <h2 className="mb-4 text-lg font-semibold">Add new Task</h2>
        <input
          value={newProjectName}
          type="text"
          placeholder="Task name"
          className="mb-4 w-full rounded-lg bg-[#131517] p-2 focus:outline-none"
          onChange={(e) => {
            setNewProjectName(e.target.value);
          }}
        />
        {projects.some((project) => project.name === newProjectName) && (
          <p className="mb-4 text-[#D8000C]">Task already exists</p>
        )}
        <textarea
          value={newProjectDescription}
          placeholder="Task description"
          onChange={(e) => {
            setNewProjectDescription(e.target.value);
          }}
          className="mb-4 max-h-48 w-full rounded-lg bg-[#131517] p-2 focus:outline-none"
          rows="3" // Adjust the number of rows as needed
        />

        <DatePicker
          selected={newProjectDeadline}
          onChange={(date) => {
            setNewProjectDeadline(date);
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
