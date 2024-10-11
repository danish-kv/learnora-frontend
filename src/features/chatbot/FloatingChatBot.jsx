import React, { useState, useEffect, useRef } from "react";
import { X, Send, Loader } from "lucide-react";
import api from "@/services/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { displayToastAlert } from "@/utils/displayToastAlert";
import AnimatedChatButton from "./AnimatedButton";

const BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${BASE_URL}/conversations/`;

const FloatingChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatWindowRef = useRef(null);

  const userID = useSelector((state) => state.auth.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && userID) {
      fetchConversations();
    }
  }, [isOpen, userID]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [currentConversation]);

  const fetchConversations = async () => {
    if (!userID) return;

    try {
      const res = await api.get(API_URL);
      setConversations(res.data);
      if (res.data.length > 0) {
        setCurrentConversation(res.data[0]);
      }
    } catch (error) {
      console.error("Error fetching conversations:", error);
      displayToastAlert("error", "Failed to fetch conversations");
    }
  };

  const createConversation = async () => {
    if (!userID) return;

    try {
      const res = await api.post(API_URL, { user: userID });
      setCurrentConversation(res.data);
      setConversations((prevConversations) => [...prevConversations, res.data]);
    } catch (error) {
      console.error("Error creating conversation:", error);
      displayToastAlert("error", "Failed to create conversation");
    }
  };

  const sendMessage = async () => {
    if (!userID) {
      displayToastAlert("error", "Please login to continue");
      navigate("/login");
      return;
    }

    if (message.trim() === "") return;

    setIsLoading(true);
    if (!currentConversation) {
      await createConversation();
    }

    try {
      const res = await api.post(
        `${API_URL}${currentConversation.id}/send_message/`,
        { message }
      );

      setCurrentConversation((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          res.data.user_message,
          res.data.ai_message,
        ],
      }));

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === currentConversation.id
            ? {
                ...conv,
                messages: [
                  ...conv.messages,
                  res.data.user_message,
                  res.data.ai_message,
                ],
              }
            : conv
        )
      );

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      displayToastAlert("error", "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-2xl w-full sm:w-96 h-[500px] flex flex-col animate-fade-in-up">
          <div className="flex justify-between items-center p-4 bg-indigo-600 text-white rounded-t-lg">
            <h3 className="text-lg font-semibold">Learnora AI</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition duration-300"
            >
              <X size={24} />
            </button>
          </div>
          <div
            className="flex-grow overflow-auto p-4 space-y-4"
            ref={chatWindowRef}
          >
            {userID ? (
              currentConversation &&
              currentConversation.messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.is_user ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      msg.is_user
                        ? "bg-indigo-500 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-gray-500">Please login to chat</p>
              </div>
            )}
          </div>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={userID ? "Type your message..." : "Login to chat"}
                className="flex-grow border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                disabled={!userID}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !message || !userID}
                className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader className="animate-spin" size={24} />
                ) : (
                  <Send size={22} />
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <AnimatedChatButton onClick={() => setIsOpen(true)} />
      )}
    </div>
  );
};

export default FloatingChatBot;