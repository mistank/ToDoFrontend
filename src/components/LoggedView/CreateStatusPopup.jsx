/* eslint-disable react/prop-types */

// bg-transparent border border-white border-solid rounded-3xl backdrop-filter backdrop-blur-md bg-opacity-10
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext.jsx";
export default function CreateStatusPopup({
  onClose,
  addColumn,
  setNewStatus,
  newStatus,
  statuses,
}) {
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

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
        className="w-[90vw] max-w-md rounded-lg p-8 text-white shadow-2xl"
      >
        <h2 className="mb-4 text-lg font-semibold">Add new Status</h2>
        <input
          type="text"
          placeholder="Status name"
          style={{ backgroundColor: darkerColor }}
          className="mb-4 w-full rounded-lg p-2  focus:outline-none"
          onChange={(e) => setNewStatus(e.target.value)}
        />
        {statuses.some((status) => status.name === newStatus) && (
          <p className="mb-4 text-[#D8000C]">Status already exists</p>
        )}
        <div>
          <button
            onClick={() => {
              if (statuses.some((status) => status.name === newStatus)) {
                return;
              }
              addColumn();
              setNewStatus("");
              onClose();
            }}
            className="rounded-lg bg-[#5051F9] px-4 py-2 font-bold text-white hover:bg-[#4646f8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Status
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
