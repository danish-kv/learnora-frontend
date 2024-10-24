import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "@/redux/thunk/authThunks";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newPassword != confirmPassword) {
        displayToastAlert(400, "Both password is not same");
        return;
      }
      const res = await api.post("change-password/", {
        old_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      console.log(res);
      displayToastAlert(200, "Password changed successfully")
      dispatch(Logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        const errors = error.response.data;

        if (errors.old_password) {
          displayToastAlert(400, errors.old_password[0]);
        } else if (errors.confirm_password) {
          displayToastAlert(400, errors.confirm_password[0]);
        } else {
          displayToastAlert(400, "An unknown error occurred");
        }
      } else {
        console.log(error);
        displayToastAlert(400, "An error occurred");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="current-password"
            className="block text-sm font-medium text-gray-700"
          >
            Current Password
          </label>
          <Input
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password"
            id="current-password"
          />
        </div>
        <div>
          <label
            htmlFor="new-password"
            className="block text-sm font-medium text-gray-700"
          >
            New Password
          </label>
          <Input
            onChange={(e) => setNewPassword(e.target.value)}
            type="password"
            id="new-password"
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm New Password
          </label>
          <Input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            id="confirm-password"
          />
        </div>
        <Button onClick={handleSubmit} type="submit">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
