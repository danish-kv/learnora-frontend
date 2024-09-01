import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../../services/api";
import UseFetchCategory from "../hooks/UseFetchCategory";
import { displayToastAlert } from "../../../utils/displayToastAlert";

const AdminCategory = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const { categories, error, getCategory } = UseFetchCategory();

  console.log(categories);

  const handleCreateCategory = async () => {
    try {
      const res = await api.post("category/", { name: newCategoryName });
      console.log(res);

      displayToastAlert(200, "Category created successfully!");
      setIsCreateModalOpen(false);
      setNewCategoryName("");
      getCategory();
    } catch (error) {
      console.log(error);
      console.log(error.response.data?.name);
      const message = (error.response?.data?.name).join();

      displayToastAlert(400, message || "Error creating category");
    }
  };

  const handleEditCategory = async () => {
    try {
      await api.put(`category/${editingCategoryId}/`, {
        name: editCategoryName,
      });

      toast.success("Category updated successfully!");
      setIsEditModalOpen(false);
      setEditCategoryName("");
      getCategory();
    } catch (error) {
      console.log(error);
    }
  };

  const handleBlockCategory = async (id, current_status) => {
    try {
      await api.patch(`category/${id}/`, { is_active: !current_status });
      toast.info("Category blocked!");
      getCategory();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col ml-64">
        <AdminHeader />
        <div className="p-6 flex flex-col flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-700 transition duration-200"
            >
              Create New Category
            </button>
          </div>

          {/* List of Categories */}
          <div className="flex flex-col space-y-4">
            {categories && categories.map((category) => (
              <div
                key={category.id}
                className="bg-white shadow-md rounded-md p-4 flex justify-between items-center"
              >
                <span className="text-gray-700 text-lg">{category.name}</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      handleBlockCategory(category.id, category.is_active)
                    }
                    className={`${
                      category.is_active
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    } text-white px-3 py-1 rounded transition duration-200`}
                  >
                    {category.is_active ? "Block" : "Unblock"}
                  </button>
                  <button
                    onClick={() => {
                      setEditCategoryName(category.name);
                      setEditingCategoryId(category.id);
                      setIsEditModalOpen(true);
                    }}
                    className="bg-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-300 transition duration-200"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Category Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4">Create New Category</h3>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category Name"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  onClick={handleCreateCategory}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Create
                </button>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Category Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4">Edit Category</h3>
              <input
                type="text"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                placeholder="Category Name"
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={handleEditCategory}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminCategory;