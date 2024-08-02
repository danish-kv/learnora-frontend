import React from 'react'
import AdminSidebar from '../components/AdminSidebar'

const AdminStudent = () => {
  return (
    <div className="h-screen bg-gray-100">
      {/* <AdminHeader /> */}
      <div className="flex h-full">
        <AdminSidebar />
        <h2>Admin students</h2>
      </div>
    </div>
  )
}

export default AdminStudent