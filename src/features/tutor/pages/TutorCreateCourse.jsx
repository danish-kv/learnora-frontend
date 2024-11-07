import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../../services/api";
import UseFetchCategory from "../../admin/hooks/UseFetchCategory";
import { validationCourseSchema } from "@/utils/yupValidationSchema";
import { ErrorMessage, Field, Formik, Form } from "formik";
import LoadingDotStream from "@/components/common/Loading";
import { displayToastAlert } from "@/utils/displayToastAlert";

const TutorCreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    price: "",
    rentalPrice: "",
    rentalDuration: "",
    category: "",
    skill_level: "",
  });

  const navigate = useNavigate();
  const { categories } = UseFetchCategory();

  const handleOnSubmit = async (values, actions) => {
    console.log(courseData);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("thumbnail", values.thumbnail);
    formData.append("price", values.price);
    formData.append(
      "rental_price",
      values.rentalPrice ? values.rentalPrice : ""
    );
    formData.append(
      "rental_duration",
      values.rentalDuration ? values.rentalDuration : ""
    );
    formData.append("category", values.category);
    formData.append("skill_level", values.skill_level);

    try {
      const res = await api.post("courses/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.status === 201) {
        displayToastAlert(200, "Your course has been created successfully");
        actions.resetForm();
        navigate(`/tutor/new-module/${res.data.id}`);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        Object.keys(error.response.data).forEach((key) => {
          displayToastAlert(400, `${key} : ${error.response.data[key]}`);
        });
      } else {
        displayToastAlert(400, "Something went wrong");
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Create New Course</h1>
      <Formik
        initialValues={{
          title: "",
          description: "",
          price: "",
          rentalPrice: "",
          rentalDuration: "",
          category: "",
          skill_level: "",
          thumbnail: null,
        }}
        validationSchema={validationCourseSchema}
        onSubmit={handleOnSubmit}
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className="bg-white p-6 rounded-lg border shadow-md">
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label htmlFor="title" className="block text-gray-700 mb-2">
                  Title
                </label>
                <Field
                  name="title"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Course Title"
                />
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="category" className="block text-gray-700 mb-2">
                  Category
                </label>
                <Field
                  as="select"
                  name="category"
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select a category</option>
                  {categories &&
                    categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="description"
                  className="block text-gray-700 mb-2"
                >
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Course Description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="thumbnail" className="block text-gray-700 mb-2">
                  Thumbnail
                </label>
                <input
                  id="thumbnail"
                  name="thumbnail"
                  type="file"
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  onChange={(e) =>
                    setFieldValue("thumbnail", e.target.files[0])
                  }
                />
                <ErrorMessage
                  name="thumbnail"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label htmlFor="price" className="block text-gray-700 mb-2">
                  Price
                </label>
                <Field
                  name="price"
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Price"
                />
                <ErrorMessage
                  name="price"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="skill_level"
                  className="block text-gray-700 mb-2"
                >
                  Skill Level
                </label>
                <Field
                  as="select"
                  name="skill_level"
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select a level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Field>
                <ErrorMessage
                  name="skill_level"
                  component="div"
                  className="text-red-500 text-sm"
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
                <Field
                  name="rentalDuration"
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Rental Duration"
                />
                <ErrorMessage
                  name="rentalDuration"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="rentalPrice"
                  className="block text-gray-700 mb-2"
                >
                  Rental Price
                </label>
                <Field
                  name="rentalPrice"
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Rental Price"
                />
                <ErrorMessage
                  name="rentalPrice"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-700 text-white p-3 rounded-lg hover:bg-indigo-800 transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingDotStream /> : "Create Course"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TutorCreateCourse;
