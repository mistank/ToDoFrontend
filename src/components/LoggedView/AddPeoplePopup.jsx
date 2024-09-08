/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";
import { useContext } from "react";
import { ThemeContext } from "../../ThemeContext.jsx";
import AsyncSelect from "react-select/async";
import {
  RadioGroup,
  RadioButton,
  ReversedRadioButton,
} from "react-radio-buttons";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiURL = "http://localhost:8000";
export default function AddPeoplePopup({
  currentProject,
  roles,
  onClose,
  setPeople,
  people,
  notify,
}) {
  const [isAddingNewMember, setIsAddingNewMember] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [usersNotOnProject, setUsersNotOnProject] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [userToAdd, setUserToAdd] = useState(null);
  const [notifText, setNotifText] = useState(
    "Press Enter to add user to project",
  );
  const inputRef = useRef(null);
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  useEffect(() => {
    axios
      .get(`${apiURL}/users-not-from-project/${currentProject.id}`)
      .then((response) => setUsersNotOnProject(response.data));
  }, [currentProject]);

  const handleAdd = () => {
    if (selectedRole == null) {
      setNotifText("You must select the role before adding");
      return;
    }
    if (userToAdd) {
      axios
        .post(
          `${apiURL}/projects/add_user/`,
          JSON.stringify({
            pid: currentProject.id,
            uid: userToAdd.id,
            rid: 2,
          }),
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
              "Content-Type": "application/json",
            },
          },
        )
        .then((response) => {
          toast.success("User added to project");
          setPeople((prevPeople) => [
            ...prevPeople,
            {
              id: userToAdd.id,
              firstName: userToAdd.firstName,
              lastName: userToAdd.lastName,
              email: userToAdd.email,
              role_name: selectedRole,
            },
          ]);
          onClose();
        })
        .catch((error) => {
          toast.error(
            "Failed to add user to project. " + error.response.data.detail,
          );
        });
    } else {
      console.error("User not found");
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  const searchUsersNotFromProject = async (inputValue) => {
    try {
      const response = await axios.get(
        `${apiURL}/search-users-not-from-project/${currentProject.id}/${inputValue}`,
      );
      return response.data.map((user) => ({
        label: user.firstName + user.lastName + ` (${user.email})`,
        value: user,
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
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
        <div
          style={{
            backgroundColor: lighterColor,
            color: textColor,
          }}
          className="w-[90vw] max-w-md rounded-lg p-8 text-white shadow-2xl"
        >
          <div>
            <div className="mb-10">
              <AsyncSelect
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderStyle: "none",
                    color: textColor,
                    ":focus": {
                      borderColor: "none",
                      outline: "none",
                      color: textColor,
                    },
                    backgroundColor: darkerColor,
                  }),
                  singleValue: (baseStyles, state) => ({
                    ...baseStyles,
                    color: textColor,
                    ":focus": {
                      borderColor: "none",
                      outline: "none",
                      color: textColor,
                    },
                  }),
                  valueContainer: (baseStyles, state) => ({
                    ...baseStyles,
                    ":focus": {
                      borderColor: "none",
                      outline: "none",
                      color: textColor,
                    },
                  }),
                  input: (baseStyles, state) => ({
                    ...baseStyles,
                    color: textColor,
                  }),
                  menu: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isSelected
                      ? lighterColor
                      : darkerColor,
                    color: textColor,
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: state.isSelected
                      ? lighterColor
                      : darkerColor,
                    color: textColor,
                  }),
                }}
                cacheOptions
                loadOptions={searchUsersNotFromProject}
                onChange={(selectedOption) => {
                  setUserToAdd(selectedOption.value);
                }}
              />
              {/* <input
                type="text"
                value={searchTerm}
                style={{ backgroundColor: darkerColor }}
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
              </datalist> */}
              <p
                className={`text-sm  ${notifText.startsWith("Press") ? "text-gray-600" : "text-red-500"}`}
              >
                {notifText}
              </p>
            </div>

            <div
              className={`${darkTheme ? "scrollbar" : ""} mb-10 h-48 overflow-y-scroll`}
            >
              <RadioGroup onChange={handleRoleChange}>
                {roles
                  .filter((role) => role.name != "Project Owner")
                  .map((role) => (
                    <RadioButton key={role.id} value={role.name}>
                      {role.name}
                    </RadioButton>
                  ))}
              </RadioGroup>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAdd}
                className="rounded-lg bg-[#5051F9] px-4 py-2 font-bold text-white hover:bg-[#4646f8] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Add
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
      </div>
    </>
  );
}
