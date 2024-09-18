import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { debounce } from "lodash";

const ChatInput = ({ newMessage, setNewMessage, handleSendMessage }) => {
  const handleSendMessageDebounced = debounce(handleSendMessage, 300);

  return (
    <div className="p-2 sm:p-4 border-t">
      <div className="flex space-x-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow text-sm sm:text-base"
        />
        <Button
          onClick={handleSendMessageDebounced}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
