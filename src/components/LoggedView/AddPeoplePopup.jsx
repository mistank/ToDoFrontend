/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";
import {
  RadioGroup,
  RadioButton,
  ReversedRadioButton,
} from "react-radio-buttons";

const apiURL = "http://localhost:8000";
export default function AddPeoplePopup({
  currentProject,
  roles,
  onClose,
  setPeople,
  people,
}) {
  const [isAddingNewMember, setIsAddingNewMember] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersNotOnProject, setUsersNotOnProject] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [notifText, setNotifText] = useState(
    "Press Enter to add user to project",
  );
  const inputRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${apiURL}/users-not-from-project/${currentProject.id}`)
      .then((response) => setUsersNotOnProject(response.data));
  }, [currentProject]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (selectedRole == null) {
        setNotifText("You must select the role before adding");
        return;
      }
      try {
        const user = usersNotOnProject.find(
          (user) => user.firstName + " " + user.lastName === searchTerm,
        );
        if (user) {
          const response = await axios.post(
            `${apiURL}/projects/add_user/`,
            JSON.stringify({
              pid: currentProject.id,
              uid: user.id,
              rid: 2,
            }),
            {
              headers: {
                Authorization: `Bearer ${getAccessToken()}`,
                "Content-Type": "application/json",
              },
            },
          );
          setPeople((prevPeople) => [
            ...prevPeople,
            {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role_name: selectedRole,
            },
          ]);
          onClose();
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Failed to add new member to project:", error);
      }
    }
  };

  return (
    <>
      <div
        style={{
          zIndex: 1001,
        }}
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm backdrop-filter"
      >
        <div className="w-[90vw] max-w-md rounded-lg bg-[#1E1F25] p-8 text-white shadow-2xl">
          <div>
            <div className="mb-10">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="mr-2 flex h-10 w-full items-center justify-between gap-3 rounded-lg bg-gray-400 p-2 focus:outline-none"
                placeholder="Enter new member name"
                list="users"
                ref={inputRef}
              />
              <datalist id="users">
                {usersNotOnProject
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
              <p
                className={`text-sm  ${notifText.startsWith("Press") ? "text-gray-600" : "text-red-500"}`}
              >
                {notifText}
              </p>
            </div>

            <div className="scrollbar mb-10 h-48 overflow-y-scroll">
              <RadioGroup onChange={handleRoleChange}>
                {roles.map((role) => (
                  <RadioButton key={role.id} value={role.name}>
                    {role.name}
                  </RadioButton>
                ))}
              </RadioGroup>
            </div>
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="ml-4 rounded-lg bg-[#5051F9] px-4 py-2 hover:bg-[#4646f8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
