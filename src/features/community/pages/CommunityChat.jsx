import React, { useState, useEffect, useRef } from "react";
import { json, useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import { Users, Send, Video, Info, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFetchCommunityDetails from "@/features/tutor/hooks/useFetchCommunityDetails";
import { debounce } from "lodash";
import api from "@/services/api";

const CommunityChat = () => {
  const { slug } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [participants, setParticipants] = useState([]);
  const [socket, setSocket] = useState(null);

  const { community, error, loading } = useFetchCommunityDetails(slug);

  const WS_BASE_URL = import.meta.env.VITE_API_WS_URL;

  useEffect(() => {
    if (community) {
      setParticipants(community.participants || []);
    }

    const ws = new WebSocket(`${WS_BASE_URL}/ws/community/${slug}/`);

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

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [community, slug]);

  const fetchMessage = async () => {
    try {
      const res = await api.get(`community/${slug}/chat/`);
      console.log(res.data);
      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() && !socket) return;
    console.log("message sended");
    const messgeData = {
      messages: newMessage,
      user: community.participants[0].id,
    };
    socket.send(
      JSON.stringify({
        messages: newMessage,
        user: community.participants[0].id,
      })
    );
    setNewMessage("");
  };

  const handleSendMessageDebounced = debounce(handleSendMessage, 300);

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
          <div className="p-4 bg-indigo-600 text-white flex justify-between items-center">
            <h1 className="text-2xl font-bold">{community.name} Chat</h1>
            <div className="flex space-x-2">
              <Button
                onClick={fetchMessage}
                variant="secondary"
                className="flex items-center"
              >
                <Video className="mr-2 h-4 w-4" /> Video Call
              </Button>
              <Button variant="secondary" className="flex items-center">
                <LogOut className="mr-2 h-4 w-4" /> Exit
              </Button>
            </div>
          </div>

          <div className="flex h-[calc(100vh-200px)]">
            <div className="w-3/4 flex flex-col">
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
                      <p className="font-semibold">
                        {message.sender?.username}
                      </p>
                      <p className="text-gray-700">{message.content}</p>
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

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-grow"
                  />
                  <Button
                    onClick={handleSendMessageDebounced}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
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
                <TabsContent value="participants">
                  <ScrollArea className="h-[calc(100vh-280px)] p-4">
                    {participants.map((participant, index) => (
                      <div key={index} className="flex items-center mb-2">
                        <Avatar className="w-8 h-8 mr-2">
                          <AvatarImage src={participant?.profile} />
                          <AvatarFallback>
                            {participant?.username[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span>{participant?.username}</span>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="info" className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    About {community.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{community.description}</p>
                  <div className="flex items-center text-gray-500 mb-2">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{community.participants.length} members</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Info className="mr-2 h-4 w-4" />
                    <span>
                      Created on{" "}
                      {community.created_at
                        ? new Date(community.created_at).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
