import React, { useState } from "react";
import UseFetchCategory from "@/features/admin/hooks/UseFetchCategory";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";
import TableSkeleton from "@/skeleton/TableSkeleton";

const TutorCategories = () => {
  const [requestModal, setRequestModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const { categories, loading } = UseFetchCategory();

  const handleRequestedCategory = async () => {
    if (!categoryName.trim()) {
      displayToastAlert(400, "Category name cannot be empty");
      return;
    }
    try {
      const res = await api.post("requested-category/", { name: categoryName });
      console.log(res);
      displayToastAlert(200, "Category Requested successfully!");
      setRequestModal(false);
      setCategoryName("");
    } catch (error) {
      console.log("error while requeste category ===", error);
    }
  };

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Categories</h2>
            <button
              onClick={() => setRequestModal(true)}
              className="bg-black text-white px-6 py-2 rounded-lg"
            >
              Request category
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            {categories &&
              categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white border rounded-md p-4 flex justify-between items-center"
                >
                  <span className="text-gray-700 text-lg">{category.name}</span>
                </div>
              ))}
          </div>

          {requestModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-4">
                  Request New Category
                </h3>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Category Name"
                  className="w-full p-2 border border-gray-300 rounded mb-4"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="submit"
                    onClick={handleRequestedCategory}
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-200"
                  >
                    Request
                  </button>
                  <button
                    onClick={() => setRequestModal(false)}
                    className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TutorCategories;
