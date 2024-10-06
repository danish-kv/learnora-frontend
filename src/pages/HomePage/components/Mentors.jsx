import React from 'react';

const mentors = [
  { name: 'Joseph Ferguso', role: 'Designer', experience: '7 years experience', image: 'https://picsum.photos/seed/picsum/200/300'},
  { name: 'Michael Jordan', role: 'Marketing', experience: '10 years experience', image: 'https://picsum.photos/seed/picsum/200/300' },
  { name: 'Sarah Lee', role: 'Project Manager', experience: '8 years experience', image: 'https://picsum.photos/seed/picsum/200/300' },
  { name: 'Chris Evans', role: 'UI/UX Designer', experience: '6 years experience', image: 'https://picsum.photos/seed/picsum/200/300' },
];

const MentorCard = ({ name, role, experience, image }) => (
  <div className="relative rounded-lg overflow-hidden group">
    <img src={image} alt={name} className="w-full h-64 object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
    <div className="absolute bottom-0 left-0 p-4 text-white">
      <span className="bg-indigo-600 text-xs font-semibold px-2 py-1 rounded-full mb-2 inline-block">{role}</span>
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm">{experience}</p>
    </div>
  </div>
);

const Mentors = () => {
  return (
    <div className=" bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">Our Professional & Experience Mentors</h2>
        <p className="text-center text-gray-600 mb-12">
          From foundational courses that lay the groundwork for your educational journey to advanced specializations.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mentors.map((mentor, index) => (
            <MentorCard key={index} {...mentor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentors;