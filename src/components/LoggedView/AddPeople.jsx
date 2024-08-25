/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UsersTable from "./UsersTable.jsx";
import AddPeoplePopup from "./AddPeoplePopup.jsx";
import { AuthContext } from "../AuthProvider.jsx";

const apiURL = "http://localhost:8000";

export default function AddPeople({ currentProject, setMode }) {
  const [people, setPeople] = useState([]);
  const [addPeoplePopup, setAddPeoplePopup] = useState(false);
  const [roles, setRoles] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    axios.get(`${apiURL}/roles/`).then((response) => {
      console.log(response.data);
      setRoles(response.data);
    });
  }, []);

  useEffect(() => {
    if (!currentProject) return;
    console.log("Current project", currentProject);
    console.log("User info: ", auth.userInfo);
    axios
      .get(`${apiURL}/users-from-project/${currentProject.id}`)
      .then((response) => setPeople(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const isOwner = auth.userInfo.id === currentProject?.user.id;

  return currentProject != null || currentProject != undefined ? (
    <>
      <div className="mb-6 flex items-center justify-between pr-8">
        <h2 className="text-3xl font-bold">Add People</h2>
        <button
          className={`flex h-10 w-36 items-center justify-center rounded-lg bg-[#5051F9] p-4 text-white hover:bg-[#4646f8] ${!isOwner ? "disabled-button" : ""}`}
          onClick={() => setAddPeoplePopup(true)}
          disabled={!isOwner}
        >
          Add
        </button>
      </div>
      <UsersTable
        people={people}
        roles={roles}
        setPeople={setPeople}
        currentProject={currentProject}
        isOwner={isOwner}
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
