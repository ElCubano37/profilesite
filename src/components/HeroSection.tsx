import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Component as EtherealShadow } from './ui/etheral-shadow'
import { PROFILE } from '../data/content'

export default function HeroSection() {
  const [displayedTitle, setDisplayedTitle] = useState('')

  useEffect(() => {
    if (displayedTitle.length === PROFILE.title.length) return
    const timer = setTimeout(() => {
      setDisplayedTitle(PROFILE.title.slice(0, displayedTitle.length + 1))
    }, 80)
    return () => clearTimeout(timer)
  }, [displayedTitle])

  return (
    <section className="relative min-h-screen">
      <EtherealShadow
        color="rgba(99, 102, 241, 0.8)"
        animation={{ scale: 100, speed: 90 }}
        noise={{ opacity: 0.6, scale: 1.2 }}
        sizing="fill"
        style={{ minHeight: '100vh' }}
      >
        <div className="flex flex-col items-center gap-4 px-6 text-center">
          {/* Profile picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-indigo-400/40 ring-4 ring-indigo-400/10 shadow-xl"
          >
            <img
              src={PROFILE.photo}
              alt={PROFILE.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
                target.parentElement!.classList.add('bg-indigo-400/10', 'flex', 'items-center', 'justify-center')
                target.insertAdjacentHTML('afterend', '<span class="text-4xl">👤</span>')
              }}
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white"
          >
            {PROFILE.name}
          </motion.h1>

          {/* Job title with typing effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            className="text-2xl md:text-3xl font-medium text-gray-300 h-10"
          >
            {displayedTitle}
            <span className="inline-block w-0.5 h-6 ml-0.5 bg-indigo-400 align-middle animate-blink-cursor" />
          </motion.div>
        </div>
      </EtherealShadow>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
