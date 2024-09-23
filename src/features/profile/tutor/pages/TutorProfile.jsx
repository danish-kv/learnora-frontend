import React, { useEffect, useState } from "react";
import { Briefcase, GraduationCap, Edit } from "lucide-react";
import TutorSidebar from "@/features/tutor/components/TutorSidebar";
import useFetchTutorProfile from "../hooks/useFetchTutorProfile";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";

const TutorProfile = () => {
  const ProfileSection = ({ title, children }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );

  const { profileData, getProfile } = useFetchTutorProfile();
  const navigate = useNavigate();
  const [editingSkills, setEditingSkills] = useState(false);
  const [editingEducation, setEditingEducation] = useState(false);
  const [editingExperience, setEditingExperience] = useState(false);

  const [skillInput, setSkillInput] = useState("");
  const [educationInput, setEducationInput] = useState([]);
  const [experienceInput, setExperienceInput] = useState([]);

  // Fetch profile data
  useEffect(() => {
    if (!profileData) {
      getProfile();
    }
  }, [profileData]);

  // Update education and experience when profileData changes
  useEffect(() => {
    if (profileData) {
      setEducationInput(profileData.education || []);
      setExperienceInput(profileData.experiences || []);
    }
  }, [profileData]);

  if (!profileData || Object.keys(profileData).length === 0) {
    return <div>Loading...</div>;
  }

  console.log(profileData);

  const handleEditClick = (id) => {
    navigate(`/tutor/profile/${id}`);
  };

  const handleImageEditClick = () => {
    console.log("Edit Profile Image Clicked");
  };

  const handleSkillSave = async () => {
    try {
      const res = await api.patch(`tutor/skill/${1}/`, { skills: skillInput });
      console.log(res);
      setEditingSkills(false); 
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleEducationSave = async () => {
    try {
      const res = await api.patch(`tutor/education/`, {
        education: educationInput,
      });
      console.log(res);
      setEditingEducation(false); // Stop editing mode
    } catch (error) {
      console.log(error);
    }
  };

  const handleExperienceSave = async () => {
    try {
      const res = await api.patch(`tutor/experience/`, {
        experiences: experienceInput,
      });
      console.log(res);
      setEditingExperience(false); // Stop editing mode
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="min-h-screen flex bg-white">
      <TutorSidebar />

      {/* Main Content */}
      <div className="flex-grow p-8 ml-64">
        <div className="max-w-6xl mx-auto rounded-lg p-8 relative">
          <div className="flex items-center mb-8 relative">
            <div className="relative">
              <img
                src={profileData.user?.profile}
                className="w-32 h-32 rounded-full bg-gray-100"
                alt="Tutor Avatar"
              />
              {/* Profile image edit button positioned near the image */}
              <button
                onClick={handleImageEditClick}
                className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-100"
              >
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="ml-8">
              <h1 className="text-3xl font-bold">{`${
                profileData.user?.first_name || ""
              } ${profileData.user?.last_name || ""}`}</h1>
              <p className="text-xl text-gray-600">
                {profileData.headline || "No headline provided"}
              </p>
            </div>
          </div>

          {/* Edit Profile button placed in the top-right corner */}
          <button
            onClick={() => handleEditClick(profileData.id)}
            className="absolute top-4 right-4 mb-4 text-indigo-600 hover:text-indigo-800"
          >
            Edit Profile
          </button>

          <ProfileSection title="About Me">
            <p className="text-gray-700">
              {profileData.user?.bio || "No bio provided"}
            </p>
          </ProfileSection>

          <ProfileSection title="Contact Information">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Email:</p>
                <p>{profileData.user?.email || "No email provided"}</p>
              </div>
              <div>
                <p className="font-semibold">Phone:</p>
                <p>{profileData.user?.phone || "No phone provided"}</p>
              </div>
              <div>
                <p className="font-semibold">Public Name:</p>
                <p>{profileData.display_name || "No public name provided"}</p>
              </div>
              <div>
                <p className="font-semibold">Date of Birth:</p>
                <p>{profileData.user?.dob || "No date of birth provided"}</p>
              </div>
            </div>
          </ProfileSection>

          <ProfileSection title="Experience">
            {editingExperience ? (
              <>
                {experienceInput.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      value={exp.position || ""}
                      onChange={(e) => {
                        const updatedExp = [...experienceInput];
                        updatedExp[index].position = e.target.value;
                        setExperienceInput(updatedExp);
                      }}
                      className="border p-2 w-full mb-2"
                      placeholder="Position"
                    />
                    <input
                      type="text"
                      value={exp.company_name || ""}
                      onChange={(e) => {
                        const updatedExp = [...experienceInput];
                        updatedExp[index].company_name = e.target.value;
                        setExperienceInput(updatedExp);
                      }}
                      className="border p-2 w-full mb-2"
                      placeholder="Company Name"
                    />
                    <input
                      type="date"
                      value={exp.start_date || ""}
                      onChange={(e) => {
                        const updatedExp = [...experienceInput];
                        updatedExp[index].start_date = e.target.value;
                        setExperienceInput(updatedExp);
                      }}
                      className="border p-2 w-full mb-2"
                      placeholder="Start Date"
                    />
                    <input
                      type="date"
                      value={exp.end_date || ""}
                      onChange={(e) => {
                        const updatedExp = [...experienceInput];
                        updatedExp[index].end_date = e.target.value;
                        setExperienceInput(updatedExp);
                      }}
                      className="border p-2 w-full mb-2"
                      placeholder="End Date"
                    />
                  </div>
                ))}
                <button
                  onClick={handleExperienceSave}
                  className="text-green-600 hover:text-green-800 mt-4"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingExperience(false)}
                  className="text-red-600 hover:text-red-800 mt-4 ml-4"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {/* Display experience data in read-only mode */}
                {experienceInput.length > 0 ? (
                  experienceInput.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <p>
                        <strong>Position:</strong> {exp.position}
                      </p>
                      <p>
                        <strong>Company:</strong> {exp.company_name}
                      </p>
                      <p>
                        <strong>Start Date:</strong> {exp.start_date}
                      </p>
                      <p>
                        <strong>End Date:</strong> {exp.end_date}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No experience details provided.</p>
                )}
                <button
                  onClick={() => setEditingExperience(true)}
                  className="text-indigo-600 hover:text-indigo-800 mt-4"
                >
                  Edit Experience
                </button>
              </>
            )}
          </ProfileSection>

          {/* Skills Section with inline edit */}
          <ProfileSection title="Skills">
  {editingSkills ? (
    <>
      <input
        type="text"
        value={skillInput}
        onChange={(e) => setSkillInput(e.target.value)} // Update local state
        className="border p-2 w-full mb-2"
        placeholder="Enter comma-separated skills"
      />
      <button
        onClick={handleSkillSave}
        className="text-green-600 hover:text-green-800 mt-4"
      >
        Save
      </button>
      <button
        onClick={() => setEditingSkills(false)}
        className="text-red-600 hover:text-red-800 mt-4 ml-4"
      >
        Cancel
      </button>
    </>
  ) : (
    <>
      <div className="flex flex-wrap gap-2">
        {profileData.skills.length > 0 ? (
          profileData.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
            >
              {skill.skill_name}
            </span>
          ))
        ) : (
          <p>No skills provided.</p>
        )}
      </div>
      <button
        onClick={() => {
          // Initialize skillInput with current skills (comma-separated)
          const skills = profileData.skills.map(skill => skill.skill_name).join(', ');
          setSkillInput(skills);
          setEditingSkills(true);
        }}
        className="text-indigo-600 hover:text-indigo-800 mt-4"
      >
        Edit Skills
      </button>
    </>
  )}
