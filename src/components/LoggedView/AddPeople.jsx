/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UsersTable from "./UsersTable.jsx";
import AddPeoplePopup from "./AddPeoplePopup.jsx";
import { AuthContext } from "../AuthProvider.jsx";
import { ThemeContext } from "../../ThemeContext.jsx";
import Select from "react-select";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apiURL = "http://localhost:8000";

export default function AddPeople({ currentProject, setMode }) {
  const [people, setPeople] = useState([]);
  const [fetchedPeople, setFetchedPeople] = useState([]);
  const [addPeoplePopup, setAddPeoplePopup] = useState(false);
  const [roles, setRoles] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = useContext(AuthContext);
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  useEffect(() => {
    axios.get(`${apiURL}/roles/`).then((response) => {
      console.log(response.data);
      setRoles(response.data);
    });
  }, []);

  useEffect(() => {
    console.log("Role filter", roleFilter);
    if (roleFilter === "") {
      setPeople(fetchedPeople);
    } else {
      setPeople(
        fetchedPeople.filter((person) => person.role_name === roleFilter),
      );
    }
  }, [roleFilter]);

  useEffect(() => {
    if (!currentProject) return;
    console.log("Current project", currentProject);
    console.log("User info: ", auth.userInfo);
    fetchPeople();
  }, []);

  const fetchPeople = () => {
    axios
      .get(`${apiURL}/users-from-project/${currentProject.id}`)
      .then((response) => {
        setLoading(false);
        setFetchedPeople(response.data);
        setPeople(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const isOwner = auth.userInfo.id === currentProject?.user.id;

  const handleSearch = (searchTerm) => {
    if (searchTerm === "") {
      fetchPeople();
      return;
    }
    setPeople(
      fetchedPeople.filter(
        (person) =>
          person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.email.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );
  };

  const handleSelectChange = (selectedOption, { action }) => {
    if (
      action === "clear" ||
      action === "remove-value" ||
      action === "deselect-option"
    ) {
      setRoleFilter("");
    } else if (action === "select-option") {
      setRoleFilter(selectedOption.value);
    }
  };

  return currentProject != null || currentProject != undefined ? (
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
      <div className="mb-6 flex items-center justify-between pr-8">
        <h2 className="text-3xl font-bold">Add People</h2>
        <div className="flex gap-10">
          <input
            style={{
              backgroundColor: darkerColor,
              color: textColor,
            }}
            className="h-10 w-64 rounded-lg p-4 focus:outline-none"
            placeholder="Search by name, email.."
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Select
            onChange={handleSelectChange}
            escapeClearsValue={true}
            clearValue=""
            isClearable={true}
            defaultValue={roles.find((role) => role.value === roleFilter)}
            options={roles.map((role) => ({
              value: role.name,
              label: role.name,
            }))}
            className="basic-single w-64 focus:outline-none"
            classNamePrefix={"select"}
            styles={{
              focus: {
                outline: "none",
              },
              placeholder: (provided) => ({
                ...provided,
                color: textColor,
              }),
              control: (provided) => ({
                ...provided,
                backgroundColor: darkerColor,
                borderColor: darkerColor,
                boxShadow: "none",
                "&:hover": {
                  borderColor: darkerColor,
                },
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
                color: textColor,
              }),
            }}
          />
          <button
            className={`flex h-10 w-36 items-center justify-center rounded-lg bg-[#5051F9] p-4 text-white hover:bg-[#4646f8] ${!isOwner ? "disabled-button" : ""}`}
            onClick={() => setAddPeoplePopup(true)}
            disabled={!isOwner}
          >
            Add
          </button>
        </div>
      </div>
      <UsersTable
        people={people}
        roles={roles}
        setPeople={setPeople}
        currentProject={currentProject}
        isOwner={isOwner}
        setFetchedPeople={setFetchedPeople}
        toast={toast}
      />
      {addPeoplePopup && (
        <AddPeoplePopup
          currentProject={currentProject}
          roles={roles}
          setAddPeoplePopup={setAddPeoplePopup}
          people={people}
          setPeople={setPeople}
          onClose={() => setAddPeoplePopup(false)}
          toast={toast}
        />
      )}
    </>
  ) : (
    <div className="flex h-[100%] items-center justify-center">
      <button
        className="h-16 rounded-lg bg-[#5051F9] p-4 font-bold text-white"
        onClick={() => setMode("projects-view")}
      >
        Select a Project
      </button>
    </div>
  );
}
