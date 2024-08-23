/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import UsersTable from "./UsersTable.jsx";
import AddPeoplePopup from "./AddPeoplePopup.jsx";

const apiURL = "http://localhost:8000";

export default function AddPeople({ currentProject, setMode }) {
  const [people, setPeople] = useState([]);
  const [addPeoplePopup, setAddPeoplePopup] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    axios.get(`${apiURL}/roles/`).then((response) => {
      console.log(response.data);
      setRoles(response.data);
    });
  }, []);

  useEffect(() => {
    // Fetch data from backend using axios
    if (!currentProject) return;
    axios
      .get(`${apiURL}/users-from-project/${currentProject.id}`)
      .then((response) => setPeople(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return currentProject != null || currentProject != undefined ? (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Add People</h2>
        <button
          className="flex h-10 w-36 items-center justify-center rounded-lg bg-[#5051F9] p-4 text-white hover:bg-[#4646f8]"
          onClick={() => setAddPeoplePopup(true)}
        >
          Add
        </button>
      </div>
      <UsersTable
        people={people}
        roles={roles}
        setPeople={setPeople}
        currentProject={currentProject}
      />
      {addPeoplePopup && (
        <AddPeoplePopup
          currentProject={currentProject}
          roles={roles}
          setAddPeoplePopup={setAddPeoplePopup}
          people={people}
          setPeople={setPeople}
          onClose={() => setAddPeoplePopup(false)}
        />
      )}
    </>
  ) : (
    <div className="flex h-[100%] items-center justify-center">
      <button
        className="h-16 rounded-lg bg-[#5051F9] p-4 text-white"
        onClick={() => setMode("projects-view")}
      >
        Select a Project
      </button>
    </div>
  );
}
