import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { PROFILE } from '../data/content'
import { SHAPES, starPolygon } from './ui/comic-shapes'

const letter = {
  hidden: { y: -120, opacity: 0, rotate: -20 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 14, delay: 0.3 + i * 0.05 },
  }),
}

function SplitWord({ word, offset, className }: { word: string; offset: number; className: string }) {
  return (
    <span className={className} aria-hidden>
      {word.split('').map((ch, i) => (
        <motion.span key={i} custom={offset + i} variants={letter} initial="hidden" animate="visible" className="inline-block">
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

function useTyping(text: string, delay: number) {
  const [out, setOut] = useState('')
  useEffect(() => {
    let i = 0
    let timer: ReturnType<typeof setTimeout>
    const tick = () => {
      i++
      setOut(text.slice(0, i))
      if (i < text.length) timer = setTimeout(tick, 55)
    }
    timer = setTimeout(tick, delay)
    return () => clearTimeout(timer)
  }, [text, delay])
  return out
}

const STAR = starPolygon(18, 0.8)

export default function HeroSection() {
  const typed = useTyping(PROFILE.title, 1300)

  // Leichter 3D-Tilt des Foto-Panels mit der Maus
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 15 })
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 15 })

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-ink pb-24 pt-28 text-cream md:min-h-screen md:pt-32"
    >
      {/* Hintergrund: Strahlen, Regen, Raster */}
      <div aria-hidden className="burst animate-spin-slow absolute left-[70%] top-1/2 -z-10 h-[220vmax] w-[220vmax] -translate-x-1/2 -translate-y-1/2" />
      <div aria-hidden className="rain absolute inset-0 -z-10" />
      <div aria-hidden className="halftone absolute inset-y-0 left-0 -z-10 w-1/2 text-ink/20 [mask-image:linear-gradient(to_right,black,transparent)]" />

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 md:px-6 lg:grid-cols-[1.15fr_1fr]">
        {/* Text */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, type: 'spring', stiffness: 120 }}
            className="mb-5 flex flex-wrap items-center gap-3"
          >
            <span className="-skew-x-12 border-[3px] border-ink bg-ink px-3 py-1 text-xs font-extrabold uppercase tracking-[0.35em] text-skin">
              <span className="inline-block skew-x-12">Portfolio</span>
            </span>
            <span className="-skew-x-12 border-[3px] border-ink bg-tertiary px-3 py-1 text-xs font-extrabold uppercase tracking-[0.35em] text-ink">
              <span className="inline-block skew-x-12">Vol. {PROFILE.apprenticeshipYear}</span>
            </span>
          </motion.div>

          <h1 className="font-display uppercase leading-[0.88]">
            <span className="sr-only">{PROFILE.name}</span>
            <SplitWord word={PROFILE.firstName} offset={0} className="title-ink block text-[22vw] text-cream sm:text-8xl lg:text-[9.5rem]" />
            <SplitWord
              word={PROFILE.lastName}
              offset={PROFILE.firstName.length}
              className="title-ink block text-[17vw] text-skin [--title-shadow:rgb(var(--secondary))] sm:text-7xl lg:text-[7.5rem]"
            />
          </h1>

          {/* Erzähl-Box wie im Comic */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -4 }}
            animate={{ opacity: 1, y: 0, rotate: -1.5 }}
            transition={{ delay: 1.1, type: 'spring', stiffness: 140, damping: 12 }}
            className="mt-8 max-w-md border-[3px] border-ink bg-skin px-5 py-4 text-ink shadow-hard"
          >
            <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-secondary">Unterdessen bei {PROFILE.company} …</p>
            <p className="mt-1 min-h-[2.5em] text-xl font-bold leading-snug md:text-2xl" aria-label={PROFILE.title}>
              {typed}
              <span className="ml-0.5 inline-block h-5 w-2 translate-y-0.5 animate-pulse bg-highlight" />
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <a
              href="#skills"
              className="border-[3px] border-ink bg-highlight px-6 py-3 font-extrabold uppercase tracking-wider text-on-highlight shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-1.5 active:translate-y-1.5 active:shadow-none"
            >
              Skills ansehen
            </a>
            <a
              href="#contact"
              className="border-[3px] border-ink bg-cream px-6 py-3 font-extrabold uppercase tracking-wider text-ink shadow-hard transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-lg active:translate-x-1.5 active:translate-y-1.5 active:shadow-none"
            >
              Kontakt
            </a>
          </motion.div>
        </div>

        {/* Foto-Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 1.3, rotate: 8 }}
          animate={{ opacity: 1, scale: 1, rotate: 2 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 90, damping: 12 }}
          className="relative mx-auto w-full max-w-sm [perspective:1200px] lg:max-w-md"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            mx.set((e.clientX - r.left) / r.width - 0.5)
            my.set((e.clientY - r.top) / r.height - 0.5)
          }}
          onMouseLeave={() => {
            mx.set(0)
            my.set(0)
          }}
        >
          <motion.div style={{ rotateX, rotateY }} className="relative aspect-[4/5]">
            <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 bg-ink" style={{ clipPath: SHAPES.c }} />
            <div aria-hidden className="absolute inset-0 bg-ink" style={{ clipPath: SHAPES.c }} />
            <div className="absolute inset-[5px] overflow-hidden bg-secondary" style={{ clipPath: SHAPES.c }}>
              <img
                src={PROFILE.photo}
                alt={`Portrait von ${PROFILE.name}`}
                className="h-full w-full scale-110 object-cover object-top [filter:contrast(1.15)_saturate(0.85)]"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-tertiary/30 mix-blend-multiply" />
              <div aria-hidden className="halftone absolute inset-0 text-secondary-dark/50 mix-blend-multiply [mask-image:linear-gradient(to_top,black,transparent_55%)]" />
              <div aria-hidden className="halftone-lg absolute inset-0 text-tertiary/40 [mask-image:linear-gradient(225deg,black,transparent_35%)]" />
            </div>
          </motion.div>

          {/* Stern-Abzeichen statt Kreis */}
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: -12 }}
            transition={{ delay: 1.4, type: 'spring', stiffness: 200, damping: 10 }}
            whileHover={{ rotate: 12, scale: 1.08 }}
            className="absolute -bottom-8 -left-2 h-32 w-32 md:-left-10 md:h-36 md:w-36"
          >
            <div className="absolute inset-0 bg-ink" style={{ clipPath: STAR }} />
            <div
              className="absolute inset-[5px] flex flex-col items-center justify-center bg-highlight text-on-highlight"
              style={{ clipPath: STAR }}
            >
              <span className="font-display text-5xl leading-none">{PROFILE.apprenticeshipYear}.</span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest">Lehrjahr</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 2.2 }, y: { repeat: Infinity, duration: 1.6 } }}
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-fit border-[3px] border-ink bg-cream p-2 text-ink shadow-hard-sm md:block"
        aria-label="Weiter nach unten"
      >
        <ArrowDown size={20} strokeWidth={3} />
      </motion.a>
    </section>
  )
}
