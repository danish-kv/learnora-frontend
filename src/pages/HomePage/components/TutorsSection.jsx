import React from 'react';
 
const TutorsCard = ({ headline, experience, user }) => (
  <div className="relative rounded-lg overflow-hidden group">
    <img src={user.profile} alt={user.username} className="w-full h-64 object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
    <div className="absolute bottom-0 left-0 p-4 text-white">
      <span className="bg-indigo-600 text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block">{headline}</span>
      <h3 className="text-lg font-semibold">{headline}</h3>
      {/* <p className="text-sm">{experience}</p> */}
    </div>
  </div>
);

const TutorsSection = ({tutors}) => {
  return (
    <div className=" bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Our Professional & Experience Tutors</h2>
        <p className="text-center text-gray-600 mb-12">
          From foundational courses that lay the groundwork for your educational journey to advanced specializations.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {tutors && tutors.map((tutor, index) => (
            <TutorsCard key={index} {...tutor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorsSection;