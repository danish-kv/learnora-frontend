import React, { useEffect, useState } from "react";
import Header from "../../../components/layout/Header";
import api from "../../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import { validateTutorApplication } from "../../../utils/validation";
import { displayToastAlert } from "../../../utils/displayToastAlert";
import { useDispatch, useSelector } from "react-redux";
import {
  tutorApplication,
  tutorApplicationDone,
} from "../../../redux/slices/authSlice";

const TutorApplication = () => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tutorApplicationAccess } = useSelector((state) => state.auth);
  const location = useLocation();
  const { email } = location.state || {};

  useEffect(() => {
    if (!tutorApplicationAccess) {
      navigate("/register");
    }
  }, [tutorApplicationAccess, navigate]);

  const [formData, setFormData] = useState({
    profilePhoto: null,
    firstName: "",
    lastName: "",
    email: email,
    public_name: "",
    phone: "",
    headline: "",
    bio: "",
    dateOfBirth: "",
    experiences: [{ workplace: "", position: "", startDate: "", endDate: "" }],
    education: [{ highestQualification: "", institute: "", year: "" }],
    skills: "",
    cv: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors } = validateTutorApplication(formData);
    console.log(formData, isValid, errors);

    if (isValid) {
      const newData = new FormData();

      newData.append("first_name", formData.firstName);
      newData.append("last_name", formData.lastName);
      newData.append("email", formData.email);
      newData.append("display_name", formData.public_name);
      newData.append("phone", formData.phone);
      newData.append("headline", formData.headline);
      newData.append("bio", formData.bio);
      newData.append("dob", formData.dateOfBirth);
      newData.append("cv", formData.cv);
      newData.append("profile", formData.profilePhoto);
      newData.append("skills", formData.skills.split(","));

      newData.append("education", JSON.stringify(formData.education));
      newData.append("experiences", JSON.stringify(formData.experiences));

      try {
        const res = await api.post("tutor/", newData);
        if (res.status === 201) {
          displayToastAlert(200, "Account Created Successfully");
          dispatch(tutorApplication(false));
          dispatch(tutorApplicationDone(true));
          navigate("/tutor/application/done");
        }
      } catch (error) {
        console.error("Error creating account", error);
        displayToastAlert(
          error.response?.status || 500,
          "Failed to create account"
        );
      }
    } else {
      setErrors(errors);
      displayToastAlert(400, "Please complete your application");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleArrayInputChange = (index, field, subfield, value) => {
    const newArray = [...formData[field]];
    newArray[index][subfield] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayField = (field) => {
    if (field === "experiences") {
      setFormData({
        ...formData,
        experiences: [
          ...formData.experiences,
          { workplace: "", position: "", startDate: "", endDate: "" },
        ],
      });
    } else if (field === "education") {
      setFormData({
        ...formData,
        education: [
          ...formData.education,
          { highestQualification: "", institute: "", year: "" },
        ],
      });
    }
  };

  const removeArrayField = (index, field) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const validateStep = (currentStep) => {
    const { errors } = validateTutorApplication(formData);
    setErrors(errors);

    switch (currentStep) {
      case 1:
        return (
          !errors.firstName &&
          !errors.lastName &&
          !errors.public_name &&
          !errors.phone &&
          !errors.dateOfBirth &&
          !errors.profilePhoto
        );
      case 2:
        return !errors.headline && !errors.bio && !errors.skills && !errors.cv;
      case 3:
        return !errors.experiences && !errors.education;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-900">
                {" "}
                Photo
              </label>
              <div className="flex items-center space-x-4">
                <span className="h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={
                      formData.profilePhoto &&
                      URL.createObjectURL(formData.profilePhoto)
                    }
                    // className="w-20 h-20 rounded-full "
                    className="w-full"
                  />
                </span>
                <input
                  type="file"
                  name="profilePhoto"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
              {errors.profilePhoto && (
                <p className="text-red-500 text-sm">{errors.profilePhoto}</p>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Public Name
                  </label>
                  <input
                    type="text"
                    name="public_name"
                    value={formData.public_name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${
                      errors.public_name ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.public_name && (
                    <p className="text-red-500 text-sm">{errors.public_name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    disabled
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${
                      errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>
                  )}
                </div>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Headline
                </label>
                <input
                  type="text"
                  name="headline"
                  value={formData.headline}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.headline ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.headline && (
                  <p className="text-red-500 text-sm">{errors.headline}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full px-3 py-2 border ${
                    errors.bio ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                ></textarea>
                {errors.bio && (
                  <p className="text-red-500 text-sm">{errors.bio}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.skills ? "border-red-500" : "border-gray-300"
                  } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                />
                {errors.skills && (
                  <p className="text-red-500 text-sm">{errors.skills}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload CV
                </label>
                <input
                  type="file"
                  name="cv"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {errors.cv && (
                  <p className="text-red-500 text-sm">{errors.cv}</p>
                )}
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <div className="space-y-6">
              <div>
                <>
                  <h4 className="text-lg font-medium mb-2">Experience</h4>
                  {formData.experiences.map((exp, index) => (
                    <div
                      key={index}
                      className="mb-4 p-4 border rounded-md relative"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Workplace
                          </label>
                          <input
                            type="text"
                            value={exp.workplace}
                            onChange={(e) =>
                              handleArrayInputChange(
                                index,
                                "experiences",
                                "workplace",
                                e.target.value
                              )
                            }
                            className={`w-full px-3 py-2 border ${
                              [`experiences[${index}].workplace`]
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                          />
                          {errors[`experiences[${index}].workplace`] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[`experiences[${index}].workplace`]}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Position
                          </label>
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) =>
                              handleArrayInputChange(
                                index,
                                "experiences",
                                "position",
                                e.target.value
                              )
                            }
                            className={`w-full px-3 py-2 border ${
                              [`experiences[${index}].position`]
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                          />
                          {errors[`experiences[${index}].position`] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[`experiences[${index}].position`]}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={exp.startDate}
                            onChange={(e) =>
                              handleArrayInputChange(
                                index,
                                "experiences",
                                "startDate",
                                e.target.value
                              )
                            }
                            className={`w-full px-3 py-2 border ${
                              [`experiences[${index}].startDate`]
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                          />
                          {errors[`experiences[${index}].startDate`] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[`experiences[${index}].startDate`]}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={exp.endDate}
                            onChange={(e) =>
                              handleArrayInputChange(
                                index,
                                "experiences",
                                "endDate",
                                e.target.value
                              )
                            }
                            className={`w-full px-3 py-2 border ${
                              [`experiences[${index}].endDate`]
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                          />
                          {errors[`experiences[${index}].endDate`] && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors[`experiences[${index}].endDate`]}
                            </p>
                          )}
                        </div>
                      </div>
                      {index > 0 ? (
                        <button
                          type="button"
                          onClick={() => removeArrayField(index, "experiences")}
                          className="absolute top-2 right-2"
                        >
                          <img
                            src="/close-icon.png"
                            alt="remove"
                            className="w-6 h-6"
                          />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}

                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => addArrayField("experiences")}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300"
                    >
                      Add
                    </button>
                  </div>
                </>

                <h4 className="text-lg font-medium mb-2">Education</h4>
                {formData.education.map((edu, index) => (
                  <div
                    key={index}
                    className="mb-4 p-4 border rounded-md relative"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Highest Qualification
                        </label>
                        <input
                          type="text"
                          value={edu.highestQualification}
                          onChange={(e) =>
                            handleArrayInputChange(
                              index,
                              "education",
                              "highestQualification",
                              e.target.value
                            )
                          }
                          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${
                            errors[`education[${index}].highestQualification`]
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {errors[`education[${index}].highestQualification`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`education[${index}].highestQualification`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Institute
                        </label>
                        <input
                          type="text"
                          value={edu.institute}
                          onChange={(e) =>
                            handleArrayInputChange(
                              index,
                              "education",
                              "institute",
                              e.target.value
                            )
                          }
                          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${
                            errors[`education[${index}].highestQualification`]
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {errors[`education[${index}].institute`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`education[${index}].institute`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Year
                        </label>
                        <input
                          type="date"
                          value={edu.year}
                          onChange={(e) =>
                            handleArrayInputChange(
                              index,
                              "education",
                              "year",
                              e.target.value
                            )
                          }
                          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm ${
                            errors[`education[${index}].year`]
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        {errors[`education[${index}].year`] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[`education[${index}].year`]}
                          </p>
                        )}
                      </div>
                    </div>
                    {index > 0 ? (
                      <button
                        type="button"
                        onClick={() => removeArrayField(index, "education")}
                        className="absolute top-2 right-2"
                      >
                        <img
                          src="/close-icon.png"
                          alt="remove"
                          className="w-6 h-6"
                        />
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => addArrayField("education")}
                    className="mt-2 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="min-h-screen bg-white">
        <main className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-center text-3xl font-bold text-gray-700 mb-10">
                Apply as a Tutor
              </h2>

              <div className="flex justify-between mb-8">
                {[
                  "Personal Information",
                  "Profile Information",
                  "Experience & Education",
                ].map((label, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full ${
                        step > index ? "bg-indigo-500" : "bg-gray-200"
                      } flex items-center justify-center`}
                    >
                      <span
                        className={`text-sm ${
                          step > index ? "text-white" : "text-gray-500"
                        }`}
                      >
                        {index + 1}
                      </span>
                    </div>
                    <span
                      className={`text-sm mt-2 ${
                        step > index ? "text-indigo-500" : "text-gray-500"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {renderStepContent()}
                <div className="mt-8 flex justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                    >
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Submit application
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TutorApplication;
