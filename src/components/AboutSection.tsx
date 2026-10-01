import { motion } from 'framer-motion'
import { ABOUT_PANELS, PROFILE } from '../data/content'
import { ChapterHeading, FlipPanel, Panel } from './ui/comic'
import { ACCENT, type Shape } from './ui/comic-shapes'

const shapes: Shape[] = ['a', 'd', 'b', 'e']

export default function AboutSection() {
  return (
    <section id="about" className="paper-bg relative px-5 pb-28 pt-24 md:px-6">
      <div className="mx-auto max-w-6xl">
        <ChapterHeading
          chapter="Kapitel 01"
          title="Wer ist Diego?"
          fill="text-highlight"
          subtitle="Lernender, Fullstack-Entdecker und Kanu-Polo-Spieler. Klick auf die Panels, um mehr zu erfahren."
        />

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Erzähl-Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -3 }}
            whileInView={{ opacity: 1, x: 0, rotate: -1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
            className="lg:col-span-5"
          >
            <Panel shape="b" tone="secondary" className="h-full" innerClassName="p-8 md:p-10">
              <div aria-hidden className="halftone-lg absolute -right-10 -top-10 h-56 w-56 text-secondary-light/40" />
              <span className="relative inline-block border-[3px] border-ink bg-skin px-3 py-1 text-xs font-extrabold uppercase tracking-[0.3em] text-ink shadow-hard-sm">
                Die Vorgeschichte
              </span>
              <p className="relative mt-6 text-lg leading-relaxed text-on-secondary">{PROFILE.bio}</p>
              <dl className="relative mt-8 grid grid-cols-2 gap-3 text-ink">
                {[
                  ['Beruf', 'Informatiker EFZ'],
                  ['Fachrichtung', 'Applikations­entwicklung'],
                  ['Lehrbetrieb', PROFILE.company],
                  ['Verein', 'KPZ Kanu Polo'],
                ].map(([k, v], i) => (
                  <div key={k} className={`border-[3px] border-ink px-3 py-2 ${i % 2 ? 'bg-tertiary text-on-tertiary' : 'bg-cream'}`}>
                    <dt className="text-[10px] font-extrabold uppercase tracking-widest opacity-70">{k}</dt>
                    <dd className="font-bold leading-tight">{v}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </motion.div>

          {/* Dreh-Panels */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-7">
            {ABOUT_PANELS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, scale: 1.25, rotate: i % 2 ? 6 : -6 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ type: 'spring', stiffness: 160, damping: 13, delay: i * 0.08 }}
                className="h-64"
              >
                <FlipPanel
                  label={p.title}
                  shape={shapes[i]}
                  frontTone={p.tone}
                  backTone="cream"
                  className="h-full"
                  front={
                    <div className="relative flex h-full flex-col justify-end p-6 pb-14">
                      <div aria-hidden className="halftone absolute inset-0 text-ink/15" />
                      <span className="relative text-xs font-extrabold uppercase tracking-[0.3em] opacity-85">{p.kicker}</span>
                      <h3 className="title-ink-sm relative font-display text-4xl uppercase leading-none text-cream">{p.title}</h3>
                    </div>
                  }
                  back={
                    <div className="flex h-full flex-col p-6 pb-14">
                      <h3 className={`font-display text-2xl uppercase ${ACCENT[p.tone]}`}>{p.title}</h3>
                      <p className="mt-2 text-[15px] font-medium leading-relaxed">{p.text}</p>
                    </div>
                  }
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
