import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { cn } from '../../lib/utils'

interface BentoCardProps {
  title: string
  description: string
  tags: string[]
  url?: string
  featured?: boolean
  index: number
}

export function BentoCard({ title, description, tags, url, featured = false, index }: BentoCardProps) {
  const Wrapper = url ? motion.a : motion.div

  return (
    <Wrapper
      {...(url ? { href: url, target: '_blank', rel: 'noopener noreferrer' } : {})}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'group relative flex flex-col justify-between p-6 rounded-2xl',
        url ? 'cursor-pointer' : 'cursor-default',
        'bg-white/5 backdrop-blur-sm border border-white/10',
        'hover:border-indigo-500/50 hover:bg-white/[0.08] transition-colors duration-300',
        featured
          ? 'md:col-span-2 md:row-span-2 min-h-[260px]'
          : 'col-span-1 min-h-[180px]'
      )}
    >
      {/* Glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99,102,241,0.08), transparent 60%)' }}
      />

      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <h3 className={cn('font-semibold text-white', featured ? 'text-2xl' : 'text-lg')}>
            {title}
          </h3>
          {url && (
            <ExternalLink
              size={16}
              className="text-gray-600 group-hover:text-indigo-400 transition-colors duration-200 flex-shrink-0 mt-1"
            />
          )}
        </div>
        <p className={cn('text-gray-400 leading-relaxed', featured ? 'text-base' : 'text-sm')}>
          {description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-indigo-500/20 text-indigo-300 text-xs px-2.5 py-1 rounded-full border border-indigo-500/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </Wrapper>
  )
}

interface BentoGridProps {
  children: React.ReactNode
}

export function BentoGrid({ children }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min">
      {children}
    </div>
  )
}
