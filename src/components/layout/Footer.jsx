import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <div className="flex justify-between">
          <div className="w-1/3">
            <h3 className="font-bold mb-2">IT Learning</h3>
            <p className="text-sm">©2024 Copyright Learnora</p>
          </div>
          <div className="w-1/3">
            <h3 className="font-bold mb-2">Address</h3>
            <p className="text-sm">1234 Street Name, City, Country</p>
          </div>
          <div className="w-1/3">
            <h3 className="font-bold mb-2">Contact</h3>
            <p className="text-sm">email@example.com | +123 456 7890</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer