/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "../../../utils/access_token.js";

const apiUrl = "http://localhost:8000";

export default function ProfileSettings({ setMode }) {
  const [firstName, setFirstName] = useState("Killan");
  const [lastName, setLastName] = useState("James");
  const [email, setEmail] = useState("killanjames@gmail.com");
  const [username, setUsername] = useState("killanjames");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const accessToken = getAccessToken();
      try {
        const response = await axios.get(`${apiUrl}/current-user`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Postavljanje JWT tokena u zaglavlje
          },
        });
        console.log(response.data);
        setUser(response.data);
        console.log("Username" + user.firstName); // Ažuriranje stanja korisnika sa dobijenim podacima
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataAsync();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="shadow-lgs mt-5 h-[80vh] w-[100%] rounded-lg bg-[#1E1F25] p-8 text-white">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold">Settings</h2>
        <div>
          <button
            onClick={() => setMode("task-view")}
            className="mr-4 rounded bg-gray-700 px-4 py-2 font-bold text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-500">
            Save
          </button>
        </div>
      </div>
      <div className="mb-4 flex space-x-4">
        <button className="border-b-2 border-blue-600 px-4 py-2 text-white">
          My details
        </button>
        <button className="px-4 py-2 text-gray-400">Password</button>
        <button className="px-4 py-2 text-gray-400">Email</button>
      </div>
      <div className="space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-300">
              First name
            </label>
            <input
              type="text"
              value={user.firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-300">
              Last name
            </label>
            <input
              type="text"
              value={user.lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-400 sm:text-sm">
                <i className="far fa-envelope"></i>
              </span>
            </div>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Username
          </label>
          <div className="relative mt-1 rounded-md shadow-sm">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-gray-400 sm:text-sm">
                <i className="far fa-envelope"></i>
              </span>
            </div>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
