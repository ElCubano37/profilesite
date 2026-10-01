import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROJECTS } from '../data/content'
import { cn } from '../lib/utils'
import { ChapterHeading, FlipPanel, Slant } from './ui/comic'
import { ACCENT, type Shape } from './ui/comic-shapes'

// Comic-Seitenlayout: unterschiedlich breite Panels pro Zeile
const layout: { span: string; shape: Shape; height: string }[] = [
  { span: 'md:col-span-2', shape: 'a', height: 'h-80' },
  { span: 'md:col-span-4', shape: 'd', height: 'h-80' },
  { span: 'md:col-span-3', shape: 'b', height: 'h-96 md:h-[22rem]' },
  { span: 'md:col-span-3', shape: 'e', height: 'h-[28rem] sm:h-96 md:h-[22rem]' },
]

export default function ProjectsSection() {
  return (
    <section id="projects" className="paper-bg relative px-5 pb-28 pt-[calc(6vw+4rem)] md:px-6">
      <Slant cover="bg-secondary-dark" flip />
      <div className="relative mx-auto max-w-6xl">
        <ChapterHeading
          chapter="Kapitel 03"
          title="Missionen"
          fill="text-tertiary"
          subtitle="Meine Projekte bei Swisscom, vom ersten bis zum aktuellen. Jedes Panel dreht sich beim Anklicken und zeigt Details und Technologien."
        />

        <div className="grid gap-8 md:grid-cols-6">
          {PROJECTS.map((project, i) => {
            const l = layout[i % layout.length]
            const no = String(i + 1).padStart(2, '0')
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 80, rotate: i % 2 ? 5 : -5, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ type: 'spring', stiffness: 110, damping: 13, delay: (i % 2) * 0.1 }}
                className={cn(l.span, l.height)}
              >
                <FlipPanel
                  label={project.title}
                  shape={l.shape}
                  frontTone={project.tone}
                  backTone="cream"
                  className="h-full"
                  front={
                    <div className="relative flex h-full flex-col justify-between p-6 pb-14 md:p-8 md:pb-14">
                      <div aria-hidden className="halftone-lg absolute inset-0 text-ink/15 [mask-image:linear-gradient(160deg,transparent_30%,black)]" />
                      <span
                        aria-hidden
                        className="absolute -bottom-6 right-3 font-display text-[9rem] leading-none text-ink/15 md:text-[11rem]"
                      >
                        {no}
                      </span>
                      <div className="relative flex items-start justify-between gap-3">
                        <span className="-skew-x-12 border-[3px] border-ink bg-ink px-3 py-0.5 text-xs font-extrabold uppercase tracking-[0.3em] text-cream">
                          <span className="inline-block skew-x-12">Episode {no}</span>
                        </span>
                      </div>
                      <div className="relative">
                        <p className="text-sm font-extrabold uppercase tracking-[0.2em] opacity-85">{project.subtitle}</p>
                        <h3 className="title-ink mt-1 font-display text-5xl uppercase leading-[0.95] text-cream md:text-6xl">
                          {project.title}
                        </h3>
                        <p className="mt-3 text-xs font-bold uppercase tracking-widest opacity-80">
                          {project.tags.length} Technologien
                        </p>
                      </div>
                    </div>
                  }
                  back={
                    <div className="flex h-full flex-col p-6 pb-14 md:p-8 md:pb-14">
                      <p className="text-xs font-extrabold uppercase tracking-[0.3em] opacity-60">Episode {no}</p>
                      <h3 className={cn('font-display text-3xl uppercase', ACCENT[project.tone])}>{project.title}</h3>
                      <p className="mt-2 text-[15px] font-medium leading-relaxed">{project.description}</p>
                      <ul className="mt-auto flex flex-wrap gap-1.5 pt-4" aria-label="Technologien">
                        {project.tags.map((tag) => (
                          <li key={tag} className="border-2 border-ink bg-skin px-2 py-0.5 text-xs font-bold">
                            {tag}
                          </li>
                        ))}
                      </ul>
                      {'url' in project && project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                          className="absolute bottom-3.5 left-6 flex items-center gap-1 border-2 border-ink bg-highlight px-2 py-0.5 text-xs font-extrabold uppercase tracking-wider text-on-highlight shadow-hard-sm hover:bg-highlight-light md:left-8"
                        >
                          Mehr lesen <ArrowUpRight size={14} strokeWidth={3} />
                        </a>
                      )}
                    </div>
                  }
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
