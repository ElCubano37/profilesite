import { PROFILE } from '../data/content'

export default function Footer() {
  return (
    <footer className="border-t-4 border-ink bg-ink px-5 py-8 text-cream/70 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm sm:flex-row">
        <p>
          © {new Date().getFullYear()} {PROFILE.name}. Alle Rechte vorbehalten.
        </p>
        <a href="#top" className="font-extrabold uppercase tracking-widest text-skin hover:text-highlight">
          Zurück zum Cover ↑
        </a>
      </div>
    </footer>
  )
}
