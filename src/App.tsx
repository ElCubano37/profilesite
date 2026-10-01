import { MotionConfig } from 'framer-motion'
import './index.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsStrip from './components/StatsStrip'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-paper text-ink lg:pr-3">
        <Navbar />
        <main>
          <HeroSection />
          <div className="paper-bg border-t-4 border-ink">
            <StatsStrip />
          </div>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
