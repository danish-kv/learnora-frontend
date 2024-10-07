import React from "react";
import Header from "../../components/layout/Header";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";
import Footer from "../../components/layout/Footer";
import OnlineLearningHero from "./components/OnlineLearningHero";
import JoinUsBanner from "./components/JoinUsBanner";
import useFetchLandingPage from "@/hooks/useFetchLandingPage";
import CourseSection from "./components/About";
import TutorsSection from "./components/TutorsSection";

const HomePage = () => {
  const { homeData } = useFetchLandingPage();
  console.log(homeData);

  return (
    <>
      <Header />
      <Hero data={homeData} />
      <OnlineLearningHero />
      <CourseSection data={homeData.categories} />
      <JoinUsBanner />
      <TutorsSection tutors={homeData.tutors} />
      {/* <Testimonials /> */}
      <Footer />
    </>
  );
};

export default HomePage;
