import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { validationContestSchema } from "@/utils/yupValidationSchema";
import UseFetchCategory from "@/features/admin/hooks/UseFetchCategory";
import LoadingDotStream from "@/components/common/Loading";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";
import useFetchContestDetails from "../../hooks/useFetchContestDetails";

const TutorEditContest = () => {
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
  const { id } = useParams();
  const { contestDetails } = useFetchContestDetails(id);

  useEffect(() => {
    if (contestDetails) {
      const formatDateTimeForInput = (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime()) ? date.toISOString().slice(0, 16) : "";
      };

      setContestData({
        ...contestDetails,
        start_time: formatDateTimeForInput(contestDetails.start_time),
        end_time: formatDateTimeForInput(contestDetails.end_time),
      });
    }
  }, [contestDetails]);

  const handleOnSubmit = async (values, actions) => {
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
      const res = await api.patch(`contest/${id}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.status === 200) {
        displayToastAlert(200, "Your contest has been updated successfully");
        actions.resetForm();
        navigate(`/tutor/contest/${id}`);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.data) {
        Object.entries(error.response.data).forEach(([key, value]) => {
          displayToastAlert(400, `${key}: ${value}`);
        });
      } else {
        displayToastAlert(400, "Something went wrong");
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Contest</h1>
      <Formik
        initialValues={{
          contest_title: contestData.name || "",
          description: contestData.description || "",
          start_time: contestData.start_time || "",
          end_time: contestData.end_time || "",
          time_limit: contestData.time_limit || "",
          category: contestData.category?.id || "",
          difficulty_level: contestData.difficulty_level || "",
          max_points: contestData.max_points || "",
        }}
        validationSchema={validationContestSchema}
        onSubmit={handleOnSubmit}
        enableReinitialize={true}
      >
        {({ isSubmitting }) => (
          <Form className="bg-white p-6 rounded-lg border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
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
              <div>
                <label htmlFor="category" className="block text-gray-700 mb-2">
                  Category
                </label>
                <Field
                  as="select"
                  name="category"
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select a category</option>
                  {categories?.map((category) => (
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
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
              <div>
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
                  <option value="">Select difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </Field>
                <ErrorMessage
                  name="difficulty_level"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
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
                />
                <ErrorMessage
                  name="start_time"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label htmlFor="end_time" className="block text-gray-700 mb-2">
                  End Time
                </label>
                <Field
                  name="end_time"
                  type="datetime-local"
                  className="w-full p-2 border border-gray-300 rounded"
                />
                <ErrorMessage
                  name="end_time"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
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
              <div>
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
              {isSubmitting ? <LoadingDotStream /> : "Update Contest"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TutorEditContest;
