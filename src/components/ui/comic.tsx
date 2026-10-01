import { useState, type KeyboardEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { RotateCw } from 'lucide-react'
import { cn } from '../../lib/utils'
import { SHAPES, TONES, type Shape } from './comic-shapes'

type PanelProps = {
  shape?: Shape
  tone?: keyof typeof TONES
  className?: string
  innerClassName?: string
  shadow?: boolean
  children: ReactNode
}

export function Panel({ shape = 'a', tone = 'cream', className, innerClassName, shadow = true, children }: PanelProps) {
  const clipPath = SHAPES[shape]
  return (
    <div className={cn('relative', className)}>
      {shadow && (
        <div aria-hidden className="absolute inset-0 translate-x-[7px] translate-y-[7px] bg-ink" style={{ clipPath }} />
      )}
      <div aria-hidden className="absolute inset-0 bg-ink" style={{ clipPath }} />
      <div
        className={cn('relative m-[4px] h-[calc(100%-8px)] overflow-hidden', TONES[tone], innerClassName)}
        style={{ clipPath }}
      >
        {children}
      </div>
    </div>
  )
}

type FlipPanelProps = {
  front: ReactNode
  back: ReactNode
  label: string
  shape?: Shape
  frontTone?: keyof typeof TONES
  backTone?: keyof typeof TONES
  className?: string
}

// Panel, das sich beim Anklicken um die Y-Achse dreht
export function FlipPanel({ front, back, label, shape = 'a', frontTone = 'cream', backTone = 'ink', className }: FlipPanelProps) {
  const [flipped, setFlipped] = useState(false)
  const toggle = () => setFlipped((f) => !f)
  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <div className={cn('group relative [perspective:1600px]', className)}>
      <motion.div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={`${label}: ${flipped ? 'Vorderseite zeigen' : 'Details zeigen'}`}
        onClick={toggle}
        onKeyDown={onKey}
        animate={{ rotateY: flipped ? 180 : 0 }}
        whileHover={{ scale: 1.02, rotateZ: flipped ? 0.6 : -0.6 }}
        transition={{ type: 'spring', stiffness: 90, damping: 13 }}
        className="preserve-3d relative h-full w-full cursor-pointer select-none outline-none"
      >
        <div className="backface-hidden absolute inset-0" inert={flipped}>
          <Panel shape={shape} tone={frontTone} className="h-full">
            {front}
            <FlipHint />
          </Panel>
        </div>
        <div className="backface-hidden absolute inset-0 [transform:rotateY(180deg)]" inert={!flipped}>
          <Panel shape={shape} tone={backTone} className="h-full">
            {back}
            <FlipHint back />
          </Panel>
        </div>
      </motion.div>
    </div>
  )
}

function FlipHint({ back = false }: { back?: boolean }) {
  return (
    <span
      aria-hidden
      className="absolute bottom-4 right-5 flex items-center gap-1.5 border-2 border-current px-2 py-0.5 text-[11px] font-bold uppercase tracking-widest opacity-80 transition-opacity group-hover:opacity-100"
    >
      <RotateCw size={12} strokeWidth={3} className="transition-transform duration-500 group-hover:rotate-180" />
      {back ? 'Zurück' : 'Drehen'}
    </span>
  )
}

type ChapterHeadingProps = {
  chapter: string
  title: string
  subtitle?: string
  fill?: string
  light?: boolean
}

export function ChapterHeading({ chapter, title, subtitle, fill = 'text-skin', light = false }: ChapterHeadingProps) {
  return (
    <motion.header
      initial={{ opacity: 0, x: -60, skewX: -12 }}
      whileInView={{ opacity: 1, x: 0, skewX: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 110, damping: 14 }}
      className="mb-12 md:mb-16"
    >
      <span className="inline-block -skew-x-12 bg-ink px-4 py-1 text-sm font-extrabold uppercase tracking-[0.3em] text-cream shadow-hard-hl">
        <span className="inline-block skew-x-12">{chapter}</span>
      </span>
      <h2 className={cn('title-ink mt-4 font-display text-5xl uppercase leading-[0.95] md:text-7xl', fill)}>{title}</h2>
      {subtitle && (
        <p className={cn('mt-4 max-w-2xl text-lg font-medium', light ? 'text-cream/85' : 'text-ink/75')}>{subtitle}</p>
      )}
    </motion.header>
  )
}

// Schräger Übergang: liegt oben in einer Sektion und deckt die Ecke mit der Farbe der vorherigen Sektion ab
export function Slant({ cover, flip = false }: { cover: string; flip?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-px h-[6vw] min-h-8 overflow-visible">
      <div
        className={cn('absolute inset-0', cover)}
        style={{ clipPath: flip ? 'polygon(0 0, 100% 0, 100% 100%)' : 'polygon(0 0, 100% 0, 0 100%)' }}
      />
      <div
        className="absolute inset-0 bg-ink"
        style={{
          clipPath: flip
            ? 'polygon(0 0, 100% 100%, 100% calc(100% + 6px), 0 6px)'
            : 'polygon(0 100%, 100% 0, 100% 6px, 0 calc(100% + 6px))',
        }}
      />
    </div>
  )
}
