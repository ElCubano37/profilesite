import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { motion } from 'framer-motion'
import { BentoGrid, BentoCard } from './ui/BentoGrid'
import { PROJECTS } from '../data/content'

export default function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-indigo-400 tracking-widest text-xs uppercase mb-3">
            Meine Arbeit
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ausgewählte Projekte
          </h2>
        </motion.div>

        {isInView && (
          <BentoGrid>
            {PROJECTS.map((project, index) => (
              <BentoCard
                key={project.id}
                title={project.title}
                description={project.description}
                tags={project.tags}
                url={project.url}
                featured={project.featured}
                index={index}
              />
            ))}
          </BentoGrid>
        )}
      </div>
    </section>
  )
}
