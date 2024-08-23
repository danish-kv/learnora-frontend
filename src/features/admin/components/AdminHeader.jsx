import React from 'react'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-end">
        <div>
          <Link to="/profile" className="text-white mr-4 hover:text-green-200">
            Profile
          </Link>
          <Link to="/settings" className="text-white hover:text-green-200">
            Settings
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default AdminHeader