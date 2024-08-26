import React, { useState } from 'react';
import { FaCheck, FaPlay, FaHeart, FaStar, FaEdit, FaTimes } from 'react-icons/fa';
import Header from '../../../components/layout/Header';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import useFetchCourseDetails from '../../tutor/hooks/useFetchCourseDetails';

const CourseVideoPlayer = () => {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentVideo, setCurrentVideo] = useState('');
  const [activeModule, setActiveModule] = useState(null);

  const { slug } = useParams();
  const { courseDetails, error, loading } = useFetchCourseDetails(slug);
  
  if (!courseDetails) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading course details.</div>;

  const modules = courseDetails?.modules;

  const handleModuleClick = (module) => {
    setActiveModule(module.id);
    setCurrentVideo(module.video);
  };

  const handleAddReview = () => setShowReviewModal(true);
  const handleAddNote = () => {
    setShowNoteModal(true);
    setCurrentTime(125); // Example current time
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex mt-4">
        {/* Video Player and Course Info */}
        <div className="w-3/4 p-4">
          <div className="bg-black aspect-video relative">
            <ReactPlayer
              url={currentVideo || modules?.[0]?.video_url || ''}
              className="absolute top-0 left-0 w-full h-full"
              width="100%"
              height="100%"
              controls
              volume={100}
              playbackRate={1}
              config={{
                youtube: {
                  playerVars: { showinfo: 1, modestbranding: 1 },
                },
              }}
            />
          </div>

          {/* Course Info */}
          <div className="mt-4 bg-white p-4 rounded-md shadow">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">{courseDetails.title}</h1>
              <button className="text-red-500 hover:text-red-600">
                <FaHeart className="text-2xl" />
              </button>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500">
                {'★'.repeat(Math.floor(courseDetails.rating || 0))}
                {'☆'.repeat(5 - Math.floor(courseDetails.rating || 0))}
                {courseDetails.rating}
              </span>
              <span className="ml-2 text-sm text-gray-600">
                ({courseDetails.rating_count} ratings)
              </span>
              <span className="ml-4 text-sm text-gray-600">
                {courseDetails.total_enrollment} students enrolled
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span>4 hours total · </span>
              <span>Last updated {new Date(courseDetails.updated_at).toLocaleDateString()}</span>
            </div>
            <div className="mt-4 border-t pt-4">
              <ul className="flex space-x-4">
                <li className="font-semibold">Overview</li>
                <li>Notes</li>
                <li>Reviews</li>
              </ul>
            </div>
          </div>

          {/* Notes and Reviews Section */}
          <div className="mt-4 bg-white p-4 rounded-md shadow">
            <div className="flex space-x-4 mb-4">
              <button onClick={handleAddNote} className="flex items-center text-blue-600 hover:text-blue-700">
                <FaEdit className="mr-2" /> Add Note
              </button>
              <button onClick={handleAddReview} className="flex items-center text-green-600 hover:text-green-700">
                <FaStar className="mr-2" /> Add Review
              </button>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Recent Notes</h3>
              <p className="text-gray-600 italic">No notes yet. Be the first to add a note!</p>
            </div>
            <div className="border-t mt-4 pt-4">
              <h3 className="font-semibold mb-2">Recent Reviews</h3>
              <p className="text-gray-600 italic">No reviews yet. Be the first to review this course!</p>
            </div>
          </div>
        </div>

        {/* Course Content Panel */}
        <div className="w-1/4 bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Course Content</h2>
          <div className="space-y-6">
            {modules && modules.map((module) => (
              <div key={module.id} onClick={() => handleModuleClick(module)} className={`cursor-pointer p-3 rounded-lg ${activeModule === module.id ? 'bg-blue-100' : 'bg-white'}`}>
                <h3 className={`font-semibold text-lg mb-3 ${activeModule === module.id ? 'text-blue-800' : 'text-gray-800'}`}>
                  <FaPlay className="inline-block mr-2" /> {module.title}
                </h3>
                <div className="text-gray-600">{module.duration} mins</div>
                <div className="text-gray-500 text-sm">
                  {/* {module.lessons.length} lessons */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add Review</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <div className="mb-4">
              <p className="mb-2">Rating:</p>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="4"
              placeholder="Write your review here..."
            ></textarea>
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              Submit Review
            </button>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Add Note</h3>
              <button onClick={() => setShowNoteModal(false)} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <p className="mb-2">Time: {Math.floor(currentTime / 60)}:{currentTime % 60}</p>
            <textarea
              className="w-full p-2 border rounded mb-4"
              rows="4"
              placeholder="Write your note here..."
            ></textarea>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Save Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseVideoPlayer;