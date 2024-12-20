
import FloatingHeader from '@/components/FloatingHeader'
import Hero from '@/components/Sections/Hero'
// import Services from '@/components/services'
import Skills from '@/components/Sections/Skills'
//import Projects from '@/components/projects'
import Experience from '@/components/Sections/Experience'
import Contact from '@/components/Sections/Contact'
import Footer from '@/components/Footer'
import ProjectCarousel from '@/components/Sections/ProjectCarousel'
import EducationTimeline from '@/components/education-timeline'
import AboutMe from '@/components/Sections/AboutMe'
import { GithubHeatmap } from '@/components/GithubCalender'

export default function Home() {
  return (
    <main className="min-h-screen">
      <FloatingHeader />
      <Hero />
      {/* <Services /> */}
      <Skills />
      <AboutMe />
      <div className="felx felx-row gap-2">
        <h3 className="text-5xl  text-center text-black font-ephesis mb-4 pb-2 pt-6">Github{"  "}
         <span className="text-primary font-bold font-playfair text-4xl ">{" "}Activity Heatmap</span></h3>
      <GithubHeatmap />
      {/* <LeetCodeStats username="guru1307" /> */}
      </div>
      <ProjectCarousel />
      <EducationTimeline />
      <Experience />
      <Contact />
      {/* <Socials/> */}
      {/* <div className="md:min-w-[350px] min-w-full sm:min-w-[300px]"><FloatingHireMe/></div> */}
      
      <Footer />
    </main>
  )
}

