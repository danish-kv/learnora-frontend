import React from 'react'

const Hero = () => {
  return (
    <section className="bg-purple-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Become A Professional In Your Sector</h1>
        <p className="text-lg mb-8">UI UX Design | Web Development | Digital Marketing | Practical Learning</p>
        <button className="bg-purple-600 text-white py-2 px-4 rounded">Explore More</button>
        <div className="mt-8">
          <p className="text-gray-600">Over 100 Universities And Companies Collaborate With Us</p>
          <div className="flex justify-center mt-4 space-x-6">
            {/* Replace these with actual images */}
            <img src="path/to/university1.png" alt="University 1" className="h-12"/>
            <img src="path/to/university2.png" alt="University 2" className="h-12"/>
            <img src="path/to/university3.png" alt="University 3" className="h-12"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