</ProfileSection>


          {/* Education Section with inline edit */}
          <ProfileSection title="Education">
            {editingEducation ? (
              <>
                {educationInput.map((edu, index) => (
                  <div key={index} className="mb-4">
                    <input
                      type="text"
                      value={edu.highest_qualification || ""}
                      onChange={(e) => {
                        const updatedEdu = [...educationInput];
                        updatedEdu[index].highest_qualification =
                          e.target.value;
                        setEducationInput(updatedEdu);
                      }}
                      className="border p-2 w-full mb-2"
                      placeholder="Qualification"
                    />
                    <input
                      type="text"
                      value={edu.name_of_institution || ""}
                      onChange={(e) => {
                        const updatedEdu = [...educationInput];
                        updatedEdu[index].name_of_institution = e.target.value;
                        setEducationInput(updatedEdu);
                      }}
                      className="border p-2 w-full mb-2"
                      placeholder="Institution"
                    />
                    <input
                      type="date"
                      value={edu.year_of_qualification || ""}
                      onChange={(e) => {
                        const updatedEdu = [...educationInput];
                        updatedEdu[index].year_of_qualification =
                          e.target.value;
                        setEducationInput(updatedEdu);
                      }}
                      className="border p-2 w-full mb-2"
                      placeholder="Year of Qualification"
                    />
                  </div>
                ))}
                <button
                  onClick={handleEducationSave}
                  className="text-green-600 hover:text-green-800 mt-4"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingEducation(false)}
                  className="text-red-600 hover:text-red-800 mt-4 ml-4"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                {/* Display education data in read-only mode */}
                {educationInput.length > 0 ? (
                  educationInput.map((edu, index) => (
                    <div key={index} className="mb-4">
                      <p>
                        <strong>Qualification:</strong>{" "}
                        {edu.highest_qualification}
                      </p>
                      <p>
                        <strong>Institution:</strong> {edu.name_of_institution}
                      </p>
                      <p>
                        <strong>Year of Qualification:</strong>{" "}
                        {edu.year_of_qualification}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No education details provided.</p>
                )}
                <button
                  onClick={() => setEditingEducation(true)}
                  className="text-indigo-600 hover:text-indigo-800 mt-4"
                >
                  Edit Education
                </button>
              </>
            )}
          </ProfileSection>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
