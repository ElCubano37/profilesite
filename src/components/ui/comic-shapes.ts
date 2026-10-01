import type { Tone } from '../../data/content'

// Abgeschrägte Panel-Formen. Die gleichen Prozentwerte werden für Rahmen,
// Schatten und Inhalt verwendet, damit der Rahmen überall gleich dick wirkt.
export const SHAPES = {
  a: 'polygon(0 0, 100% 3%, 98.5% 100%, 1% 96%)',
  b: 'polygon(1.5% 3%, 100% 0, 99% 97%, 0 100%)',
  c: 'polygon(0 5%, 98% 0, 100% 100%, 2% 97%)',
  d: 'polygon(1% 0, 99% 4%, 100% 96%, 0 100%)',
  e: 'polygon(0 2%, 100% 0, 97% 100%, 3% 98%)',
  rect: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
} as const

export type Shape = keyof typeof SHAPES

export const TONES: Record<Tone | 'cream' | 'ink', string> = {
  secondary: 'bg-secondary text-on-secondary',
  tertiary: 'bg-tertiary text-on-tertiary',
  primary: 'bg-primary text-on-primary',
  highlight: 'bg-highlight text-on-highlight',
  cream: 'bg-cream text-ink',
  ink: 'bg-ink text-cream',
}

// Akzentfarbe (für Text auf hellem Grund) pro Ton
export const ACCENT: Record<Tone, string> = {
  secondary: 'text-secondary',
  tertiary: 'text-tertiary-dark',
  primary: 'text-primary-dark',
  highlight: 'text-highlight-dark',
}

// Sternförmiges Abzeichen (spitz statt rund)
export function starPolygon(points = 16, inner = 0.78) {
  const coords: string[] = []
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 50 : 50 * inner
    const a = (Math.PI * i) / points - Math.PI / 2
    coords.push(`${(50 + r * Math.cos(a)).toFixed(2)}% ${(50 + r * Math.sin(a)).toFixed(2)}%`)
  }
  return `polygon(${coords.join(', ')})`
}

