import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api";
import { useParams } from "react-router-dom";
import useFetchTutorDetails from "@/features/admin/hooks/useFetchTutorDetails";

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
    } catch (error) {
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
              htmlFor="display_name"
              className="block text-sm font-medium text-gray-700"
            >
              display_name
            </label>
            <Input
              type="text"
              id="display_name"
              value={formValues.display_name}
              onChange={handleInputChange}
              placeholder="Enter your user name"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
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

export default TutorEditProfile;
