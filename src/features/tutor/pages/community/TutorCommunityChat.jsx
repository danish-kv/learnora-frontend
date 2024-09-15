import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import ChatHeader from "@/features/community/components/ChatHeader";
import ChatInput from "@/features/community/components/ChatInput";
import CommunityInfoTab from "@/features/community/components/CommunityInfoTab";
import MessageList from "@/features/community/components/MessageList";
import ParticipantsTab from "@/features/community/components/ParticipantsTab";
import TutorSidebar from "../../components/TutorSidebar";
import api from "@/services/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import useFetchCommunityDetails from "../../hooks/useFetchCommunityDetails";

const TutorCommunityChat = () => {
  const { slug } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [participants, setParticipants] = useState([]);
  const [socket, setSocket] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const { community, error, loading } = useFetchCommunityDetails(slug);
  const userID = useSelector((state) => state.auth.id);
  const messageEndRef = useRef(null);

  const WS_BASE_URL = import.meta.env.VITE_API_WS_URL;

  useEffect(() => {
    if (community) {
      setParticipants(community.participants || []);
    }

    const ws = new WebSocket(`${WS_BASE_URL}/ws/community/${slug}/`);
    fetchMessages();

    ws.onopen = () => {
      console.log("WebSocket connected");
      setSocket(ws);
    };

    ws.onerror = (error) => console.log("WebSocket connection error", error);
    ws.onclose = () => console.log("WebSocket disconnected");
    ws.onmessage = handleMessage;

    return () => {
      if (ws) ws.close();
    };
  }, [community, slug]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleMessage = (e) => {
    const data = JSON.parse(e.data);
    setMessages((prev) => [
      ...prev,
      {
        content: data.message,
        sender: data.user || { username: "Unknown", profile: "/default.png" },
        is_my_message: data?.userID === userID,
      },
    ]);
  };

  const fetchMessages = async () => {
    try {
      const res = await api.get(`community/${slug}/chat/`);
      setMessages((prev) => [...res.data, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket) return;
    const messageData = {
      content: newMessage,
      sender: { username: "Tutor", profile: "" },
      is_my_message: true,
    };

    setMessages((prev) => [...prev, messageData]);
    socket.send(JSON.stringify({ messages: newMessage, user: userID }));
    setNewMessage("");
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Loading community details...</div>;
  if (error) return <div className="flex justify-center items-center h-screen">Error loading community details: {error.message}</div>;
  if (!community || Object.keys(community).length === 0) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-100">
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <TutorSidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-white shadow-md z-10">
          <div className="flex items-center px-4 py-3">
            <Button variant="ghost" className="md:hidden mr-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu size={24} />
            </Button>
            <ChatHeader community={community} />
            <Button variant="ghost" className="ml-auto md:hidden" onClick={() => setInfoOpen(!infoOpen)}>
              <Menu size={24} />
            </Button>
          </div>
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto px-4 py-2">
              <MessageList messages={messages} userID={userID} />
              <div ref={messageEndRef} />
            </div>
            <ChatInput
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
            />
          </div>
          <div className={`fixed inset-y-0 right-0 w-64 bg-white border-l border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out transform ${infoOpen ? 'translate-x-0' : 'translate-x-full'} md:relative md:translate-x-0`}>
            <Button variant="ghost" className="absolute top-2 right-2 md:hidden" onClick={() => setInfoOpen(false)}>
              <X size={24} />
            </Button>
            <Tabs defaultValue="participants" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2 p-2">
                <TabsTrigger value="participants">Participants</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
              <TabsContent value="participants" className="flex-1 overflow-y-auto p-4">
                <ParticipantsTab participants={participants} />
              </TabsContent>
              <TabsContent value="info" className="flex-1 overflow-y-auto p-4">
                <CommunityInfoTab community={community} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorCommunityChat;