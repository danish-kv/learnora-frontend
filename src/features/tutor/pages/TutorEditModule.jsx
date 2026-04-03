import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import useFetchModuleDetails from "../hooks/useFetchModuleDetails";
import LoadingDotStream from "@/components/common/Loading";

const TutorEditModule = () => {
  const [module, setModule] = useState({
    title: "",
    description: "",
    video: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const formData = new FormData();
    formData.append("title", module.title);
    formData.append("description", module.description);

    const extractFilePath = (url) => {
      const regex = /media\/(module_videos|module_notes)\/(.+)/;
      const match = url.match(regex);
      console.log("match ====", match);
      console.log("match2 ====", match[1] + "/" + match[2]);
      return match ? match[1] + "/" + match[2] : url;
    };

    if (module.video && typeof module.video === "string") {
      const videoPath = extractFilePath(module.video);
      formData.append("video", videoPath);
    } else if (module.video && typeof module.video !== "string") {
      const videoResponse = await uploadFileToS3(module.video, "video");
      formData.append("video", videoResponse.videoKey);
    }

    if (module.notes && typeof module.notes === "string") {
      const notesPath = extractFilePath(module.notes);
      formData.append("notes", notesPath);
    } else if (module.notes && typeof module.notes !== "string") {
      // If the notes is a new file, upload to S3
      const notesResponse = await uploadFileToS3(module.notes, "notes");
      formData.append("notes", notesResponse.notesKey); // Send the S3 key
    }

    try {
      const res = await api.patch(`modules/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        displayToastAlert(200, "Module has been updated successfully");
        navigate("/tutor/courses");
      }
    } catch (error) {
      console.log(error);
      displayToastAlert(400, "Error updating module. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const uploadFileToS3 = async (file, fileType) => {
    try {
      const presignedUrlResponse = await getPresignedUrl(file, fileType);
      await uploadFile(file, presignedUrlResponse.presignedUrl);
      return { videoKey: presignedUrlResponse.key };
    } catch (error) {
      console.error(error);
      throw new Error(`Error uploading ${fileType} to S3`);
    } finally {
      setLoading(false);
    }
  };

  const getPresignedUrl = async (file, fileType) => {
    try {
      const response = await api.get(
        `/get-presigned-url?filename=${file.name}&file_type=${fileType}`
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error getting presigned URL");
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (file, presignedUrl) => {
    try {
      const response = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to upload file to S3: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error uploading file to S3");
    } finally {
      setLoading(false);
    }
  };

  const handleModuleChange = (e) => {
    const { name, value, files } = e.target;
    setModule((prevModule) => ({
      ...prevModule,
      [name]: name === "video" || name === "notes" ? files[0] : value,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Module</h1>

      <form
        onSubmit={handleModuleSubmit}
        className="bg-white p-6 border rounded-lg shadow-md"
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
                {module.video && typeof module.video == "string" && (
                  <p className="mt-2 text-gray-600">
                    Current file: {module.video.split("/").pop()}
                  </p>
                )}
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
                {module.notes && typeof module.notes === "string" && (
                  <p className="mt-2 text-gray-600">
                    Current file: {module.notes.split("/").pop()}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          disabled={loading}
        >
          {loading ? <LoadingDotStream /> : "Update Module"}
        </button>
      </form>
    </div>
  );
};

export default TutorEditModule;
