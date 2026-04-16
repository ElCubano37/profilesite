import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROFILE } from '../data/content'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="py-32 px-6">
      {/* Decorative divider */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="max-w-2xl mx-auto text-center"
      >
        <motion.p
          variants={itemVariants}
          className="text-indigo-400 tracking-widest text-xs uppercase mb-3"
        >
          Über mich
        </motion.p>

        <motion.h2
          variants={itemVariants}
          className="text-3xl md:text-4xl font-bold text-white mb-6"
        >
          Wer ich bin
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-lg leading-relaxed"
        >
          {PROFILE.bio}
        </motion.p>
      </motion.div>
    </section>
  )
}
