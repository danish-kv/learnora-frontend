import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

const CourseCard = ({
  name,
  total_courses,
  total_enrollment,
  average_rating,
}) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <h3 className="text-xl font-bold mb-2 text-gray-800">{name}</h3>
    <p className="text-sm text-gray-600 mb-4">
      {total_courses} Courses • {total_enrollment ? total_enrollment : 0}+
      students
    </p>
    <div className="text-yellow-400 flex items-center">
      <Star size={16} className="mr-1" />{" "}
      {average_rating ? average_rating : "N/A"}
    </div>
    <Link to={`/courses`}>
      <motion.button
        className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold mt-4"
        whileHover={{ backgroundColor: "#2563EB" }}
        whileTap={{ scale: 0.95 }}
      >
        Explore Courses
      </motion.button>
    </Link>
  </motion.div>
);

const CourseSection = ({ categories }) => {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-white py-16 px-4">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-3 text-gray-800"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        >
          Community Passionate About Knowledge
        </motion.h2>
        <motion.p
          className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        >
          From foundational courses that lay the groundwork for your educational
          journey to advanced specializations.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories &&
            categories.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CourseSection;
