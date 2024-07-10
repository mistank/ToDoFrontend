import DatePicker from "react-datepicker";
import { useState } from "react";
export default function CreateProjectPopup({ onClose, createProjecw }) {
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectDeadline, setNewProjectDeadline] = useState(null);

  return (
    <div className="z-100 absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm backdrop-filter">
      <div className="w-[90vw] max-w-md rounded-lg bg-[#1E1F25] p-8 text-white shadow-2xl">
        <h2 className="mb-4 text-lg font-semibold">Add new Project</h2>
        <input
          type="text"
          placeholder="Project name"
          className="mb-4 w-full rounded-lg bg-[#131517] p-2 focus:outline-none"
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <textarea
          placeholder="Project description"
          onChange={(e) => setNewProjectDescription(e.target.value)}
          className="mb-4 max-h-48 w-full rounded-lg bg-[#131517] p-2 focus:outline-none"
          rows="3"
        />
        <DatePicker
          selected={newProjectDeadline}
          onChange={(date) => setNewProjectDeadline(date)}
          className="mb-4 w-[100%] rounded-lg bg-[#131517] p-2 text-white focus:outline-none"
          placeholderText="Project deadline"
          minDate={new Date()}
        />
        <div>
          <button
            onClick={() => {
              addProject(
                newProjectName,
                newProjectDescription,
                newProjectDeadline,
              );
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
