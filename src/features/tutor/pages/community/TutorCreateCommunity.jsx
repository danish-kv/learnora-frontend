import UseFetchCategory from "@/features/admin/hooks/UseFetchCategory";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import LoadingDotStream from "@/components/common/Loading";
import { validationCommunitySchema } from "@/utils/yupValidationSchema";
import { displayToastAlert } from "@/utils/displayToastAlert";
import api from "@/services/api";

const TutorCreateCommunity = () => {
  const [communityData, setCommunityData] = useState({
    name: "",
    description: "",
    banner: "",
    max_participants: "",
  });

  const navigate = useNavigate();
  const { categories } = UseFetchCategory();

  const handleOnSubmit = async (values, actions) => {
    console.log(communityData);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("banner", values.banner);
    formData.append("max_participants", values.max_participants);

    try {
      const res = await api.post("create-community/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.status === 201) {
        displayToastAlert(200, "Your Community has been created successfully");
        actions.resetForm();
        navigate(`/tutor/community/`);
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
      <h1 className="text-2xl font-semibold mb-6">Create New Community</h1>
      <Formik
        initialValues={{
          name: "",
          description: "",
          banner: "",
          max_participants: "",
        }}
        validationSchema={validationCommunitySchema}
        onSubmit={handleOnSubmit}
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className="bg-white p-6 rounded-lg border">
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Name
                </label>
                <Field
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Community Name"
                />
                <ErrorMessage
                  name="name"
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
                  placeholder="Community Description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="banner" className="block text-gray-700 mb-2">
                  Banner
                </label>
                <input
                  id="banner"
                  name="Banner"
                  type="file"
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  onChange={(e) => setFieldValue("banner", e.target.files[0])}
                />
                <ErrorMessage
                  name="banner"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="max_participants"
                  className="block text-gray-700 mb-2"
                >
                  Max Participants
                </label>
                <Field
                  name="max_participants"
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Max Paticipants"
                />
                <ErrorMessage
                  name="max_participants"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingDotStream /> : "Create Community"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TutorCreateCommunity;
