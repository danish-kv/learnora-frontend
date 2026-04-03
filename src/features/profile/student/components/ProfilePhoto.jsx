import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";

const ProfilePhoto = ({ profile }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (profile) {
      setPreviewUrl(profile.profile);
    }
  }, [profile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
      setError("Please select an image file.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profile", selectedFile);
    try {
      const res = await api.patch(`student-profile/${profile.id}/`, formData);
      displayToastAlert(200, 'Updated Profile Photo')
      console.log(res);
    } catch (error) {
      displayToastAlert(200, 'Failed Profile Photo')
      console.log(error);
      setError("Failed to upload the image. Please try again.");
    }
    console.log("Uploading file:", selectedFile);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto ">
      <CardHeader>
        <CardTitle>Profile Photo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-32 h-32 ">
            <AvatarImage className={'object-cover'} src={previewUrl || profile?.profile || 'https://github.com/shadcn.png'} alt="Profile" />
            <AvatarFallback>
              {profile?.first_name?.[0]}
              {profile?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>

          <form onSubmit={handleSubmit} className="w-full space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="flex-grow"
              />
              <Button type="submit" disabled={!selectedFile}>
                <Upload className="mr-2 h-4 w-4" /> Upload
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePhoto;
