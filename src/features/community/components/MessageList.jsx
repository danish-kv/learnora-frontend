import React, { useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const MessageList = ({ messages }) => {
  console.log("msr ==>", messages);

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-grow p-2 sm:p-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-2 sm:mb-4 flex ${
            message.is_my_message ? "justify-end" : "justify-start"
          }`}
        >
          {!message.is_my_message && (
            <Avatar className="w-6 h-6 sm:w-8 sm:h-8 mr-1 sm:mr-2">
              <AvatarImage src={message.sender?.profile} />
              <AvatarFallback>
                {message.sender?.username?.[0] || "?"}
              </AvatarFallback>
            </Avatar>
          )}
          <div
            className={`max-w-[70%] sm:max-w-sm p-2 sm:p-3 rounded-lg ${
              message.is_my_message
                ? "bg-indigo-500 text-white self-end"
                : "bg-gray-200 text-gray-900 self-start"
            }`}
          >
            <p className="font-semibold text-xs sm:text-sm">
              {message.sender?.username}
            </p>
            <p
              className={`text-xs sm:text-sm ${
                message.is_my_message ? "text-white" : "text-gray-700"
              }`}
            >
              {message.content}
            </p>
          </div>

          {message.is_my_message && (
            <Avatar className="w-6 h-6 sm:w-8 sm:h-8 ml-1 sm:ml-2">
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
