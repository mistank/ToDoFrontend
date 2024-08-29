/* eslint-disable react/prop-types */
import DatePicker from "react-datepicker";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../ThemeContext.jsx";

export default function CreateProjectPopup({ onClose, addProject }) {
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectDeadline, setNewProjectDeadline] = useState(null);
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

  return (
    <div
      style={{ zIndex: 1001 }}
      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm backdrop-filter"
    >
      <div
        style={{
          backgroundColor: lighterColor,
          color: textColor,
        }}
        className="w-[90vw] max-w-md rounded-lg  p-8 shadow-2xl"
      >
        <h2 className="mb-4 text-lg font-semibold">Add new Project</h2>
        <input
          type="text"
          placeholder="Project name"
          style={{ backgroundColor: darkerColor }}
          className="mb-4 w-full rounded-lg  p-2 focus:outline-none"
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <textarea
          placeholder="Project description"
          onChange={(e) => setNewProjectDescription(e.target.value)}
          style={{ backgroundColor: darkerColor }}
          className="mb-4 max-h-48 min-h-20 w-full rounded-lg p-2 focus:outline-none"
          rows="3"
        />
        <DatePicker
          selected={newProjectDeadline}
          onChange={(date) => setNewProjectDeadline(date)}
          style={{ backgroundColor: darkerColor, color: textColor }}
          className="custom-datepicker mb-4 w-[100%] rounded-lg bg-[#131517] p-2 text-white focus:outline-none"
          placeholderText="Project deadline"
          minDate={new Date()}
        />
        <div>
          <button
            onClick={() => {
              addProject({
                name: newProjectName,
                description: newProjectDescription,
                deadline:
                  newProjectDeadline instanceof Date
                    ? newProjectDeadline.toISOString()
                    : newProjectDeadline,
              });
              setNewProjectName("");
              setNewProjectDescription("");
              setNewProjectDeadline(null);
              onClose();
            }}
            className="rounded-lg bg-[#5051F9] px-4 py-2 hover:bg-[#4646f8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Project
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
