import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PROFILE } from '../data/content'
import { Panel, Slant } from './ui/comic'

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const buttonBase =
  'group flex items-center justify-between gap-6 border-[3px] border-ink px-6 py-4 text-lg font-extrabold uppercase tracking-wider shadow-hard transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-hard-lg active:translate-x-1.5 active:translate-y-1.5 active:shadow-none'

// Pfeil zeigt nach links
const ARROW = 'polygon(100% 18%, 18% 18%, 18% 0, 0 50%, 18% 100%, 18% 82%, 100% 82%)'

export default function ContactSection() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark px-5 pb-16 pt-[calc(6vw+5rem)] md:px-6">
      <div aria-hidden className="burst animate-spin-slow absolute left-1/2 top-1/2 -z-10 h-[220vmax] w-[220vmax] -translate-x-1/2 -translate-y-1/2" />
      <div aria-hidden className="rain absolute inset-0 -z-10" />
      <Slant cover="paper-bg" />

      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ type: 'spring', stiffness: 110, damping: 12 }}
          className="relative"
        >

          <Panel shape="d" tone="cream" innerClassName="p-8 md:p-14">
            <div aria-hidden className="halftone-lg absolute -right-16 -top-16 h-72 w-72 text-tertiary/40" />
            <span className="relative inline-block -skew-x-12 bg-ink px-4 py-1 text-sm font-extrabold uppercase tracking-[0.3em] text-cream shadow-hard-hl">
              <span className="inline-block skew-x-12">Kapitel 04 · Finale</span>
            </span>
            <h2 className="title-ink relative mt-5 font-display text-5xl uppercase leading-[0.95] text-secondary md:text-7xl">
              Lass uns zusammen&shy;arbeiten
            </h2>
            <p className="relative mt-5 max-w-xl text-lg font-medium text-ink/80">
              Hast du ein spannendes Projekt oder eine Frage zu meiner Arbeit? Schreib mir auf LinkedIn oder schau dir mein
              Profil im Swisscom-Intranet an.
            </p>

            <div className="relative mt-10 grid gap-5 sm:grid-cols-2">
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className={`${buttonBase} bg-tertiary text-on-tertiary`}>
                <span className="flex items-center gap-3">
                  <LinkedInIcon size={22} />
                  LinkedIn
                </span>
                <ArrowUpRight size={22} strokeWidth={3} className="transition-transform group-hover:rotate-45" />
              </a>
              <a href={PROFILE.intranet} target="_blank" rel="noopener noreferrer" className={`${buttonBase} bg-secondary text-on-secondary`}>
                <span className="flex items-center gap-3">
                  <span className="border-2 border-ink bg-cream p-0.5">
                    <img src={PROFILE.swisscomLogo} alt="" width={20} height={20} />
                  </span>
                  Intranet-Profil
                </span>
                <ArrowUpRight size={22} strokeWidth={3} className="transition-transform group-hover:rotate-45" />
              </a>
            </div>
          </Panel>
        </motion.div>

        {/* "Fortsetzung folgt"-Pfeil */}
        <motion.div
          initial={{ x: '120%', opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 70, damping: 14, delay: 0.4 }}
          className="relative ml-auto mt-16 h-20 w-full max-w-md md:h-24"
          aria-hidden
        >
          <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-ink" style={{ clipPath: ARROW }} />
          <div className="absolute inset-0 bg-ink" style={{ clipPath: ARROW }} />
          <div className="absolute inset-[4px] flex items-center justify-end bg-skin pr-6" style={{ clipPath: ARROW }}>
            <span className="font-display text-2xl uppercase tracking-wide text-ink md:text-3xl">To be continued …</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
