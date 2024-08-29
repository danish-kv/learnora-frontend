import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/layout/Header";
import useFetchCourseDetails from "../../tutor/hooks/useFetchCourseDetails";
import VideoPlayer from "../components/VideoPlayer";
import CourseVideoInfo from "../components/CourseVideoInfo";
import ReviewModal from "../modal/ReviewModal";
import CourseVideoSidebar from "../components/CourseVideoSidebar";
import NotesAndReviews from "../components/NotesAndReviews";
import NoteModal from "../modal/NoteModal";
import { displayToastAlert } from "../../../utils/displayToastAlert";

const CourseVideoPlayer = () => {
  const { slug, id } = useParams();
  const { courseDetails, refetch,error } = useFetchCourseDetails(slug);
  const [activeModule, setActiveModule] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewToEdit, setReviewToEdit] = useState(null);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const navigate = useNavigate();
  console.log(courseDetails?.reviews);


  useEffect(() => {
    if(courseDetails && !courseDetails?.progress){
      navigate('/course/')
    }
  },[])





  useEffect(() => {
    if (courseDetails && courseDetails.modules.length > 0) {
      const firstModule = courseDetails.modules.find(
        (module) => module.id === parseInt(id)
      );
      setActiveModule(firstModule || courseDetails.modules[0]);
    }
  }, [courseDetails, id]);

  const handleNotesModal = () => {
    setShowNoteModal(true);
  };

  const handleReviewModal = () => {
    console.log("modal triggered");
    setShowReviewModal(true);
  };

  const handleModuleClick = (module) => {
    setActiveModule(module);
    navigate(`/course/${slug}/${module.id}`);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto flex justify-between mt-4">
        <div className="flex-grow ml-4">
          <VideoPlayer url={activeModule ? activeModule.video : null} />
          <CourseVideoInfo
            courseDetails={courseDetails}
            currentVideo={activeModule}
            refetch={refetch}
          />
          <NotesAndReviews
            handleNotesModal={handleNotesModal}
            handleReviewModal={handleReviewModal}
            reviews={courseDetails?.reviews}
            setReviewToEdit={setReviewToEdit}
            setNoteToEdit={setNoteToEdit}
            notes={activeModule?.student_notes}
            refetch={refetch}
          />
        </div>
        <CourseVideoSidebar
          modules={courseDetails?.modules}
          activeModule={activeModule}
          handleModuleClick={handleModuleClick}
        />
      </div>
      <ReviewModal
        courseId={courseDetails?.id}
        userId={courseDetails?.progress?.student}
        showReviewModal={showReviewModal}
        setShowReviewModal={setShowReviewModal}
        reviewToEdit={reviewToEdit}
        setReviewToEdit={setReviewToEdit}
        rating={rating}
        setRating={setRating}
        refetch={refetch}
      />
      <NoteModal
        showNoteModal={showNoteModal}
        setShowNoteModal={setShowNoteModal}
        noteToEdit={noteToEdit}
        setNoteToEdit={setNoteToEdit}
        currentTime={0}
        data={courseDetails}
        refetch={refetch}
      />
    </div>
  );
};

export default CourseVideoPlayer;
