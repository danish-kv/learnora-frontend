import React from 'react'

const About = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Why You Choose Our Program</h2>
        <p className="text-gray-700 mb-8">Each program is custom-built with a wide range of tasks and greater opportunities to test every ability.</p>
        <div className="flex justify-center space-x-8">
          <div className="w-1/4 p-4">
            <img src="path/to/image1.png" alt="Feature 1" className="mb-4"/>
            <h3 className="text-xl font-bold mb-2">Access Any Where</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="w-1/4 p-4">
            <img src="path/to/image2.png" alt="Feature 2" className="mb-4"/>
            <h3 className="text-xl font-bold mb-2">Organize Program</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="w-1/4 p-4">
            <img src="path/to/image3.png" alt="Feature 3" className="mb-4"/>
            <h3 className="text-xl font-bold mb-2">Flexible Time</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="w-1/4 p-4">
            <img src="path/to/image4.png" alt="Feature 4" className="mb-4"/>
            <h3 className="text-xl font-bold mb-2">Certificate</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About