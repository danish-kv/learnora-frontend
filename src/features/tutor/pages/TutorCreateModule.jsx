import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import { validateModules } from "@/utils/validation";
import LoadingDotStream from "@/components/common/Loading";
import { displayToastAlert } from "@/utils/displayToastAlert";

const TutorCreateModule = () => {
  const [modules, setModules] = useState([
    { title: "", description: "", video: null, notes: null, duration: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleModuleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    if (!validateModules(modules)) {
      setLoading(false);
      return;
    }

    const modulesData = await Promise.all(
      modules.map(async (module) => {
        const { videoKey, notesKey } = await uploadFilesToS3(module);
        return {
          title: module.title,
          description: module.description,
          duration: module.duration,
          video: videoKey,
          notes: notesKey,
        };
      })
    );

    const formData = new FormData();
    formData.append("course", id);
    formData.append("modules", JSON.stringify(modulesData));

    try {
      const res = await api.post("modules/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 201) {
        displayToastAlert(200, "Modules have been added successfully");
        navigate("/tutor/courses");
      }
    } catch (error) {
      console.error(error);
      displayToastAlert(400, "Error uploading modules. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadFilesToS3 = async (module) => {
    try {
      const videoResponse = await getPresignedUrl(module.video, "video");
      await uploadFileToS3(module.video, videoResponse.presignedUrl);

      let notesResponse = null;
      if (module.notes) {
        notesResponse = await getPresignedUrl(module.notes, "notes");
        await uploadFileToS3(module.notes, notesResponse.presignedUrl);
      }

      return {
        videoKey: videoResponse.key,
        notesKey: notesResponse ? notesResponse.key : null,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Error uploading files to S3");
    } finally {
      setLoading(false);
    }
  };

  const getPresignedUrl = async (file, fileType) => {
    try {
      const response = await api.get(
        `/get-presigned-url?filename=${encodeURIComponent(file.name)}&file_type=${fileType}&content_type=${encodeURIComponent(file.type)}`
      );
      return response.data;
    } catch (error) {
      console.error('Error getting presigned URL:', error);
      throw new Error('Error getting presigned URL');
    }
  };
  
  const uploadFileToS3 = async (file, presignedUrl) => {
    try {
      console.log('Starting upload to:', presignedUrl);
      console.log('File type:', file.type);
      console.log('File size:', file.size);
  
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1000);
  
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
        signal: controller.signal
      });
  
      clearTimeout(timeoutId);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Upload failed:', {
          status: response.status,
          statusText: response.statusText,
          errorText,
          headers: Object.fromEntries(response.headers.entries())
        });
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }
  
      return response;
    } catch (error) {
      console.error('Upload error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      throw error;
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-6">Add Modules</h1>
      <form
        onSubmit={handleModuleSubmit}
        className="bg-white p-6 rounded-lg border shadow-md"
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
                  <img src="/close-icon.png" alt="remove" className="w-6 h-6" />
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addModule}
            className="text-indigo-600 hover:underline"
          >
            Add Another Module
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          disabled={loading}
        >
          {loading ? <LoadingDotStream /> : "Create Modules"}
        </button>
      </form>
    </div>
  );
};

export default TutorCreateModule;
