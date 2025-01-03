import FloatingHeader from '@/components/FloatingHeader'
import Hero from '@/components/Sections/Hero'
import Skills from '@/components/Sections/Skills'
import Experience from '@/components/Sections/Experience'
import Contact from '@/components/Sections/Contact'
import Footer from '@/components/Footer'
import ProjectCarousel from '@/components/Sections/ProjectCarousel'
import EducationTimeline from '@/components/Sections/EducationTimeline'
import AboutMe from '@/components/Sections/AboutMe'
import { GithubHeatmap } from '@/components/Elements/GithubCalender'

export default function Home() {
  return (
    <main className="min-h-screen">
      <FloatingHeader />
      <Hero />
      <Skills />
      <AboutMe />
        <GithubHeatmap />

      <ProjectCarousel />
      <EducationTimeline />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}
