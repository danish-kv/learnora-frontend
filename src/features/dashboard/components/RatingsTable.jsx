import React from "react";

const RatingsTable = ({ ratingsData }) => {
  if (!ratingsData) {
    return null;
  }
  const dummyData = [
    { courseName: "React for Beginners", rating: 4.5, studentName: "Alice" },
    { courseName: "Advanced Django", rating: 4.0, studentName: "Bob" },
    {
      courseName: "Data Science Bootcamp",
      rating: 5.0,
      studentName: "Charlie",
    },
    { courseName: "Machine Learning 101", rating: 3.8, studentName: "Diana" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Course Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rating
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Student Name
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ratingsData.map((rating, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {rating?.course?.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {rating?.rating}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {rating?.user?.username}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RatingsTable;
