/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useMemo, useContext } from "react";
import { useTable } from "react-table";
import axios from "axios";
import { getAccessToken } from "../../utils/access_token.js";
import { ThemeContext } from "../../ThemeContext.jsx";
import moment from "moment";

const apiURL = "http://localhost:8000";
export default function TasksTable({ tasks, setTasks }) {
  const { darkTheme } = useContext(ThemeContext);
  const darkerColor = darkTheme ? "#131517" : "#F3F4F8";
  const lighterColor = darkTheme ? "#1E1F25" : "#FBFAFF";
  const textColor = darkTheme ? "#FFFFFF" : "#000000";

  const renderDeadline = (deadline) => {
    const today = moment().startOf("day");
    const taskDeadline = moment(deadline).startOf("day");
    return taskDeadline.isSame(today)
      ? "Today"
      : taskDeadline.format("DD.MM.YYYY.");
  };

  const data = useMemo(() => tasks, [tasks]);

  const columns = useMemo(
    () => [
      {
        Header: "Task Name",
        accessor: "name",
        width: 200,
      },
      {
        Header: "Project Name",
        accessor: "project.name",
        width: 200,
      },
      {
        Header: "Category",
        accessor: "taskCategory.name",
        width: 200,
      },
      {
        Header: "Deadline",
        accessor: "deadline",
        width: 200,
        Cell: ({ value }) => renderDeadline(value),
      },
      {
        Header: "Status",
        accessor: "status.name",
        width: 200,
      },
      {
        Header: "Priority",
        accessor: "priority",
        width: 200,
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <div
        className={`shadow-lgs flex h-[80vh] w-[100%] flex-col rounded-lg text-white`}
      >
        <div
          className={`${darkTheme ? "scrollbar" : ""} h-[85%] w-[100%] overflow-y-scroll rounded-lg pt-8 text-white`}
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
                      className="sticky top-0 translate-y-[-50%] px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-500"
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
                          {cell.render("Cell")}
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
