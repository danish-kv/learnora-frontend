import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TutorSidebar from "../components/TutorSidebar";
import api from "../../../services/api";
import UseFetchCategory from "../../admin/hooks/UseFetchCategory";

const TutorCreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: "",
    rentalPrice: "",
    rentalDuration: "",
    category: "",
  });

  const navigate = useNavigate();
  const { categories } = UseFetchCategory();

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

    try {
      const res = await api.post("courses/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.status === 201) {
        await swal({
          title: "Success!",
          text: "Your course has been created successfully.",
          icon: "success",
          button: "Okay",
        });
        navigate(`/tutor/new-module/${res.data.id}`);
      }
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
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
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

export default TutorCreateCourse;
