import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TutorSidebar from "../components/TutorSidebar";
import api from "../../../services/api";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import useFetchModuleDetails from "../hooks/useFetchModuleDetails";

const TutorEditModule = () => {
  const [module, setModule] = useState({
    title: "",
    description: "",
    video: "",
    notes: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const { moduleDetails, error } = useFetchModuleDetails(id);
  console.log(moduleDetails);

  useEffect(() => {
    if (moduleDetails) {
      setModule(moduleDetails);
    }
  }, [moduleDetails]);

  const handleModuleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", module.title);
    formData.append("description", module.description);

    if (module.video) {
      formData.append("video", module.video);
    }
    if (module.notes) {
      formData.append("notes", module.notes);
    }

    try {
      const res = await api.patch(`modules/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        swal({
          title: "Updated!",
          text: "Module has been updated successfully.",
          icon: "success",
          button: "Okay",
        });
        navigate("/tutor/courses");
      }
    } catch (error) {
      console.log(error);
      displayToastAlert(400, "server error");
    }
  };

  const handleModuleChange = (e) => {
    const { name, value, files } = e.target;
    setModule(prevModule => ({
      ...prevModule,
      [name]: name === "video" || name === "notes" ? files[0] : value
    }));
  };

  return (
    <div className="h-screen flex">
      <TutorSidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-6">Edit Module</h1>

        <form
          onSubmit={handleModuleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Module Details</h2>
            <div className="relative mb-4 p-4 border rounded-lg">
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="module-title"
                    className="block text-gray-700 mb-1"
                  >
                    Module Title
                  </label>
                  <input
                    type="text"
                    id="module-title"
                    name="title"
                    value={module.title}
                    onChange={handleModuleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Module Title"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="module-description"
                    className="block text-gray-700 mb-1"
                  >
                    Description
                  </label>
                  <textarea
                    id="module-description"
                    name="description"
                    value={module.description}
                    onChange={handleModuleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Module Description"
                  />
                </div>
              </div>

              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <label
                    htmlFor="module-video"
                    className="block text-gray-700 mb-1"
                  >
                    Video URL
                  </label>
                  <input
                    type="file"
                    accept="video/*"
                    id="module-video"
                    name="video"
                    onChange={handleModuleChange}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    placeholder="Video URL"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor="module-notes"
                    className="block text-gray-700 mb-1"
                  >
                    Study Notes
                  </label>
                  <input
                    id="module-notes"
                    name="notes"
                    type="file"
                    onChange={handleModuleChange}
                    className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    placeholder="Study Notes"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update Module
          </button>
        </form>
      </div>
    </div>
  );
};

export default TutorEditModule;
