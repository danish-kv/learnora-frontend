import React from "react";
import { Video, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatHeader = ({ community }) => {
  return (
    <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">{community.name} Chat</h1>
      <div className="flex space-x-2">
        <Button variant="secondary" className="flex items-center">
          <Video className="mr-2 h-4 w-4" /> Video Call
        </Button>
        <Button variant="secondary" className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" /> Exit
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
