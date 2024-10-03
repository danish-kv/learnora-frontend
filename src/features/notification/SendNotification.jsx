import React, { useEffect, useState } from "react";
import NotificationToast from "./NotifcationToast";
import { useNavigate } from "react-router-dom";

const SendNotification = ({ userID }) => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const WS_BASE_URL = import.meta.env.VITE_API_WS_URL;

  useEffect(() => {
    if (!userID) return;

    const ws = new WebSocket(`${WS_BASE_URL}/ws/notifications/${userID}/`);

    console.log(WS_BASE_URL);

    ws.onopen = () => {
      console.log("Web socket is connected");
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("Notification received:", data);
      handleNotification(data);
    };

    ws.onerror = (err) => {
      console.log("Notification WebSocket error", err);
    };

    ws.onclose = () => {
      console.log("Notification WebSocket disconnected");
    };

    return () => {
      ws.close();
      console.log("WebSocket closed on component unmount");
    };
  }, [userID, WS_BASE_URL]);

  const handleNotification = (data) => {
    const newNotification = {
      id: Date.now(),
      message: data.message || "New notification",
      link: data.link || null,
    };

    setNotifications((prev) => [...prev, newNotification]);
  };

  const clearNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div>
      <NotificationToast
        notifications={notifications}
        removeNotification={clearNotification}
        navigate={navigate}
      />
    </div>
  );
};

export default SendNotification;
