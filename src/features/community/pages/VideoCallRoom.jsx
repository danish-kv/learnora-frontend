import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const VideoCallRoom = () => {
  const { slug } = useParams();
  const videoContainerRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const MyMeeting = () => {
    const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);
    const serverSecret = import.meta.env.VITE_ZEGO_SECRET_KEY;
    console.log(appID, serverSecret);

    if (!appID || !serverSecret) {
      console.log("app id or server seceret id not ofund");

      return;
    }

    console.log("rooomm id : ===", slug);
    console.log("app id : ===", appID);
    console.log("server secret id : ===", serverSecret);

    try {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        slug,
        Date.now().toString(),
        user
      );
      
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: videoContainerRef.current,
        sharedLinks: [
          {
            name: "Personal link",
            url: `${window.location.protocol}//${window.location.host}${window.location.pathname}${slug}`,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    } catch (error) {
      console.log("ZEGO error failed");
      console.log(error);
    }
  };

  useEffect(() => {
    MyMeeting();
  }, []);
  <div ref={videoContainerRef}></div>;
};

export default VideoCallRoom;
