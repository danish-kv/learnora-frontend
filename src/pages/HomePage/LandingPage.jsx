import React from "react";
import JoinUsBanner from "./components/JoinUsBanner";
import TutorsSection from "./components/TutorsSection";
import Testimonials from "./components/Testimonials";
import useFetchLandingPage from "@/hooks/useFetchLandingPage";
import Header from "@/components/layout/Header";
import Hero from "./components/Hero";
import OnlineLearningSection from "./components/OnlineLearningSection";
import CourseSection from "./components/CourseSection";
import Footer from "@/components/layout/Footer";
import FloatingChatBot from "@/features/chatbot/FloatingChatBot";

const LandingPage = () => {

  const { homeData, loading } = useFetchLandingPage()
  return (
    <>
      <Header />
      <Hero data={homeData} loading={loading} />
      <OnlineLearningSection />
      <CourseSection categories={homeData.categories} />
      <JoinUsBanner />
      <TutorsSection tutors={homeData.tutors} loading={loading} />
      {/* <Testimonials /> */}
      <Footer />
      <FloatingChatBot />
    </>
  );
};

export default LandingPage;
