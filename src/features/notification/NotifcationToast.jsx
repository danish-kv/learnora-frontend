import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, MessageSquare } from "lucide-react";

const NotificationToast = ({ notifications, removeNotification, navigate }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (notifications.length > 0) {
        removeNotification(notifications[0].id);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [notifications, removeNotification]);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="text-indigo-500" size={20} />
                <h3 className="text-sm font-semibold text-gray-800">
                  {notification.message}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeNotification(notification.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
                <button
                  onClick={() => {
                    removeNotification(notification.id);
                    navigate(notification.link);
                  }}
                  className="flex items-center gap-1 px-2 py-1 bg-indigo-500 text-white text-xs rounded hover:bg-indigo-600 transition-colors duration-200"
                >
                  View
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationToast;
