import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROFILE } from '../data/content'

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// Ersetze den Inhalt durch das echte Swisscom-Logo (z.B. public/swisscom.svg einbinden)
function SwisscomIcon({ size = 18 }: { size?: number }) {
  return (
    <img src="/Swisscom_logo.png" alt="Swisscom" width={size} height={size} />
  )
}

export default function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-32 px-6">
      {/* Decorative divider */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="text-indigo-400 tracking-widest text-xs uppercase mb-3">
          Kontakt
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Lass uns zusammen arbeiten
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          Hast du ein spannendes Projekt? Ich freue mich über deine Nachricht.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* LinkedIn */}
          <motion.a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/20 text-white hover:border-indigo-500/60 hover:bg-indigo-500/10 transition-colors duration-200"
          >
            <LinkedInIcon size={18} />
            LinkedIn
          </motion.a>

          {/* Swisscom Intranet */}
          <motion.a
            href={PROFILE.intranet}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200"
          >
            <SwisscomIcon size={18} />
            Intranet Profil
          </motion.a>
        </div>
      </motion.div>

      {/* Footer */}
      <p className="text-center text-gray-700 text-sm mt-20">
        © {new Date().getFullYear()} {PROFILE.name}. Alle Rechte vorbehalten.
      </p>
    </section>
  )
}
