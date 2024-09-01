import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Change Password</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
          <Input type="password" id="current-password" />
        </div>
        <div>
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
          <Input type="password" id="new-password" />
        </div>
        <div>
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <Input type="password" id="confirm-password" />
        </div>
        <Button type="submit">Change Password</Button>
      </form>
    </div>
  )
}

export default ChangePassword