import React, { useEffect, useRef, useState } from "react";

const ImageCarousel = ({ students }) => {
  const scrollRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth;
      let scrollPosition = 0;
      const scroll = () => {
        if (!isHovering) {
          scrollPosition += 1;
          if (scrollPosition > scrollWidth / 2) {
            scrollPosition = 0;
          }
          scrollContainer.scrollTo(scrollPosition, 0);
        }
      };

      const intervalId = setInterval(scroll, 50);

      return () => clearInterval(intervalId);
    }
  }, [isHovering]);


  return (
    <div className="w-full overflow-hidden bg-gray-100 py-8">
      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-hidden"
        style={{ width: "calc(100% + 1rem)" }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {students &&
          students.map((student, index) => (
            <img
              key={index}
              src={`${student.profile}`}
              alt={`tutors ${(index % students.length) + 1}`}
              className="w-48 h-64 object-cover rounded-lg shadow-md flex-shrink-0 transition-transform duration-300 hover:scale-105"
            />
          ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
