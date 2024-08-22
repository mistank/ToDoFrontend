/* eslint-disable react/prop-types */
import React from "react";
import { useTable } from "react-table";

export default function UsersTable({ people }) {
  const data = React.useMemo(() => people, [people]);

  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
        width: 100,
      },
      {
        Header: "Last Name",
        accessor: "lastName",
        width: 100,
      },
      {
        Header: "Email",
        accessor: "email",
        width: 100,
      },
      {
        Header: "Role",
        accessor: "role_name",
        width: 100,
      },
      {
        Header: "Actions",
        accessor: "actions",
        width: 150,
        Cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleEdit(row.original)}
              className="w-20 rounded bg-[#5051F9] px-2 py-1 text-white hover:bg-[#4646f8]"
            >
              Edit
            </button>
            <button
              onClick={() => handleRemove(row.original)}
              className="w-20 rounded bg-[#5051F9] px-2 py-1 text-white hover:bg-[#4646f8]"
            >
              Remove
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      <div className="shadow-lgs mt-5 h-[80vh] w-[100%] rounded-lg bg-[#1E1F25] p-8 text-white">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-[#5F6388]"
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps()}
                    className=" px-6 py-3 text-left text-sm font-medium uppercase tracking-wider text-gray-500"
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
    </>
  );
}
