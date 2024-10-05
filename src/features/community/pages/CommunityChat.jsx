import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import Header from "@/components/layout/Header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import useFetchCommunityDetails from "@/features/tutor/hooks/useFetchCommunityDetails";
import api from "@/services/api";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import ParticipantsTab from "../components/ParticipantsTab";
import CommunityInfoTab from "../components/CommunityInfoTab";
import Swal from "sweetalert2";

const CommunityChat = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const userID = useSelector((state) => state.auth.id);
  const { community, error, loading } = useFetchCommunityDetails(slug);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [page, setPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [socket, setSocket] = useState(null);
  const [infoOpen, setInfoOpen] = useState(false);

  const messageContainerRef = useRef(null);
  const messageEndRef = useRef(null);
  const prevHeightRef = useRef(0);

  const WS_BASE_URL = import.meta.env.VITE_API_WS_URL;

  useEffect(() => {
    fetchMessage();
    initializeWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [slug]);

  useEffect(() => {
    if (community) {
      setParticipants(community.participants || []);
    }
  }, [community]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeWebSocket = () => {
    const ws = new WebSocket(`${WS_BASE_URL}/ws/community/${slug}/`);

    ws.onopen = () => {
      console.log("WebSocket connected");
      setSocket(ws);
    };

    ws.onerror = (error) => {
      console.error("WebSocket connection error", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      handleWebSocketMessage(data);
    };
  };

  const handleWebSocketMessage = (data) => {
    if (data.type === "video_call") {
      showVideoCallConfirmation(data.message);
    } else if (data.type === "chat_message") {
      addNewMessage(data);
    }
  };

  const addNewMessage = (data) => {
    setMessages((prev) => [
      ...prev,
      {
        content: data.content,
        sender: {
          username: data.user,
        },
        is_my_message: data?.userID === userID,
      },
    ]);
  };

  const fetchMessage = async (page = 1) => {
    try {
      const res = await api.get(`community/${slug}/chat/?page=${page}`);
      updateMessages(res.data, page);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const updateMessages = (data, page) => {
    if (messageContainerRef.current) {
      prevHeightRef.current = messageContainerRef.current.scrollHeight;
    }

    if (data.results.length > 0) {
      setMessages((prev) => [...prev, ...data.results]);
      setPage(page);
      setHasMoreMessages(!!data.next);
    } else {
      setHasMoreMessages(false);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket) return;
    socket.send(
      JSON.stringify({
        message: newMessage,
        user: userID,
      })
    );
    setNewMessage("");
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "instant" });
    if (messageContainerRef.current && prevHeightRef.current) {
      const newScrollTop =
        messageContainerRef.current.scrollHeight - prevHeightRef.current;
      messageContainerRef.current.scrollTop = newScrollTop;
    }
  };

  const handleScroll = () => {
    if (messageContainerRef.current?.scrollTop === 0 && hasMoreMessages) {
      fetchMessage(page + 1);
    }
  };

  const handleExit = async () => {
    // try {
    //   await api.post(`community/${community.slug}/exit/`);
    //   navigate("/communities"); // Redirect to communities list after exit
    // } catch (error) {
    //   const errorMessage =
    //     error.response?.data?.error || "Failed to exit from community";
    //   displayToastAlert("error", errorMessage);
    // }
  };

  const showVideoCallConfirmation = (message) => {
    Swal.fire({
      title: "Video Call Initiated",
      text: message,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Join Call",
      cancelButtonText: "Ignore",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(`/community/${slug}/room`);
      }
    });
  };

  if (loading)
    return <div className="text-center mt-8">Loading community details...</div>;
  if (error)
    return (
      <div className="text-center mt-8 text-red-500">
        Error loading community details: {error.message}
      </div>
    );
  if (!community || Object.keys(community).length === 0) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <ChatHeader
              community={community}
              onExit={handleExit}
              socket={socket}
              userID={userID}
            />
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setInfoOpen(!infoOpen)}
            >
              {infoOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
          <div className="flex h-[calc(100vh-200px)]">
            <div className="flex-grow flex flex-col">
              <div
                ref={messageContainerRef}
                onScroll={handleScroll}
                className="flex-grow overflow-y-auto px-4"
              >
                <MessageList messages={messages} />
                <div ref={messageEndRef} />
              </div>
              <ChatInput
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
              />
            </div>
            <div
              className={`fixed inset-y-0 right-0 w-64 bg-white border-l border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
                infoOpen ? "translate-x-0" : "translate-x-full"
              } md:relative md:translate-x-0 md:w-1/4`}
            >
              <Button
                variant="ghost"
                className="absolute top-2 right-2 md:hidden"
                onClick={() => setInfoOpen(false)}
              >
                <X size={24} />
              </Button>
              <Tabs defaultValue="participants" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="participants" className="w-1/2">
                    Participants
                  </TabsTrigger>
                  <TabsTrigger value="info" className="w-1/2">
                    Info
                  </TabsTrigger>
                </TabsList>
                <ParticipantsTab participants={participants} />
                <CommunityInfoTab community={community} />
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
