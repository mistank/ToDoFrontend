/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useMemo, useContext } from "react";
import { useTable } from "react-table";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";
import { ThemeContext } from "../../ThemeContext.jsx";

const apiURL = "https://localhost:8000";
export default function UsersTable({
  people,
  setPeople,
  roles,
  currentProject,
  isOwner,
  setFetchedPeople,
}) {
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [role, setRole] = useState(null);
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  const handleSave = (row) => {
    axios
      .patch(`${apiURL}/projects/update_user_role/`, {
        pid: currentProject.id,
        uid: row.original.id,
        rid: roles.find((roleItem) => roleItem.name === role).id,
      })
      .then((response) => {
        console.log(response.data);

        setFetchedPeople((prevPeople) =>
          prevPeople.map((person) =>
            person.id === row.original.id
              ? { ...person, role_name: role }
              : person,
          ),
        );
        setPeople((prevPeople) =>
          prevPeople.map((person) =>
            person.id === row.original.id
              ? { ...person, role_name: role }
              : person,
          ),
        );
      })
      .catch((error) => {
        console.error("Error updating user role:", error);
      });
    setEditingRowIndex(null);
  };

  const handleEdit = (row) => {
    console.log("Edit", row);
    setRole(row.original.role_name);
    setEditingRowIndex(row.index);
  };

  const handleRemove = async (row) => {
    console.log("Remove", row);
    console.log(
      JSON.stringify({
        pid: currentProject.id,
        uid: row.original.id,
        //nije bitno koji rid stoji, moze bilo koji, to je samo da bih ispunio schemu iz backenda
      }),
    );
    const payload = {
      pid: currentProject.id,
      uid: row.original.id,
    };
    try {
      const response = await axios.delete(`${apiURL}/projects/remove_user/`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          "Content-Type": "application/json",
        },
        data: payload,
      });
      //delete row
      setPeople((prevPeople) =>
        prevPeople.filter((person) => person.id !== row.original.id),
      );
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };

  const renderActions = (row) => {
    return editingRowIndex == row.index ? (
      <>
        <button
          className="w-20 rounded bg-[#5051F9] px-2 py-1 text-white hover:bg-[#4646f8]"
          onClick={() => handleSave(row)}
        >
          Save
        </button>
        <button
          className="w-20 rounded bg-[#5051F9] px-2 py-1 text-white hover:bg-[#4646f8]"
          onClick={() => setEditingRowIndex(null)}
        >
          Cancel
        </button>
      </>
    ) : (
      row.original.role_name === "Project Owner" || (
        <>
          <button
            className={`w-20 rounded bg-[#5051F9] px-2 py-1 text-white hover:bg-[#4646f8] ${!isOwner ? "disabled-button" : ""}`}
            onClick={() => {
              handleEdit(row);
            }}
            disabled={!isOwner}
          >
            Edit
          </button>
          <button
            className={`w-20 rounded bg-[#5051F9] px-2 py-1 text-white hover:bg-[#4646f8] ${!isOwner ? "disabled-button" : ""} `}
            onClick={() => handleRemove(row)}
            disabled={!isOwner}
          >
            Remove
          </button>
        </>
      )
    );
  };

  const renderRoleSelect = (row) => {
    if (!row.original) {
      return null;
    }
    return editingRowIndex === row.index ? (
      <select
        value={roles.find((roleItem) => roleItem.name === role).id}
        onChange={(e) =>
          setRole(e.target.options[e.target.options.selectedIndex].text)
        }
        className="w-36 rounded bg-[#5F6388] px-2 py-1 text-white"
      >
        {roles
          .filter((role) => role.name != "Project Owner")
          .map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
      </select>
    ) : (
      row.original.role_name
    );
  };

  const data = useMemo(() => people, [people]);

  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        width: 200,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        width: 200,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 200,
      },
      {
        Header: "Role",
        accessor: "role_name",
        width: 200,
        Cell: ({ row }) =>
          editingRowIndex == row.index
            ? renderRoleSelect(role)
            : row.original.role_name,
      },
      {
        Header: "Actions",
        accessor: "actions",
        width: 200,
        Cell: ({ row }) => (
          <div className="flex space-x-2">{renderActions(row)}</div>
        ),
      },
    ],
    [editingRowIndex, role],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <div
        className={`shadow-lgs flex h-[80vh] w-[100%] flex-col rounded-lg text-white`}
      >
        <div
          className={`${darkTheme ? "scrollbar" : "light-scrollbar"} h-[85%] w-[100%] overflow-y-scroll rounded-lg pt-8 text-white`}
        >
          <table
            {...getTableProps()}
            className="min-w-full rounded-lg"
            style={{ backgroundColor: lighterColor }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      key={column.id}
                      {...column.getHeaderProps()}
                      style={{ backgroundColor: darkerColor }}
                      className="sticky top-0 h-16 translate-y-[-50%] px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-500"
                    >
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row, i) => {
                prepareRow(row);
                return (
                  <>
                    <tr key={i} {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          key={cell.column.id}
                          {...cell.getCellProps()}
                          style={{ width: cell.column.width }} // Primena širine kolone
                          className="whitespace-nowrap px-6 py-4 text-sm text-gray-400"
                        >
                          {editingRowIndex === row.index &&
                          cell.column.id === "role_name"
                            ? renderRoleSelect(row)
                            : cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
