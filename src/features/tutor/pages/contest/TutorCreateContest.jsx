import React, { useState } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useNavigate } from "react-router-dom";
import { validationContestSchema } from "@/utils/yupValidationSchema";
import UseFetchCategory from "@/features/admin/hooks/UseFetchCategory";
import LoadingDotStream from "@/components/common/Loading";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";

const TutorCreateContest = () => {
  const [contestData, setContestData] = useState({
    name: "",
    description: "",
    start_time: "",
    end_time: "",
    time_limit: "",
    difficulty_level: "",
    category: "",
    max_points: "",
  });

  const navigate = useNavigate();
  const { categories } = UseFetchCategory();

  const handleOnSubmit = async (values, actions) => {
    console.log(contestData);

    const formData = new FormData();
    formData.append("name", values.contest_title);
    formData.append("description", values.description);
    formData.append("start_time", values.start_time);
    formData.append("end_time", values.end_time);
    formData.append("time_limit", values.time_limit);
    formData.append("difficulty_level", values.difficulty_level);
    formData.append("max_points", values.max_points);
    formData.append("category_id", values.category);

    try {
      const res = await api.post("contest/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.status === 201) {
        displayToastAlert(200, "Your contest has been created successfully")
        actions.resetForm();
        navigate(`/tutor/contest/questions/create/${res.data.id}`);
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
      <h1 className="text-2xl font-semibold mb-6">Create New Contest</h1>
      <Formik
        initialValues={{
          contest_title: "",
          description: "",
          start_time: "",
          end_time: "",
          time_limit: "",
          category: "",
          difficulty_level: "",
          max_points: "",
        }}
        validationSchema={validationContestSchema}
        onSubmit={handleOnSubmit}
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className="bg-white p-6 rounded-lg border">
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="contest_title"
                  className="block text-gray-700 mb-2"
                >
                  Title
                </label>
                <Field
                  name="contest_title"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Contest Title"
                />
                <ErrorMessage
                  name="contest_title"
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
                  placeholder="Contest Description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <label
                  htmlFor="difficulty_level"
                  className="block text-gray-700 mb-2"
                >
                  Difficulty Level
                </label>
                <Field
                  as="select"
                  name="difficulty_level"
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option hidden label="Select difficulty" />
                  <option value="easy" label="Easy" />
                  <option value="medium" label="Medium" />
                  <option value="hard" label="Hard" />
                </Field>
                <ErrorMessage
                  name="difficulty_level"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="start_time"
                  className="block text-gray-700 mb-2"
                >
                  Start Time
                </label>
                <Field
                  name="start_time"
                  type="datetime-local"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Start Time"
                />
                <ErrorMessage
                  name="start_time"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="end_time" className="block text-gray-700 mb-2">
                  End Time
                </label>
                <Field
                  name="end_time"
                  type="datetime-local"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="End Time"
                />
                <ErrorMessage
                  name="end_time"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="time_limit"
                  className="block text-gray-700 mb-2"
                >
                  Time Limit (HH:MM:SS)
                </label>
                <Field
                  name="time_limit"
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Time limit"
                />
                <ErrorMessage
                  name="time_limit"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex-1">
                <label
                  htmlFor="max_points"
                  className="block text-gray-700 mb-2"
                >
                  Max Points
                </label>
                <Field
                  name="max_points"
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Max Points"
                />
                <ErrorMessage
                  name="max_points"
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
              {isSubmitting ? <LoadingDotStream /> : "Create Contest"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TutorCreateContest;
