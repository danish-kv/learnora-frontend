import React from "react";
import api from "../../../services/api";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import UseFetchRequestedCategory from "../hooks/UseFetchRequestedCategory";
import { Link } from "react-router-dom";
import { ChevronRightIcon, HomeIcon } from "lucide-react";

const AdminRequestedCategory = () => {
  const { category, getRequestedCategory } = UseFetchRequestedCategory();

  const handleStatus = async (id, newStatus) => {
    if (newStatus === "Approved") {
      try {
        const res = await api.patch(`requested-category/${id}/`, {
          status: "Approved",
        });
        console.log(res);

        displayToastAlert(200, "Category Approved!");
        getRequestedCategory();
      } catch (error) {
        displayToastAlert(200, "Failed to Approve Category, Please try later!");
        console.log(error);
      }
    } else {
      try {
        const res = await api.delete(`requested-category/${id}/`);
        console.log(res);

        displayToastAlert(200, "Category Declined!");
        getRequestedCategory();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6 mt-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Requested Categories
          </h2>
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
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                <Link
                  to="/admin/category"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600 md:ml-2"
                >
                  Category
                </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                  Requested Categories
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
                  <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {category.length > 0 ? (
                  category.map((category, index) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-sm text-gray-900">{index + 1}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-sm text-gray-900">{category.name}</p>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-right">
                        <button
                          onClick={() => handleStatus(category.id, "Approved")}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded mr-2 transition duration-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatus(category.id, "Decline")}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition duration-200"
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-3 text-center text-gray-500"
                    >
                      There are no requested categories
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminRequestedCategory;
