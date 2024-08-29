import React from "react";
import ReactPlayer from "react-player";

const VideoPlayer = ({ url }) => {
  return (
    <div className="bg-black aspect-video relative">
      <ReactPlayer
        url={url}
        className="absolute top-0 left-0 w-full h-full"
        width="100%"
        height="100%"
        controls
        volume={1}
        playbackRate={1}
        config={{
          youtube: {
            playerVars: { showinfo: 1, modestbranding: 1 },
          },
        }}
      />
    </div>
  );
};

export default VideoPlayer;
