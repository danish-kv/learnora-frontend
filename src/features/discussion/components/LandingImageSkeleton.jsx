import React from "react";

const LandingImageSkeleton = ({ count = 8 }) => {
  // Double the items to create a seamless infinite scroll effect
  const items = [...Array(count * 2)];

  return (
    <div className="w-full overflow-hidden bg-gray-100 py-8">
      <div className="flex animate-carousel">
        {items.map((_, index) => (
          <div
            key={index}
            className="w-48 h-64 flex-shrink-0 mx-2 rounded-lg overflow-hidden"
          >
            <div className="w-full h-full relative">
              {/* Base skeleton with shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />

              {/* Overlay to create depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-200/50" />
            </div>
          </div>
        ))}
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes carousel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-carousel {
          animation: carousel 30s linear infinite;
        }

        .animate-shimmer {
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default LandingImageSkeleton;
