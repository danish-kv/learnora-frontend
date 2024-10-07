import React from "react";

const Testimonials = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">What Our Students Say</h2>
        <div className="flex justify-center space-x-8">
          <div className="w-1/2 p-4">
            <p className="italic text-lg">
              "The instructor was knowledgeable and engaging, and I learned a
              lot in this course."
            </p>
            <p className="mt-4 text-gray-700">- Alex Johnson</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
