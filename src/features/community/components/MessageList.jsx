import React, { useRef, useEffect } from "react"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  formatMessageTime,
  formatMessageDateHeader,
  isDifferentDay,
} from "@/utils/format";

const MessageList = ({ messages }) => {
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-grow p-2 sm:p-4">
      {messages.map((message, index) => {
        const messageDate = message.created_at || new Date();

        const showDateHeader =
          index === 0 ||
          isDifferentDay(messageDate, messages[index - 1]?.created_at || new Date());

        return (
          <div key={index}>
            {/* Date header */}
            {showDateHeader && (
              <div className="text-center my-2">
                <span className="text-gray-500 text-xs sm:text-sm font-medium">
                  {formatMessageDateHeader(messageDate)}
                </span>
              </div>
            )}

            {/* Message bubble */}
            <div
              className={`flex ${message.is_my_message ? "justify-end" : "justify-start"}`}
            >
              {/* Show Avatar for incoming messages */}
              {!message.is_my_message && (
                <Avatar className="w-6 h-6 sm:w-8 sm:h-8 mr-1 sm:mr-2">
                  <AvatarImage src={message.sender?.profile} />
                  <AvatarFallback>
                    {message.sender?.username?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>
              )}

              {/* Message bubble content */}
              <div
                className={`max-w-[70%] mb-3 sm:max-w-sm p-2 sm:p-3 rounded-lg relative ${
                  message.is_my_message
                    ? "bg-indigo-500 text-white self-end"
                    : "bg-gray-200 text-gray-900 self-start"
                }`}
              >
                {/* Username */}
                <p className="font-semibold text-xs sm:text-sm mb-1">
                  {message.sender?.username}
                </p>

                {/* Message Content */}
                <p className={`text-xs sm:text-sm ${message.is_my_message ? "text-white" : "text-gray-700"}`}>
                  {message.content}
                </p>

                {/* Time below message, aligned to the right */}
                <span className={`text-[10px] sm:text-xs absolute bottom-1 right-2 ${message.is_my_message ? "text-white" : "text-gray-600"}`}>
                  {formatMessageTime(messageDate)}
                </span>
              </div>

              {/* Show Avatar for outgoing messages (my messages) */}
              {message.is_my_message && (
                <Avatar className="w-6 h-6 sm:w-8 sm:h-8 ml-1 sm:ml-2">
                  <AvatarImage src={message.sender?.profile} />
                  <AvatarFallback>
                    {message.sender?.username?.[0] || "?"}
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        );
      })}
      <div ref={messageEndRef} />
    </ScrollArea>
  );
};

export default MessageList;
