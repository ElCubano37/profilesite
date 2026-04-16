import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projekte', href: '#projects' },
  { label: 'Kontakt', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Desktop: zentrierte Pill-Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto"
      >
        <div className="flex items-center justify-center gap-1 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-1.5 text-sm text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile: Hamburger-Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="md:hidden fixed top-4 right-4 z-50"
      >
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-gray-300 hover:text-white transition-colors"
          aria-label="Menu öffnen"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      {/* Mobile: Dropdown-Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-16 left-4 right-4 z-40 rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 p-4 flex flex-col gap-2"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-base text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-center"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
