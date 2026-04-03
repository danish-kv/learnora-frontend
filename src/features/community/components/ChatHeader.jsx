import React from "react";
import { Video, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatHeader = ({ community, onExit, socket, userID }) => {
  const handleVideoCall = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.log('WebSocket is open, sending video call message...');
      socket.send(
        JSON.stringify({
          type: "video_call",
          message: "A video call has been initiated.",
          user : userID
        })
      );
      window.location.href = `/community/${community.slug}/room`;
    } else {
      console.log('WebSocket is not open, unable to send message.');
    }
  };
  
  const handleExit = () => {
    onExit();
  };
  return (
    <div className="p-2 sm:p-4 bg-indigo-600  rounded-md text-white flex flex-col sm:flex-row justify-between items-center w-full">
      <h1 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">
        {community.name} Chat
      </h1>
      <div className="flex space-x-2">
        <Button
          onClick={handleVideoCall}
          variant="secondary"
          className="flex items-center text-xs sm:text-sm"
        >
          <Video className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Video Call</span>
        </Button>
        {/* <Button
          variant="secondary"
          className="flex items-center text-xs sm:text-sm"
        >
          <LogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span onClick={handleExit} className="hidden sm:inline">
            Exit
          </span>
        </Button> */}
      </div>
    </div>
  );
};

export default ChatHeader;
