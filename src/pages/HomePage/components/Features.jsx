import React from 'react'

const Features = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Why You Choose Our Program</h2>
        <div className="flex justify-center space-x-8">
          <div className="w-1/4 p-4">
            <img src="path/to/icon1.png" alt="Icon 1" className="mb-4 mx-auto"/>
            <h3 className="text-xl font-bold mb-2">Access Any Where</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="w-1/4 p-4">
            <img src="path/to/icon2.png" alt="Icon 2" className="mb-4 mx-auto"/>
            <h3 className="text-xl font-bold mb-2">Organize Program</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="w-1/4 p-4">
            <img src="path/to/icon3.png" alt="Icon 3" className="mb-4 mx-auto"/>
            <h3 className="text-xl font-bold mb-2">Flexible Time</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="w-1/4 p-4">
            <img src="path/to/icon4.png" alt="Icon 4" className="mb-4 mx-auto"/>
            <h3 className="text-xl font-bold mb-2">Certificate</h3>
            <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Features