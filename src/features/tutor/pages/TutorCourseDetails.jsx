import React from "react";

const TutorCourseDetails = () => {
  return (
    <div className="container mx-auto px-5 py-8">
      <div className="mb-6">
        <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center mb-4">
          <span className="text-gray-500">Course Thumbnail</span>
        </div>
        {/* Replace the above div with this img tag when you have an actual image */}
        {/* <img 
            src="/path-to-your-thumbnail.jpg" 
            alt="Course Thumbnail" 
            className="w-full h-64 object-cover rounded-lg mb-4"
          /> */}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">
            Introduction to Web Development
          </h1>
          <button className="text-blue-600 hover:text-blue-800">Edit</button>
        </div>

        <div className="mb-4">
          <h2 className="font-semibold mb-2">Description</h2>
          <p className="text-gray-700">
            This course covers the fundamentals of web development, including
            HTML, CSS, and JavaScript. You will learn how to build responsive
            and interactive websites from scratch.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h3 className="font-semibold text-gray-600">Price</h3>
            <p>$99.99</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Rental Price</h3>
            <p>$19.99</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Rental Duration</h3>
            <p>30 days</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-600">Category</h3>
            <p>Web Development</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-600 mb-1">Status</h3>
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            Published
          </span>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Modules</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add Module
          </button>
        </div>

        {[
          { title: "HTML Basics", type: "video", duration: "45 min" },
          { title: "CSS Fundamentals", type: "video", duration: "60 min" },
          { title: "JavaScript Essentials", type: "video", duration: "90 min" },
          { title: "Responsive Design", type: "notes", duration: "30 min" },
          { title: "Web Accessibility", type: "notes", duration: "45 min" },
        ].map((module, index) => (
          <div
            key={index}
            className="flex justify-between items-center border border-gray-200 rounded-lg p-4 mb-2"
          >
            <div className="flex items-center">
              <span className="font-medium text-blue-600">{module.title}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 text-sm mr-4">
                {module.type} ({module.duration})
              </span>
              <button className="text-gray-600 hover:text-gray-800 mr-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorCourseDetails;
