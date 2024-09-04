import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import useFetchStudnet from "../hooks/useFetchStudnet";
import api from "../../../services/api";

const AdminStudent = () => {
  const { students, refetch } = useFetchStudnet();
  const [searchQuery, setSearchQuery] = useState("");

  const handleBlock = async (id, current_status) => {
    try {
      const res = await api.patch(`user/${id}/status/`, {
        is_active: !current_status,
      });
      console.log(res);
      refetch();
      if (current_status) {
        swal("Blocked", "Student blocked successfully", "success");
      } else {
        swal("Unblocked", "Student Unlocked successfully", "success");
      }
    } catch (error) {
      console.log(error);
      swal('Failed', 'please try again later', 'error')
    }
  };

  // const filteredStudents = students.filter(student =>
  //   student.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   student.email.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 ml-64">
          <div className="container mx-auto px-6 py-8">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-700">Students</h2>
              <input
                type="text"
                placeholder="Search"
                className="border p-2 rounded"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Username
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      First Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student, index) => (
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
                        {new Date(student.date_joined).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(student.last_login).toLocaleDateString()}
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
      </div>
    </div>
  );
};

export default AdminStudent;
