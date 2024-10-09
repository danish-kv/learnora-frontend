import { Twitter, Youtube } from "lucide-react";
import React from "react";
import { FaInstagram, FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-8 px-4 shadow-lg rounded-t-xl mt-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">LEARNORA</h2>
            <p className="text-gray-600 mb-4">
              {" "}
              LEARNORA is an e-learning platform offering personalized courses,
              engaging contests, and community-driven learning for everyone,
              anywhere.
            </p>
            <div className="flex space-x-4">
              <a href="" className="text-indigo-500 hover:text-indigo-600">
                <FaInstagram size={20} />
              </a>
              <a href="" className="text-indigo-500 hover:text-indigo-600">
                <Twitter size={20} />
              </a>
              <a href="" className="text-indigo-500 hover:text-indigo-600">
                <Youtube size={20} />
              </a>
              <a href="" className="text-indigo-500 hover:text-indigo-600">
                <FaPinterest size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Address
                </h3>
                <p className="text-gray-600 text-sm">
                  Technology Park Malappuram
                </p>
                <p className="text-gray-600 text-sm">
                  Chammed 636711 Kerala India
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Email Address
                </h3>
                <p className="text-gray-600 text-sm">learnora@email.com</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  Phone Number
                </h3>
                <p className="text-gray-600 text-sm">(+91) 8891 1365 05</p>
                <p className="text-gray-600 text-sm">918 891 1365 05</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-200 flex flex-wrap justify-between items-center">
          <p className="text-gray-500 text-sm">
            All rights reserved &copy; LEARNORA
          </p>
          <nav className="flex space-x-4 text-sm">
            <Link to={"/courses"}>
              <p className="text-gray-600 hover:text-indigo-600">Courses</p>
            </Link>
            <Link to={"/contest"}>
              <p className="text-gray-600 hover:text-indigo-600">Contests</p>
            </Link>
            <Link to={"/community"}>
              <p className="text-gray-600 hover:text-indigo-600">Communities</p>
            </Link>
            <Link to={"/discussion"}>
              <p className="text-gray-600 hover:text-indigo-600">Discussion</p>
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
