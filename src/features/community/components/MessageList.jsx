import React, { useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const MessageList = ({ messages, userID }) => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-grow p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 flex ${
            message.is_my_message ? "justify-end" : "justify-start"
          }`}
        >
          {!message.is_my_message && (
            <Avatar className="w-8 h-8 mr-2">
              <AvatarImage src={message.sender?.profile} />
              <AvatarFallback>
                {message.sender?.username?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
          )}
          <div
            className={`max-w-sm p-3 rounded-lg ${
              message.is_my_message
                ? "bg-indigo-500 text-white self-end"
                : "bg-gray-200 text-gray-900 self-start"
            }`}
          >
            <p className="font-semibold">{message.sender?.username}</p>
            <p
              className={`${
                message.is_my_message ? "text-white" : "text-gray-700"
              }`}
            >
              {message.content}
            </p>
          </div>

          {message.is_my_message && (
            <Avatar className="w-8 h-8 ml-2">
              <AvatarImage src={message.sender?.profile} />
              <AvatarFallback>
                {message.sender?.username?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
      <div ref={messageEndRef} />
    </ScrollArea>
  );
};

export default MessageList;
