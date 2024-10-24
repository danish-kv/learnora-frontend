import React, { useState } from "react";
import useFetchStudent from "../hooks/useFetchStudnet";
import api from "../../../services/api";
import { formatDate } from "@/utils/format";
import { Link } from "react-router-dom";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import { displayToastAlert } from "@/utils/displayToastAlert";
import TableSkeleton from "@/skeleton/TableSkeleton";

const AdminStudent = () => {
  const { students, refetch, loading } = useFetchStudent();
  const [searchQuery, setSearchQuery] = useState("");

  const handleBlock = async (id, current_status) => {
    try {
      const res = await api.patch(`user/${id}/status/`, {
        is_active: !current_status,
      });
      console.log(res);
      refetch();
      if (current_status) {
        displayToastAlert(200, "Student blocked successfully");
      } else {
        displayToastAlert(200, "Student Unblocked successfully");
      }
    } catch (error) {
      console.log(error);
      displayToastAlert(200, "Please try again later!");
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 mt-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-700 mb-2 sm:mb-0">
                Students
              </h1>
              <input
                type="text"
                placeholder="Search"
                className="border p-2 rounded w-full sm:w-auto"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Breadcrumbs */}
            <nav className="flex mb-8" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link
                    to="/admin"
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600"
                  >
                    <HomeIcon className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </li>

                <li aria-current="page">
                  <div className="flex items-center">
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                    <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                      Student
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "No",
                      "Username",
                      "First Name",
                      "Last Name",
                      "Email",
                      "Created At",
                      "Last Login",
                      "Actions",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {student.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.first_name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.last_name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.date_joined
                          ? formatDate(
                              new Date(student.date_joined),
                              "dd, mmmm, yyyy"
                            )
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.last_login
                          ? formatDate(
                              new Date(student.last_login),
                              "dd, mmmm, yyyy"
                            )
                          : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() =>
                            handleBlock(student.id, student.is_active)
                          }
                          className={`${
                            student.is_active
                              ? "bg-red-500 hover:bg-red-700"
                              : "bg-green-500 hover:bg-green-700"
                          } text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out`}
                        >
                          {student.is_active ? "Block" : "Unblock"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default AdminStudent;
