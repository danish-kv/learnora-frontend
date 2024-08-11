import React from 'react'

const Mentors = () => {
  return (
  <section className="py-10 bg-white">
    <div className="container mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Experienced Course Mentor</h2>
      <div className="flex justify-center space-x-8">
        <div className="w-1/4 p-4">
          <img src="path/to/mentor1.png" alt="Nelson Amiston" className="mb-4 mx-auto rounded-full"/>
          <h3 className="text-xl font-bold mb-2">Nelson Amiston</h3>
          <p className="text-gray-700">Subject Matter Expert</p>
        </div>
        <div className="w-1/4 p-4">
          <img src="path/to/mentor2.png" alt="Taylor Swift" className="mb-4 mx-auto rounded-full"/>
          <h3 className="text-xl font-bold mb-2">Taylor Swift</h3>
          <p className="text-gray-700">Tutor</p>
        </div>
        <div className="w-1/4 p-4">
          <img src="path/to/mentor3.png" alt="Mariam Davidson" className="mb-4 mx-auto rounded-full"/>
          <h3 className="text-xl font-bold mb-2">Mariam Davidson</h3>
          <p className="text-gray-700">Course Designer</p>
        </div>
        <div className="w-1/4 p-4">
          <img src="path/to/mentor4.png" alt="John Smith" className="mb-4 mx-auto rounded-full"/>
          <h3 className="text-xl font-bold mb-2">John Smith</h3>
          <p className="text-gray-700">Lead Developer</p>
        </div>
      </div>
    </div>
  </section>
);
}


export default Mentors