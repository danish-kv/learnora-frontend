import React from 'react'
import Header from '../../components/layout/Header'
import Hero from './components/Hero'
import About from './components/About'
import Mentors from './components/Mentors'
import Testimonials from './components/Testimonials'
import Footer from '../../components/layout/Footer'
import OnlineLearningHero from './components/OnlineLearningHero'
import ELearningLanding from './components/About'
import JoinUsBanner from './components/JoinUsBanner'


const HomePage = () => {
  return (
    <>
    <Header />
    <Hero />
    <OnlineLearningHero />
    <ELearningLanding />
    <JoinUsBanner />
    <Mentors />
    <Testimonials />
    <Footer />
    </>
  )
}

export default HomePage