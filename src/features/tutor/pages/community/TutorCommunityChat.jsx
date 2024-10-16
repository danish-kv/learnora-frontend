import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";
import ChatHeader from "@/features/community/components/ChatHeader";
import ChatInput from "@/features/community/components/ChatInput";
import CommunityInfoTab from "@/features/community/components/CommunityInfoTab";
import MessageList from "@/features/community/components/MessageList";
import ParticipantsTab from "@/features/community/components/ParticipantsTab";
import api from "@/services/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import useFetchCommunityDetails from "../../hooks/useFetchCommunityDetails";
import Swal from "sweetalert2";

const TutorCommunityChat = () => {
  const { slug } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [participants, setParticipants] = useState([]);
  const [socket, setSocket] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const messageContainerRef = useRef(null);
  const messageEndRef = useRef(null);
  const prevHeightRef = useRef(0);

  const navigate = useNavigate();
  const userID = useSelector((state) => state.auth.id);

  const WS_BASE_URL = import.meta.env.VITE_API_WS_URL;
  const { community, error, loading } = useFetchCommunityDetails(slug);

  useEffect(() => {
    const ws = new WebSocket(`${WS_BASE_URL}/ws/community/${slug}/`);
    fetchMessages();

    ws.onopen = () => {
      console.log("WebSocket connected");
      setSocket(ws);
    };

    ws.onerror = (error) => console.log("WebSocket connection error", error);
    ws.onclose = () => console.log("WebSocket disconnected");
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);

      console.log("Received message==", data);

      console.log("hey bro ");
      if (data.type === "video_call") {
        console.log("hey bro its video call please checkin");

        showVideoCallConfirmation(data.message);
      } else if (data.type === "chat_message") {
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
        console.log("message =======", messages);
      }
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [slug]);

  useEffect(() => {
    if (community) {
      console.log("Community data:", community);
      setParticipants(community.participants || []);
    }
  }, [community]);

  function showVideoCallConfirmation(message) {
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
        console.log("joining call...");
      } else {
        console.log("ignoring video call...");
      }
    });
  }

  const fetchMessages = async (page = 1) => {
    try {
      const res = await api.get(`community/${slug}/chat/?page=${page}`);

      if (messageContainerRef.current) {
        prevHeightRef.current = messageContainerRef.current.scrollHeight;
      }

      if (res.data.results.length > 0) {
        console.log(res.data);
        setMessages((prev) => [...prev, ...res.data.results]);
        setPage(page);
        setHasMoreMessages(!!res.data.next);
      } else {
        setHasMoreMessages(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Messages updated, scrolling to bottom...");
    messageEndRef.current?.scrollIntoView({ behavior: "instant" });
    if (messageContainerRef.current && prevHeightRef.current) {
      const newScrollTop =
        messageContainerRef.current.scrollHeight - prevHeightRef.current;
      messageContainerRef.current.scrollTop = newScrollTop;
    }
  }, [messages]);

  const handleScroll = () => {
    if (messageContainerRef.current) {
      if (messageContainerRef.current.scrollTop === 0 && hasMoreMessages) {
        fetchMessages(page + 1);
      }
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket) return;
    console.log("message sended");
    socket.send(
      JSON.stringify({
        message: newMessage,
        user: userID,
      })
    );
    setNewMessage("");
  };

  const handleExit = () => {};

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading community details...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        Error loading community details: {error.message}
      </div>
    );
  if (!community || Object.keys(community).length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white shadow-md z-10">
        <div className="flex items-center px-4 py-3">
          <ChatHeader
            community={community}
            onExit={handleExit}
            socket={socket}
            userID={userID}
          />
          <Button
            variant="ghost"
            className="ml-auto md:hidden"
            onClick={() => setInfoOpen(!infoOpen)}
          >
            <Menu size={24} />
          </Button>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div
            ref={messageContainerRef}
            onScroll={handleScroll}
            className="flex-grow overflow-y-auto"
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
          className={`fixed inset-y-0 z-10 right-0 w-64 bg-white border-l border-gray-200 overflow-y-auto transition-transform duration-300 ease-in-out transform ${
            infoOpen ? "translate-x-0" : "translate-x-full"
          } md:relative md:translate-x-0`}
        >
          <Button
            variant="ghost"
            className="absolute top-2 right-2 md:hidden"
            onClick={() => setInfoOpen(false)}
          >
            <X size={24} />
          </Button>
          <Tabs defaultValue="participants" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 p-2">
              <TabsTrigger value="participants">Participants</TabsTrigger>
              <TabsTrigger value="info">Info</TabsTrigger>
            </TabsList>
            <TabsContent
              value="participants"
              className="flex-1 overflow-y-auto p-4"
            >
              <ParticipantsTab participants={participants} />
            </TabsContent>
            <TabsContent value="info" className="flex-1 overflow-y-auto p-4">
              <CommunityInfoTab community={community} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TutorCommunityChat;
