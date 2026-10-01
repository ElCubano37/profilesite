import { useState } from 'react'
import { motion } from 'framer-motion'
import { SKILL_GROUPS, SKILL_STATS } from '../data/content'
import { cn } from '../lib/utils'
import { ChapterHeading, Panel, Slant } from './ui/comic'
import type { Shape } from './ui/comic-shapes'

const GRADE_VALUE: Record<string, number> = { A: 5, B: 4, C: 3, D: 2, E: 1 }
const LEVEL_NAMES = ['', 'Einstieg', 'Grundlagen', 'Solide', 'Fortgeschritten', 'Stark']

const SIZE = 340
const C = SIZE / 2
const R = 110

function point(i: number, r: number, n: number) {
  const a = (Math.PI * 2 * i) / n - Math.PI / 2
  return [C + r * Math.cos(a), C + r * Math.sin(a)] as const
}

function ring(r: number, n: number) {
  return Array.from({ length: n }, (_, i) => point(i, r, n).join(',')).join(' ')
}

// Sechseck-Diagramm der Stärken (A–E)
function StatHexagon() {
  const n = SKILL_STATS.length
  const [hover, setHover] = useState<number | null>(null)
  const shape = SKILL_STATS.map((s, i) => point(i, (R * GRADE_VALUE[s.grade]) / 5, n).join(',')).join(' ')

  return (
    <svg viewBox={`-60 -10 ${SIZE + 120} ${SIZE + 20}`} className="h-auto w-full overflow-visible" role="img" aria-labelledby="hex-title">
      <title id="hex-title">
        Stärken-Profil: {SKILL_STATS.map((s) => `${s.label} ${s.grade}`).join(', ')}
      </title>
      {[1, 2, 3, 4, 5].map((step) => (
        <polygon
          key={step}
          points={ring((R * step) / 5, n)}
          className={cn('stroke-ink', step === 5 ? 'fill-cream' : 'fill-none')}
          strokeOpacity={step === 5 ? 1 : 0.25}
          strokeWidth={step === 5 ? 3 : 1.5}
        />
      ))}
      {SKILL_STATS.map((_, i) => {
        const [x, y] = point(i, R, n)
        return <line key={i} x1={C} y1={C} x2={x} y2={y} className="stroke-ink" strokeOpacity={0.25} strokeWidth={1.5} />
      })}

      <motion.polygon
        points={shape}
        className="fill-secondary stroke-ink"
        fillOpacity={0.85}
        strokeWidth={3}
        strokeLinejoin="miter"
        style={{ transformOrigin: `${C}px ${C}px` }}
        initial={{ scale: 0, rotate: -60 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 70, damping: 10, delay: 0.2 }}
      />

      {SKILL_STATS.map((s, i) => {
        const [px, py] = point(i, (R * GRADE_VALUE[s.grade]) / 5, n)
        const [lx, ly] = point(i, R + 22, n)
        const anchor = Math.abs(lx - C) < 4 ? 'middle' : lx > C ? 'start' : 'end'
        const top = ly < C - R / 2
        const bottom = ly > C + R / 2
        const ty = top ? ly - 34 : bottom ? ly + 14 : ly - 8
        const active = hover === i
        return (
          <g
            key={s.label}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="cursor-default"
          >
            <motion.rect
              x={px - 6}
              y={py - 6}
              width={12}
              height={12}
              className={cn('stroke-ink', active ? 'fill-highlight' : 'fill-tertiary-light')}
              strokeWidth={2.5}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + i * 0.08 }}
              style={{ transformOrigin: `${px}px ${py}px`, rotate: 45 }}
            />
                        <text
              x={lx}
              y={ty}
              textAnchor={anchor}
              className="fill-ink font-sans text-[13px] font-extrabold uppercase"
              letterSpacing="0.12em"
            >
              {s.label}
            </text>
            <text
              x={lx}
              y={ty + 30}
              textAnchor={anchor}
              className={cn('font-display text-[26px]', active ? 'fill-highlight-dark' : 'fill-secondary')}
            >
              {s.grade}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function SkillBar({ level, delay }: { level: number; delay: number }) {
  return (
    <div className="flex gap-1" aria-hidden>
      {[1, 2, 3, 4, 5].map((seg) => (
        <motion.span
          key={seg}
          className={cn('h-4 w-5 -skew-x-[20deg] border-2 border-ink md:w-6', seg <= level ? 'bg-current' : 'bg-transparent')}
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 300, damping: 15, delay: delay + seg * 0.06 }}
        />
      ))}
    </div>
  )
}

const groupShapes: Shape[] = ['a', 'd', 'b']
const groupStyles = {
  secondary: { tone: 'cream' as const, bar: 'text-secondary', head: 'bg-secondary text-on-secondary' },
  tertiary: { tone: 'cream' as const, bar: 'text-tertiary-dark', head: 'bg-tertiary text-on-tertiary' },
  primary: { tone: 'cream' as const, bar: 'text-primary-dark', head: 'bg-primary text-on-primary' },
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative overflow-clip bg-secondary-dark px-5 pb-28 pt-[calc(6vw+4rem)] text-on-secondary md:px-6">
      <div aria-hidden className="halftone-lg absolute inset-0 text-secondary/60" />
      <Slant cover="paper-bg" />
      <div aria-hidden className="absolute -left-20 top-1/3 h-[140%] w-40 -rotate-12 bg-tertiary/10" />

      <div className="relative mx-auto max-w-6xl">
        <ChapterHeading
          chapter="Kapitel 02"
          title="Fähigkeiten"
          fill="text-tertiary-light"
          light
          subtitle="Was ich mitbringe: links das Gesamtprofil von A (stark) bis E (Einstieg), rechts die einzelnen Technologien aus meinen Projekten."
        />

        <div className="grid gap-10 lg:grid-cols-12">
          {/* Stärken-Profil */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 13 }}
            className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start"
          >
            <Panel shape="c" tone="cream" innerClassName="bg-skin text-ink p-6 md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-secondary">Stärken-Profil</p>
                  <h3 className="font-display text-3xl uppercase leading-none">Diego</h3>
                </div>
              </div>
              <div className="mx-auto mt-4 max-w-[440px]">
                <StatHexagon />
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-[11px] font-extrabold uppercase tracking-widest">
                {['A Stark', 'B Gut', 'C Solide', 'D Basis', 'E Einstieg'].map((l) => (
                  <span key={l} className="border-2 border-ink bg-cream px-2 py-0.5">
                    {l}
                  </span>
                ))}
              </div>
            </Panel>
          </motion.div>

          {/* Technologien */}
          <div className="flex flex-col gap-10 lg:col-span-7">
            {SKILL_GROUPS.map((group, gi) => {
              const style = groupStyles[group.tone]
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, x: 80, skewX: -8 }}
                  whileInView={{ opacity: 1, x: 0, skewX: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ type: 'spring', stiffness: 100, damping: 14, delay: gi * 0.05 }}
                >
                  <Panel shape={groupShapes[gi]} tone={style.tone} innerClassName="p-6 md:p-8">
                    <div aria-hidden className="halftone absolute bottom-0 right-0 h-32 w-48 text-ink/15 [mask-image:linear-gradient(315deg,black,transparent)]" />
                    <div className="relative mb-5 flex items-center justify-between gap-4">
                      <h3 className={cn('-skew-x-12 border-[3px] border-ink px-4 py-1 font-display text-2xl uppercase shadow-hard-sm', style.head)}>
                        <span className="inline-block skew-x-12">{group.title}</span>
                      </h3>
                    </div>
                    <ul className="relative grid gap-x-8 gap-y-3 sm:grid-cols-2">
                      {group.skills.map((skill, si) => (
                        <li key={skill.name} className="flex items-center justify-between gap-3">
                          <span className="font-bold">{skill.name}</span>
                          <span className={cn('flex items-center gap-2', style.bar)} title={LEVEL_NAMES[skill.level]}>
                            <SkillBar level={skill.level} delay={0.2 + si * 0.05} />
                            <span className="sr-only">
                              Level {skill.level} von 5 ({LEVEL_NAMES[skill.level]})
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Panel>
                </motion.div>
              )
            })}

            <p className="text-sm font-medium opacity-70">
              Balken: 1 = Einstieg · 2 = Grundlagen · 3 = Solide · 4 = Fortgeschritten · 5 = Stark
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
