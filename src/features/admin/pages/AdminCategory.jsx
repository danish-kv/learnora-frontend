import React, { useState } from "react";
import { Link } from "react-router-dom";
import UseFetchCategory from "../hooks/UseFetchCategory";
import api from "../../../services/api";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import { ChevronRightIcon, HomeIcon } from "lucide-react";
import TableSkeleton from "@/skeleton/TableSkeleton";

const AdminCategory = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  const { categories, getCategory, loading } = UseFetchCategory();

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      displayToastAlert(300, "Category name cannot be empty");
      return;
    }
    try {
      await api.post("category/", { name: categoryName });
      displayToastAlert(200, "Category created successfully!");
      setIsCreateModalOpen(false);
      setCategoryName("");
      getCategory();
    } catch (error) {
      const message =
        error.response?.data?.name?.join(", ") || "Error creating category";
      displayToastAlert(400, message);
    }
  };

  const handleEditCategory = async () => {
    if (!editCategoryName.trim()) {
      displayToastAlert(300, "Category name cannot be empty");
      return;
    }
    try {
      await api.put(`category/${editingCategoryId}/`, {
        name: editCategoryName,
      });
      displayToastAlert(200, "Category updated successfully!");
      setIsEditModalOpen(false);
      setEditCategoryName("");
      getCategory();
    } catch (error) {
      displayToastAlert(400, "Error updating category");
    }
  };

  const handleBlockCategory = async (id, currentStatus) => {
    try {
      const res = await api.patch(`category/${id}/`, {
        is_active: !currentStatus,
      });
      console.log(res);

      displayToastAlert(
        200,
        `Category ${currentStatus ? "blocked" : "unblocked"}!`
      );
      getCategory();
    } catch (error) {
      displayToastAlert(400, "Error updating category status");
    }
  };

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 mt-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-4 flex flex-col sm:flex-row justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-700 mb-2 sm:mb-0">
                Categories
              </h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-indigo-800 text-white py-2 px-4 rounded-md hover:bg-indigo-900 transition duration-200"
                >
                  Create Category
                </button>
                <Link
                  to="/admin/requested-category/"
                  className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition duration-200"
                >
                  Requested Categories
                </Link>
              </div>
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
                      Category
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            <div className="bg-white shadow-md border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Category Name
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {categories.length > 0 ? (
                      categories.map((category, index) => (
                        <tr key={category.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="text-sm text-gray-900">{index + 1}</p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <p className="text-sm text-gray-900">
                              {category.name}
                            </p>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                category.is_active
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {category.is_active ? "Active" : "Blocked"}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() =>
                                handleBlockCategory(
                                  category.id,
                                  category.is_active
                                )
                              }
                              className={`${
                                category.is_active
                                  ? "bg-red-600 hover:bg-red-700"
                                  : "bg-green-600 hover:bg-green-700"
                              } text-white px-3 py-1 rounded mr-2 transition duration-200`}
                            >
                              {category.is_active ? "Block" : "Unblock"}
                            </button>
                            <button
                              onClick={() => {
                                setEditCategoryName(category.name);
                                setEditingCategoryId(category.id);
                                setIsEditModalOpen(true);
                              }}
                              className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300 transition duration-200"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="px-4 py-3 text-center text-gray-500"
                        >
                          There are no categories
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Create Category Modal */}
          {isCreateModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Create New Category</h2>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Category Name"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCreateCategory}
                    className="bg-indigo-800 text-white py-2 px-4 rounded hover:bg-indigo-900 transition duration-200"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Edit Category Modal */}
          {isEditModalOpen && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
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
                    className="bg-indigo-800 text-white py-2 px-4 rounded hover:bg-indigo-900 transition duration-200"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditModalOpen(false)}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      )}
    </>
  );
};

export default AdminCategory;
