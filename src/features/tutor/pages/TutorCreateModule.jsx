import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TutorSidebar from "../components/TutorSidebar";
import api from "../../../services/api";
import { validateModules } from "@/utils/moduleValidation";

const TutorCreateModule = () => {
  const [modules, setModules] = useState([
    { title: "", description: "", video: "", notes: "", duration: "" },
  ]);

  const { id } = useParams();

  console.log("course id", id);
  console.log(modules);

  const navigate = useNavigate();

  const handleModuleSubmit = async (e) => {
    e.preventDefault();

    if(!validateModules(modules)) return;

    const modulesData = modules.map((module) => ({
      title: module.title,
      description: module.description,
      duration: module.duration,
    }));

    const formData = new FormData();
    formData.append("course", id);
    formData.append("modules", JSON.stringify(modulesData));

    modules.forEach((module, index) => {
      if (module.video) {
        formData.append(`video_${index}`, module.video);
      }
      if (module.notes) {
        formData.append(`notes_${index}`, module.notes);
      }
    });

    try {
      const res = await api.post("modules/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        swal({
          title: "Success!",
          text: "Modules have been added successfully.",
          icon: "success",
          button: "Okay",
        });
        navigate("/tutor/courses");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModuleChange = (index, e) => {
    const { name, value, files } = e.target;
    const newModules = [...modules];

    if (name === "video") {
      const file = files[0];
      const videoElement = document.createElement("video");
      videoElement.preload = "metadata";
      videoElement.onloadeddata = function () {
        window.URL.revokeObjectURL(videoElement.src);
        const duration = Math.round(videoElement.duration);
        newModules[index] = { ...newModules[index], duration, video: file };
        setModules(newModules);
      };
      videoElement.src = URL.createObjectURL(file);
    } else if (name === "notes") {
      newModules[index] = { ...newModules[index], [name]: files[0] };
    } else {
      newModules[index] = { ...newModules[index], [name]: value };
    }

    setModules(newModules);
  };

  const addModule = () => {
    setModules((prevState) => [
      ...prevState,
      { title: "", description: "", video: "", notes: "" },
    ]);
  };

  const removeModule = (index) => {
    setModules((prevState) => prevState.filter((_, i) => i !== index));
  };

  return (
    <div className="h-screen flex">
      <TutorSidebar />
      <div className="flex-1 ml-64 p-6 bg-gray-100">
        <h1 className="text-2xl font-semibold mb-6">Add Modules</h1>

        <form
          onSubmit={handleModuleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Modules</h2>
            {modules.map((module, index) => (
              <div key={index} className="relative mb-4 p-4 border rounded-lg">
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
                      className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
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
                  
                    />
                  </div>
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => removeModule(index)}
                    className="absolute top-2 right-2"
                  >
                    <img
                      src="/close-icon.png"
                      alt="remove"
                      className="w-6 h-6"
                    />
                  </button>
                )}
              </div>
            ))}
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
            Create Module
          </button>
        </form>
      </div>
    </div>
  );
};

export default TutorCreateModule;
