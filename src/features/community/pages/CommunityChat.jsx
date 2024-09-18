import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { displayToastAlert } from "@/utils/displayToastAlert";
import Swal from "sweetalert2";

const CommunityChat = () => {
  const { slug } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [page, setPage] = useState(1);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [participants, setParticipants] = useState([]);
  const [socket, setSocket] = useState(null);

  const messageContainerRef = useRef(null);
  const messageEndRef = useRef(null);
  const prevHeightRef = useRef(0);

  const navigate = useNavigate();
  const userID = useSelector((state) => state.auth.id);
  console.log(userID);

  const { community, error, loading } = useFetchCommunityDetails(slug);
  const WS_BASE_URL = import.meta.env.VITE_API_WS_URL;

  useEffect(() => {
    if (community) {
      console.log("lllllllllllllllll", community);

      setParticipants(community.participants || []);
    }
    if (page === 1) {
      setNewMessage([]);
    }
    fetchMessage();

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
      console.log("===============", data);

      console.log("hey bro ");
      if (data.type === "video_call") {
        console.log("hey bro its video call please checkin");

        showVideoCallConfirmation(data.message);
      } else if (data.type === "chat_message") {
        setMessages((prev) => [
          ...prev,
          {
            content: data.message,
            sender: data.user || {
              username: "Unknown",
              profile: "/default.png",
            },
            is_my_message: data?.userID === userID,
          },
        ]);
      }
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [slug]);

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

  const fetchMessage = async (page = 1) => {
    try {
      const res = await api.get(`community/${slug}/chat/?page=${page}`);

      if (messageContainerRef.current) {
        prevHeightRef.current = messageContainerRef.current.scrollHeight;
      }

      if (res.data.results.length > 0) {
        console.log(res.data);
        setMessages((prev) => [...res.data.results, ...prev]);
        setPage(page);
        if (!res.data.next) {
          setHasMoreMessages(false);
        }
      } else {
        setHasMoreMessages(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !socket) return;
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
        message: newMessage,
        user: userID,
      })
    );
    setNewMessage("");
  };

  useEffect(() => {
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
        fetchMessage(page + 1);
      }
    }
  };

  const handleExit = async () => {
    console.log("exit exit");

    try {
      const res = await api.post(`community/${community.slug}/exit/`);
      console.log(res);
    } catch (error) {
      const errorMessage =
        error.response.data?.error || "failed to exit from community";
      displayToastAlert(400, errorMessage);
      console.log(error);
    }
  };

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
          <ChatHeader
            community={community}
            onExit={handleExit}
            socket={socket}
            userID={userID}
          />
          <div className="flex h-[calc(100vh-200px)]">
            <div className="w-3/4 flex flex-col">
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
