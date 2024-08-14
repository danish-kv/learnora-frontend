import React, { useState, useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import TutorCard from "../components/TutorCard";
import { useNavigate } from "react-router-dom";
import { fetchTutors } from "../services/adminService";
// import { fetchTutors } from "../services/adminService";

const AdminTutor = () => {
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const navigate = useNavigate();

  // const fetchedTutors = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     status: "Active",
  //     email: "john.doe@example.com",
  //     role: "Tutor",
  //     qualification: "Bachelor's",
  //     courses: 12,
  //     students: 45,
  //     registered: "2023-04-15",
  //     profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
  //     verified: true,
  //     blocked: false,
  //   },
  //   // Additional tutor data here
  // ];

  useEffect(() => {
    const loadTutors = async () => {
      const fetchedTutors = await fetchTutors();
      console.log('tutorer ks ====',fetchTutors);
      
      setTutors(fetchedTutors);
    };
    loadTutors();
  }, []);

  console.log(tutors);
  

  const handleStatusChange = (id, newStatus) => {
    
  };

  const handleBlockToggle = (id) => {
    
  };

  const handleCardClick = (tutorId) => {
    navigate(`/admin/tutor/${tutorId}`);
  };



  return (
    <div className="flex h-screen bg-gray-800">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <h3 className="text-gray-700 text-3xl font-medium">Tutors</h3>
            
            {/* Search and Filter Section */}
            <div className="mt-4 flex justify-between">
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-1/3"
              />
              <div className="flex gap-4">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Blocked">Blocked</option>
                </select>
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="border border-gray-300 rounded-md p-2"
                >
                  <option value="">All Roles</option>
                  <option value="Tutor">Tutor</option>
                  <option value="Admin">Admin</option>
                  <option value="Student">Student</option>
                </select>
              </div>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tutors.map((tutor) => (
                  <TutorCard
                    key={tutor.id}
                    tutor={tutor}
                    onStatusChange={handleStatusChange}
                    onBlockToggle={handleBlockToggle}
                    onClick={() => handleCardClick(tutor.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminTutor;
