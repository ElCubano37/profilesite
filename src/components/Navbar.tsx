import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'

const links = [
  { no: '01', label: 'Über mich', href: '#about' },
  { no: '02', label: 'Skills', href: '#skills' },
  { no: '03', label: 'Projekte', href: '#projects' },
  { no: '04', label: 'Kontakt', href: '#contact' },
]

const menuTones = ['bg-secondary text-on-secondary', 'bg-tertiary text-on-tertiary', 'bg-primary text-on-primary', 'bg-highlight text-on-highlight']

function useActiveSection() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])
  return active
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.1 }}
        className="fixed inset-x-0 top-0 z-50 border-b-4 border-ink bg-cream"
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <a href="#top" className="group flex items-center gap-3" aria-label="Zum Seitenanfang">
            <span className="inline-block -skew-x-12 border-[3px] border-ink bg-highlight px-2.5 py-0.5 shadow-hard-sm transition-transform group-hover:-translate-y-0.5">
              <span className="inline-block skew-x-12 font-display text-xl text-ink">DC</span>
            </span>
            <span className="hidden font-display text-lg uppercase tracking-wide sm:inline">Diego Casellas</span>
          </a>

          <nav className="hidden items-stretch gap-1 md:flex" aria-label="Hauptnavigation">
            {links.map((link) => {
              const isActive = active === link.href
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative -skew-x-12 border-[3px] px-4 py-1.5 font-bold uppercase tracking-wider transition-all duration-150',
                    isActive
                      ? 'border-ink bg-secondary text-on-secondary shadow-hard-sm'
                      : 'border-transparent text-ink hover:border-ink hover:bg-skin',
                  )}
                  aria-current={isActive ? 'true' : undefined}
                >
                  <span className="inline-block skew-x-12 text-sm">
                    <span className={cn('mr-1.5 text-xs', isActive ? 'text-highlight-light' : 'text-highlight-dark')}>{link.no}</span>
                    {link.label}
                  </span>
                </a>
              )
            })}
          </nav>

          <button
            onClick={() => setOpen((p) => !p)}
            className="border-[3px] border-ink bg-skin p-1.5 shadow-hard-sm active:translate-x-[3px] active:translate-y-[3px] active:shadow-none md:hidden"
            aria-label={open ? 'Menü schliessen' : 'Menü öffnen'}
            aria-expanded={open}
          >
            {open ? <X size={22} strokeWidth={3} /> : <Menu size={22} strokeWidth={3} />}
          </button>
        </div>

        <motion.div aria-hidden style={{ scaleX: progress }} className="absolute -bottom-1 left-0 h-1 w-full origin-left bg-highlight" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-4 bg-ink/95 px-6 pt-16 md:hidden"
            aria-label="Mobile Navigation"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ x: i % 2 ? 120 : -120, opacity: 0, rotate: i % 2 ? 4 : -4 }}
                animate={{ x: 0, opacity: 1, rotate: i % 2 ? 1.5 : -1.5 }}
                exit={{ x: i % 2 ? 120 : -120, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 160, damping: 16, delay: i * 0.06 }}
                className={cn('border-4 border-cream px-5 py-4 font-display text-4xl uppercase shadow-hard-hl-lg', menuTones[i])}
              >
                <span className="mr-3 font-sans text-base font-extrabold">{link.no}</span>
                {link.label}
              </motion.a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Gestreifter Rand wie auf dem Cover */}
      <div aria-hidden className="zigzag-strip fixed bottom-0 right-0 top-0 z-30 hidden w-3 border-l-[3px] border-ink lg:block" />
    </>
  )
}
