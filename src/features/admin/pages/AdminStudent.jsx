import React, { useState, useEffect } from "react";
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';

import useFetchStudnet from "../hooks/useFetchStudnet";
import api from "../../../services/api";


const AdminStudent = () => {
  const { students, refetch } = useFetchStudnet();
  console.log(students);
  

  // if (error) {
  //   return <div>Error loading students: {error.message}</div>;
  // }

  const handleBlock = async(id, currect_status) => {
    console.log(`${currect_status} student with ID:`, id);

    try {
      
      const res = await api.patch(`user/${id}/status/`, { is_active: !currect_status })
      console.log(res);
      refetch()
      
    } catch (error) {
      console.log(error);
      
      
    }
  };

  return (
    <div className="h-screen bg-gray-100">
      {/* <AdminHeader /> */}
      <div className="flex h-full">
        <AdminSidebar />
        <div className="p-4 w-full">
          <div className="mb-4 flex justify-between">
            <h2 className="text-2xl font-bold mb-4">Students</h2>
            <input
              type="text"
              placeholder="Search..."
              className="border p-2 rounded"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">No</th>
                  <th className="py-2 px-4 border-b">Username</th>
                  <th className="py-2 px-4 border-b">First Name</th>
                  <th className="py-2 px-4 border-b">Last Name</th>
                  <th className="py-2 px-4 border-b">Email</th>
                  <th className="py-2 px-4 border-b">Created At</th>
                  <th className="py-2 px-4 border-b">Last Login</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b text-center">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{student.username}</td>
                    <td className="py-2 px-4 border-b">{student.first_name || 'Nill' }</td>
                    <td className="py-2 px-4 border-b">{student.last_name || 'Nill'}</td>
                    <td className="py-2 px-4 border-b">{student.email}</td>
                    <td className="py-2 px-4 border-b">{new Date(student.date_joined).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">{new Date(student.last_login).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b text-center">
                    {student.is_active ? (
                        
                      <button
                        onClick={() => handleBlock(student.id, student.is_active)}
                        className="bg-red-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-red-700 hover:shadow-lg mr-2"
                      >
                        Block
                      </button>

                    ) : (
                      <button
                        onClick={() => handleBlock(student.id, student.is_active)}
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-green-700 hover:shadow-lg"
                      >
                        Unblock
                      </button>
                    )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStudent;
