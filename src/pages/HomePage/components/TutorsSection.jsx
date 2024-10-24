import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LandingImageSkeleton from "@/features/discussion/components/LandingImageSkeleton";

const TutorCard = ({ tutor }) => {
  return (
    <div className="flex-shrink-0 w-64 mx-2 bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="relative h-80">
        <img
          src={`${tutor.user.profile}`}
          alt={tutor.user.username}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <span className="bg-indigo-600 text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block">
            {tutor.headline}
          </span>
          <h3 className="text-lg font-semibold">{tutor.user.username}</h3>
        </div>
      </div>
    </div>
  );
};

const TutorsSection = ({ tutors, loading }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount =
        direction === "left" ? -container.offsetWidth : container.offsetWidth;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">
          Our Professional & Experienced Tutors
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          From foundational courses that lay the groundwork for your educational
          journey to advanced specializations, our expert tutors are here to
          guide you.
        </p>
        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 focus:outline-none"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory py-4"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {loading ? (
              <LandingImageSkeleton />
            ) : (
              tutors &&
              tutors.map((tutor, index) => (
                <div key={index} className="snap-start">
                  <TutorCard tutor={tutor} />
                </div>
              ))
            )}
          </div>

          <style>
            {`
            div::-webkit-scrollbar {
              display: none; 
            }
          `}
          </style>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md z-10 focus:outline-none"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TutorsSection;
