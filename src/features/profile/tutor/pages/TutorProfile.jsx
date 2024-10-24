import React, { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import useFetchTutorProfile from "../hooks/useFetchTutorProfile";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
import ExperienceModal from "../components/ExperienceModal";
import EducationModal from "../components/EducationModal";
import SkillsModal from "../components/SkillsModal";
import ProfileSkeleton from "@/skeleton/ProfileSkeleton";

const TutorProfile = () => {
  const ProfileSection = ({ title, children }) => (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );

  const { profileData, getProfile } = useFetchTutorProfile();
  const navigate = useNavigate();

  const [skillInput, setSkillInput] = useState([]);
  const [educationInput, setEducationInput] = useState([]);
  const [experienceInput, setExperienceInput] = useState([]);

  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [editExperience, setEditExperience] = useState({});

  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [editEducation, setEditEducation] = useState({});

  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [editSkills, setEditSkills] = useState([]);

  useEffect(() => {
    if (!profileData) {
      getProfile();
    }
  }, [profileData]);

  useEffect(() => {
    if (profileData) {
      setEducationInput(profileData.education || []);
      setExperienceInput(profileData.experiences || []);
      setSkillInput(profileData.skills || []);
    }
  }, [profileData]);

  if (!profileData || Object.keys(profileData).length === 0) {
    return <ProfileSkeleton />;
  }

  const handleEditClick = (id) => {
    navigate(`/tutor/profile/${id}`);
  };

  const handleImageEditClick = () => {
    console.log("Edit Profile Image Clicked");
  };

  const handleOpenExperienceModal = (experience) => {
    setEditExperience(experience);
    setIsExperienceModalOpen(true);
  };

  const handleCloseExperienceModal = () => {
    setIsExperienceModalOpen(false);
  };

  const handleOpenEducationModal = (education) => {
    setEditEducation(education);
    setIsEducationModalOpen(true);
  };

  const handleCloseEducationModal = () => {
    setIsEducationModalOpen(false);
  };

  const handleOpenSkillsModal = () => {
    setEditSkills(skillInput);
    setIsSkillsModalOpen(true);
  };

  const handleCloseSkillsModal = () => {
    setIsSkillsModalOpen(false);
  };

  const handleSaveExperience = async () => {
    const payload = {
      company_name: editExperience.company_name,
      position: editExperience.position,
      start_date: editExperience.start_date,
      end_date: editExperience.end_date,
    };

    console.log("payload", payload);

    try {
      const res = await api.patch(
        `/tutor/experience/${editExperience.id}/`,
        payload
      );
      console.log(res);
      setExperienceInput((prev) =>
        prev.map((exp) => (exp.id === editExperience.id ? editExperience : exp))
      );
      handleCloseExperienceModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveEducation = async () => {
    const payload = {
      name_of_institution: editEducation.name_of_institution,
      highest_qualification: editEducation.highest_qualification,
      year_of_qualification: editEducation.year_of_qualification,
    };

    console.log("payload", payload);

    try {
      const res = await api.patch(
        `/tutor/education/${editEducation.id}/`,
        payload
      );
      console.log(res);
      setEducationInput((prev) =>
        prev.map((edu) => (edu.id === editEducation.id ? editEducation : edu))
      );
      handleCloseEducationModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveSkills = async () => {
    try {
      const res = await api.patch(`/tutor/skill/${editSkills[0].id}/`, {
        skills: editSkills,
      });
      console.log(res);
      setSkillInput(editSkills);
      handleCloseSkillsModal();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(editEducation);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white p-8 relative">
        <div className="flex items-center mb-8 relative">
          <div className="relative">
            <img
              src={profileData.user?.profile}
              className="w-32 h-32 rounded-full bg-gray-100"
              alt="Tutor Avatar"
            />
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
          {experienceInput.map((exp) => (
            <div
              key={exp.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p>
                  {exp.position} at {exp.company_name}
                </p>
                <p>
                  {exp.start_date} - {exp.end_date}
                </p>
              </div>
              <button
                onClick={() => {
                  handleOpenExperienceModal(exp);
                }}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Edit
              </button>
            </div>
          ))}
        </ProfileSection>

        <ProfileSection title="Skills">
          {skillInput.map((skill) => (
            <div
              key={skill.id}
              className="flex justify-between items-center border-b py-2"
            >
              <span>{skill.skill_name}</span>
              <button
                onClick={() => handleOpenSkillsModal(skill)}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Edit
              </button>
            </div>
          ))}
        </ProfileSection>

        <ProfileSection title="Education">
          {educationInput.map((edu) => (
            <div
              key={edu.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p>
                  {edu.highest_qualification} from {edu.name_of_institution}
                </p>
                <p>Year: {edu.year_of_qualification}</p>
              </div>
              <button
                onClick={() => {
                  handleOpenEducationModal(edu);
                }}
                className="text-indigo-600 hover:text-indigo-800"
              >
                Edit
              </button>
            </div>
          ))}
        </ProfileSection>

        {/* Modals */}
        <ExperienceModal
          isOpen={isExperienceModalOpen}
          onClose={handleCloseExperienceModal}
          editExperience={editExperience}
          onInputChange={(e) =>
            setEditExperience({
              ...editExperience,
              [e.target.name]: e.target.value,
            })
          }
          onSave={handleSaveExperience}
        />

        <EducationModal
          isOpen={isEducationModalOpen}
          onClose={handleCloseEducationModal}
          editEducation={editEducation}
          onInputChange={(e) =>
            setEditEducation({
              ...editEducation,
              [e.target.name]: e.target.value,
            })
          }
          onSave={handleSaveEducation}
        />

        <SkillsModal
          isOpen={isSkillsModalOpen}
          onClose={handleCloseSkillsModal}
          editSkills={editSkills}
          onInputChange={(index, value) =>
            setEditSkills((prevSkills) =>
              prevSkills.map((skill, i) =>
                i === index ? { ...skill, skill_name: value } : skill
              )
            )
          }
          onSave={handleSaveSkills}
        />
      </div>
    </div>
  );
};

export default TutorProfile;
