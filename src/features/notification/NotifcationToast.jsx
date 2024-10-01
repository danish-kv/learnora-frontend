import React from "react";
import { motion } from "framer-motion";

const NotificationToast = ({ notifications, removeNotification, navigate }) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1400,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {notifications &&
        notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, translateY: 20 }} // Starts from below
            animate={{ opacity: 1, translateY: 0 }} // Move into position
            exit={{ opacity: 0, translateY: 20 }} // Moves out of position
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: "#FFFFFF", // Snackbar background
              color: "#333", // Text color
              padding: "16px", // Increased padding for better spacing
              borderRadius: "8px", // More rounded corners
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", // Softer shadow
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1px solid #E0E0E0", // Border for definition
            }}
          >
            <p style={{ margin: 0, fontWeight: "600" }}>
              {notification.message}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
              }}
            >
              <button
                onClick={() => {
                  removeNotification(notification.id);
                  navigate(notification.link);
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#007BFF", // Primary action color
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  fontSize: "14px", // Font size adjustment
                  fontWeight: "500", // Slightly bolder text
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Button shadow
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#007BFF")
                }
              >
                VIEW
              </button>
              <button
                onClick={() => removeNotification(notification.id)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#E0E0E0",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                  fontSize: "14px",
                  fontWeight: "500",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Button shadow
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#b0b0b0")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#E0E0E0")
                }
              >
                CLOSE
              </button>
            </div>
          </motion.div>
        ))}
    </div>
  );
};

export default NotificationToast;
