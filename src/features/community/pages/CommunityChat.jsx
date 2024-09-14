import React, { useState, useEffect, useRef } from "react";
import {  useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFetchCommunityDetails from "@/features/tutor/hooks/useFetchCommunityDetails";
import api from "@/services/api";
import { useSelector } from "react-redux";
import ChatHeader from "../components/ChatHeader";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import ParticipantsTab from "../components/ParticipantsTab";
import CommunityInfoTab from "../components/CommunityInfoTab";

const CommunityChat = () => {
  const { slug } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [participants, setParticipants] = useState([]);
  const [socket, setSocket] = useState(null);

  const { community, error, loading } = useFetchCommunityDetails(slug);
  const userID = useSelector((state) => state.auth.id);
  console.log(userID);

  const WS_BASE_URL = import.meta.env.VITE_API_WS_URL;

  useEffect(() => {
    if (community) {
      setParticipants(community.participants || []);
    }

    const ws = new WebSocket(`${WS_BASE_URL}/ws/community/${slug}/`);

    fetchMessage();

    ws.onopen = () => {
      console.log("web socket is conneted");
      setSocket(ws);
    };

    ws.onerror = (error) => {
      console.log("websocket connection error", error);
    };

    ws.onclose = () => {
      console.log("web socket disconnection ");
    };

    ws.onmessage = handleMessage;

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [community, slug]);

  const handleMessage = (e) => {
    const data = JSON.parse(e.data);
    console.log("===============", data);

    setMessages((prev) => [
      ...prev,
      {
        content: data.message,
        sender: data.user || { username: "Unknown", profile: "/default.png" },
        is_my_message: data?.userID === userID,
      },
    ]);
  };

  const fetchMessage = async () => {
    try {
      const res = await api.get(`community/${slug}/chat/`);
      console.log(res.data);
      setMessages((prev) => [...res.data, ...prev]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() && !socket) return;
    console.log("message sended");
    const messageData = {
      content: newMessage,
      sender: {
        username: "student",
        profile: "",
      },
      is_my_message: true,
    };

    setMessages((prev) => [...prev, messageData]);

    socket.send(
      JSON.stringify({
        messages: newMessage,
        user: userID,
      })
    );
    setNewMessage("");
  };


  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!community || Object.keys(community).length === 0) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading community details...</div>;
  }

  if (error) {
    return <div>Error loading community details: {error.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="max-w-7xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ChatHeader community={community} />
          <div className="flex h-[calc(100vh-200px)]">
            <div className="w-3/4 flex flex-col">
              <MessageList messages={messages} userID={userID} />
              <ChatInput
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                handleSendMessage={handleSendMessage}
              />
            </div>

            <div className="w-1/4 border-l">
              <Tabs defaultValue="participants">
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
