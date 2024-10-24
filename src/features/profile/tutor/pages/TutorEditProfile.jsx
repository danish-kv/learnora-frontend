import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";
import { useNavigate, useParams } from "react-router-dom";
import useFetchTutorDetails from "@/features/admin/hooks/useFetchTutorDetails";
import { displayToastAlert } from "@/utils/displayToastAlert";

const TutorEditProfile = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    phone: "",
    dob: "",
    display_name: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  const { TutorDetails, error } = useFetchTutorDetails(id);

  // setFormValues(profile)
  console.log(TutorDetails);

  useEffect(() => {
    if (TutorDetails) {
      setFormValues({
        username: TutorDetails.user.username || "",
        first_name: TutorDetails.user.first_name || "",
        last_name: TutorDetails.user.last_name || "",
        email: TutorDetails.user.email || "",
        bio: TutorDetails.user.bio || "",
        phone: TutorDetails.user.phone || "",
        dob: TutorDetails.user.dob || "",
        display_name: TutorDetails.display_name || "",
      });
    }
  }, [TutorDetails]);

  if (!TutorDetails) {
    return null;
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formValues);

    const payload = {
      user: {
        username: formValues.username,
        first_name: formValues.first_name,
        last_name: formValues.last_name,
        bio: formValues.bio,
        phone: formValues.phone,
        dob: formValues.dob,
      },
      display_name: formValues.display_name,
    };

    try {
      const res = await api.patch(`tutor-profile/${TutorDetails.id}/`, payload);
      console.log(res);
      if (res.status === 200) {
        displayToastAlert(200, "Profile Updated Successfully")
        navigate("/tutor/profile");
      } else {
        displayToastAlert(
          300,
          "Failed to edit profile. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      if (error.response) {
        displayToastAlert(
          300,
          `Error: ${
            error.response.data.detail ||
            "Failed to update profile. Please try again."
          }`
        );
      } else if (error.request) {
        displayToastAlert(
          300,
          "No response from server. Please check your network connection."
        );
      } else {
        displayToastAlert(
          300,
          "An unexpected error occurred. Please try again."
        );
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <Input
              type="text"
              id="first_name"
              value={formValues.first_name}
              onChange={handleInputChange}
              placeholder="Enter your First Name"
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Last Name
            </label>
            <Input
              type="text"
              id="last_name"
              value={formValues.last_name}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <Input
              type="text"
              id="username"
              value={formValues.username}
              onChange={handleInputChange}
              placeholder="Enter your user name"
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="display_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Display Name
            </label>
            <Input
              type="text"
              id="display_name"
              value={formValues.display_name}
              onChange={handleInputChange}
              placeholder="Enter your display name"
              className="w-full"
            />
          </div>
          <div className="md:col-span-2">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bio
            </label>
            <Textarea
              id="bio"
              value={formValues.bio}
              onChange={handleInputChange}
              placeholder="Tell us about yourself"
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <Input value={formValues.email} disabled className="w-full" />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <Input
              type="tel"
              id="phone"
              value={formValues.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full"
            />
          </div>
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth
            </label>
            <Input
              type="date"
              id="dob"
              value={formValues.dob}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
        </div>
        <Button type="submit" className="mt-6 w-full md:w-auto">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default TutorEditProfile;
