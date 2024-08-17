import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TutorSidebar from "../components/TutorSidebar";
import api from "../../../services/api";
import UseFetchCategory from "../../admin/hooks/UseFetchCategory";

const TutorNewCourse = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: "",
    rentalPrice: "",
    rentalDuration: "",
    category: "",
    modules: [{ title: "", description: "", video: "", notes: "" }],
  });

  const { categories } = UseFetchCategory();
  console.log(categories);


  const handleOnSubmit = async (e) => {
    e.preventDefault();

    console.log(courseData);
    
  
    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("description", courseData.description); 
    formData.append("thumbnail", courseData.thumbnail);
    formData.append("price", courseData.price);
    formData.append("rental_price", courseData.rentalPrice);
    formData.append("rental_duration", courseData.rentalDuration);
    formData.append("category", courseData.category);

    const modulesData = courseData.modules.map(module => ({
      title: module.title,
      description: module.description,
    }));
  
    formData.append('modules', JSON.stringify(modulesData));
  
    // Append files separately
    courseData.modules.forEach((module, index) => {
      if (module.video) {
        formData.append(`video_${index}`, module.video);
      }
      if (module.notes) {
        formData.append(`notes_${index}`, module.notes);
      }
    });
  


  
    try {
      const res = await api.post("courses/", formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }
    });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const { name, files } = event.target;
    setCourseData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
  };

  
  const handleModuleChange = (index, e) => {
    const { name, value, files } = e.target;
    const newModules = [...courseData.modules];
    
    if (name === 'video' || name === 'notes') {
      // Handle file inputs
      newModules[index] = { ...newModules[index], [name]: files[0] };
    } else {
      newModules[index] = { ...newModules[index], [name]: value };
    }
  
    setCourseData((prevState) => ({ ...prevState, modules: newModules }));
  };
  

  const addModule = () => {
    setCourseData((prevState) => ({
      ...prevState,
      modules: [
        ...prevState.modules,
        { title: "", description: "", video: "", notes: "" },
      ],
    }));
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <TutorSidebar />

      {/* Main content */}
      <div className="flex-1 ml-64 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-6">Create New Course</h1>
        <form
          onSubmit={handleOnSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          {/* Fields for course information */}
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label htmlFor="title" className="block text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={courseData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Course Title"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="category" className="block text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                id="category"
                value={courseData.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select a category</option>
                {categories &&
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label htmlFor="description" className="block text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={courseData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Course Description"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="thumbnail" className="block text-gray-700 mb-2">
                Thumbnail URL
              </label>
              <input
               type="file"
               id="thumbnail"
               name="thumbnail"
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Thumbnail"
              />
            </div>
          </div>

          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label htmlFor="price" className="block text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={courseData.price}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Price"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="rentalPrice" className="block text-gray-700 mb-2">
                Rental Price
              </label>
              <input
                type="number"
                id="rentalPrice"
                name="rentalPrice"
                value={courseData.rentalPrice}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Rental Price"
              />
            </div>
          </div>

          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <label
                htmlFor="rentalDuration"
                className="block text-gray-700 mb-2"
              >
                Rental Duration (days)
              </label>
              <input
                type="number"
                id="rentalDuration"
                name="rentalDuration"
                value={courseData.rentalDuration}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Rental Duration"
              />
            </div>
          </div>

          {/* Modules */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Modules</h2>
            {courseData.modules.map((module, index) => {
              return (
                <div key={index} className="mb-4 p-4 border rounded-lg">
                  <div className="mb-4 flex gap-4">
                    <div className="flex-1">
                      <label
                        htmlFor={`module-title-${index}`}
                        className="block text-gray-700 mb-1"
                      >
                        Module Title
                      </label>
                      <input
                        type="text"
                        id={`module-title-${index}`}
                        name="title"
                        value={module.title}
                        onChange={(e) => handleModuleChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Module Title"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor={`module-description-${index}`}
                        className="block text-gray-700 mb-1"
                      >
                        Description
                      </label>
                      <textarea
                        id={`module-description-${index}`}
                        name="description"
                        value={module.description}
                        onChange={(e) => handleModuleChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Module Description"
                      />
                    </div>
                  </div>

                  <div className="mb-4 flex gap-4">
                    <div className="flex-1">
                      <label
                        htmlFor={`module-video-${index}`}
                        className="block text-gray-700 mb-1"
                      >
                        Video URL
                      </label>
                      {/* <video /> */}
                      <input
                        type="file"
                        accept="video/*"
                        id={`module-video-${index}`}
                        name="video"
                        onChange={(e) => handleModuleChange(index, e)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Video URL"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor={`module-notes-${index}`}
                        className="block text-gray-700 mb-1"
                      >
                        Study Notes
                      </label>
                      <input
                        id={`module-notes-${index}`}
                        name="notes"
                        type="file"
                        onChange={(e) => handleModuleChange(index, e)}
                        className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        placeholder="Study Notes"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              onClick={addModule}
              className="text-blue-500 hover:underline"
            >
              Add Another Module
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default TutorNewCourse;
