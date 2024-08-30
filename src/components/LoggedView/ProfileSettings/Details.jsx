/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ThemeContext } from "../../../ThemeContext.jsx";

export default function Details({
  firstName,
  lastName,
  email,
  username,
  setFirstName,
  setLastName,
  setEmail,
  setUsername,
}) {
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-300">
            First name
          </label>
          <input
            type="text"
            value={firstName}
            style={{ backgroundColor: lighterColor, color: textColor }}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-300">
            Last name
          </label>
          <input
            type="text"
            value={lastName}
            style={{ backgroundColor: lighterColor, color: textColor }}
            onChange={(e) => setLastName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-600 px-3 py-2 text-white shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-400 sm:text-sm">
              <i className="far fa-envelope"></i>
            </span>
          </div>
          <input
            type="email"
            value={email}
            style={{ backgroundColor: lighterColor, color: textColor }}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full rounded-md border border-gray-600  px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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
            value={username}
            style={{ backgroundColor: lighterColor, color: textColor }}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}
