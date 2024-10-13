import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";

const EditProfile = ({ profile }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    phone: "",
    dob: "",
  });

  // setFormValues(profile)
  console.log(profile);

  useEffect(() => {
    if (profile) {
      setFormValues({
        username: profile.username || "",
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        email: profile.email || "",
        bio: profile.bio || "",
        phone: profile.phone || "",
        dob: profile.dob || "",
      });
    }
  }, [profile]);

  if (!profile) {
    return null;
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formValues);

    try {
      const res = await api.patch(`student-profile/${profile.id}/`, formValues);
      console.log(res);
      if (res.status === 200) {
        displayToastAlert(200, "Profile updated successfully");
      } else {
        displayToastAlert(300, "Facing some issue");
      }
    } catch (error) {
      displayToastAlert(400, "Failed to updated profile");
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <Input
              type="text"
              id="first_name"
              value={formValues.first_name}
              onChange={handleInputChange}
              placeholder="Enter your First Name"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <Input
              type="text"
              id="last_name"
              value={formValues.last_name}
              onChange={handleInputChange}
              placeholder="Enter your last name"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <Input
              type="text"
              id="username"
              value={formValues.username}
              onChange={handleInputChange}
              placeholder="Enter your user name"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Input value={formValues.email} disabled />
          </div>
        </div>
        <div>
          <label
            htmlFor="bio"
            className="block text-sm font-medium text-gray-700"
          >
            Bio
          </label>
          <Textarea
            id="bio"
            value={formValues.bio}
            onChange={handleInputChange}
            placeholder="Tell us about yourself"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <Input
              type="tel"
              id="phone"
              value={formValues.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <Input
              type="date"
              id="dob"
              value={formValues.dob}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <Button type="submit" className="mt-4">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
