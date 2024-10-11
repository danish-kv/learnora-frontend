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

  const renderMessageGroup = (message, index, isLastInGroup) => {
    const messageDate = message.created_at || new Date();

    return (
      <div
        key={index}
        className={`flex ${
          message.is_my_message ? "justify-end" : "justify-start"
        } ${isLastInGroup ? "mb-4" : "mb-1"}`}
      >
        {!message.is_my_message && (
          <Avatar className="w-8 h-8 mr-2 mt-1 flex-shrink-0">
            <AvatarImage
              src={message.sender?.profile}
              alt={message.sender?.username}
            />
            <AvatarFallback>
              {message.sender?.username?.[0] || "?"}
            </AvatarFallback>
          </Avatar>
        )}

        <div
          className={`flex flex-col ${
            message.is_my_message ? "items-end" : "items-start"
          }`}
        >
          {index === 0 ||
          isDifferentDay(messageDate, messages[index - 1]?.created_at) ? (
            <div className="text-xs text-gray-500 mb-2">
              {message.sender?.username}
            </div>
          ) : null}

          <div
            className={`max-w-[100%] p-3 rounded-lg shadow-sm ${
              message.is_my_message
                ? "bg-indigo-500 text-white rounded-br-none"
                : "bg-gray-200 text-gray-800 rounded-bl-none"
            }`}
          >
            <p className="text-sm break-words">{message.content}</p>
          </div>

          {isLastInGroup && (
            <div className="text-xs text-gray-500 mt-1">
              {formatMessageTime(messageDate)}
            </div>
          )}
        </div>

        {message.is_my_message && (
          <Avatar className="w-8 h-8 ml-2 mt-1 flex-shrink-0">
            <AvatarImage
              src={message.sender?.profile}
              alt={message.sender?.username}
            />
            <AvatarFallback>
              {message.sender?.username?.[0] || "?"}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    );
  };

  const renderDateSeparator = (date) => (
    <div className="flex items-center my-4">
      <div className="flex-grow border-t border-gray-300"></div>
      <div className="mx-4 text-xs font-semibold text-gray-500 uppercase">
        {formatMessageDateHeader(date)}
      </div>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );

  return (
    <ScrollArea className="flex-grow p-4">
      {messages.map((message, index) => {
        const messageDate = message.created_at || new Date();
        const prevMessage = messages[index - 1];
        const nextMessage = messages[index + 1];
        const isFirstInGroup =
          index === 0 ||
          message.sender?.username !== prevMessage?.sender?.username ||
          isDifferentDay(messageDate, prevMessage?.created_at);
        const isLastInGroup =
          index === messages.length - 1 ||
          message.sender?.username !== nextMessage?.sender?.username ||
          isDifferentDay(messageDate, nextMessage?.created_at);

        return (
          <React.Fragment key={index}>
            {(index === 0 ||
              isDifferentDay(messageDate, prevMessage?.created_at)) &&
              renderDateSeparator(messageDate)}
            {renderMessageGroup(message, index, isLastInGroup)}
          </React.Fragment>
        );
      })}
      <div ref={messageEndRef} />
    </ScrollArea>
  );
};

export default MessageList;
