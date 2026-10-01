import { useEffect, useRef, useState } from 'react'
import { animate, motion, useInView } from 'framer-motion'
import { STATS } from '../data/content'

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.2, ease: 'easeOut', onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])
  return <span ref={ref}>{value}</span>
}

const tones = ['text-skin', 'text-tertiary-light', 'text-highlight-light', 'text-primary-light']

export default function StatsStrip() {
  return (
    <div className="relative z-10 -mt-10 px-4">
      <motion.ul
        initial={{ opacity: 0, rotate: 0, y: 40 }}
        whileInView={{ opacity: 1, rotate: -1.5, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 100, damping: 14 }}
        className="mx-auto grid max-w-5xl grid-cols-2 border-4 border-ink bg-ink shadow-hard-hl-lg md:grid-cols-4"
      >
        {STATS.map((s, i) => (
          <li
            key={s.label}
            className="flex flex-col items-center justify-center border-cream/15 px-4 py-5 text-center odd:border-r md:border-r md:last:border-r-0 [&:nth-child(-n+2)]:border-b md:[&:nth-child(-n+2)]:border-b-0"
          >
            <span className={`font-display text-5xl leading-none md:text-6xl ${tones[i % tones.length]}`}>
              <CountUp to={s.value} />
              {s.suffix}
            </span>
            <span className="mt-1 text-xs font-extrabold uppercase tracking-[0.25em] text-cream/80">{s.label}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}
