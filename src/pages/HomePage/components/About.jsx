import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const courses = [
  { title: 'UI/UX Design and Research', courses: 200, students: 1000, rating: 4.8 },
  { title: 'Development', courses: 200, students: 1000, rating: 4.7 },
  { title: 'Project Manager', courses: 200, students: 2000, rating: 4.9 },
  { title: 'Digital Marketing', courses: 200, students: 1000, rating: 4.6 },
  { title: 'Brand Logo Design', courses: 200, students: 1000, rating: 4.8 },
  { title: 'Content Creator', courses: 200, students: 2000, rating: 4.7 },
];

const CourseCard = ({ title, courses, students, rating }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="relative mb-4">
      <img src="https://picsum.photos/seed/picsum/200/300" alt={title} className="w-full h-48 object-cover rounded-lg" />
      <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center">
        <Star size={16} className="mr-1" />
        {rating}
      </div>
    </div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600 mb-4">{courses} Courses • {students}+ students</p>
    <motion.button
      className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold"
      whileHover={{ backgroundColor: '#2563EB' }}
      whileTap={{ scale: 0.95 }}
    >
      Explore Courses
    </motion.button>
  </motion.div>
);

const ELearningLanding = () => (
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
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
      >
        Community Passionate About Knowledge
      </motion.h2>
      <motion.p
        className="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
      >
        From foundational courses that lay the groundwork for your educational journey to advanced specializations.
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </motion.div>
  </div>





);

export default ELearningLanding;