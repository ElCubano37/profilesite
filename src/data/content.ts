// Zentrale Inhalte der Seite. Texte, Skills und Projekte hier anpassen.

import type { ThemeName } from './themes'

// Farbschema der Seite. Zur Auswahl (Details in themes.ts):
//   'steelBallRun'    Grün, Violett, Himmelblau, Orange (Bild 1)
//   'goldenWind'      Rosa, Karminrot, Limettengrün, Lavendel (Bild 2)
//   'diamondMustard'  Senfgelb, Marineblau, Gelbgrün, Ziegelrot (Bild 3)
//   'diamondTeal'     Petrol, Indigo, Blau, Orange (Bild 4)
//   'moriohPink'      Pink, Lila, Grün, Orange (Bild 5)
export const COLOR_SCHEME: ThemeName = 'goldenWind'

const asset = (file: string) => `${import.meta.env.BASE_URL.replace(/\/?$/, '/')}${file}`

export const PROFILE = {
  name: 'Diego Casellas',
  firstName: 'Diego',
  lastName: 'Casellas',
  title: 'Applikationsentwickler 3. Lehrjahr',
  role: 'Informatiker EFZ · Applikationsentwicklung',
  company: 'Swisscom',
  age: 18,
  apprenticeshipYear: 3,
  bio: 'Ich bin Diego, Lernender bei der Swisscom als Informatiker mit Fachrichtung Applikationsentwicklung. Ich bin 18 Jahre alt. Ich treibe sehr gerne Sport und spiele Kanu Polo beim KPZ. Ich bin sehr begeistert von der Informatik. Ich habe mich schon immer für Computer und das Programmieren interessiert. Ich mache meine Arbeit gerne und bin immer interessiert daran, neue Dinge zu lernen.',
  photo: asset('1_zugeschnitten.png'),
  swisscomLogo: asset('Swisscom_logo.png'),
  linkedin: 'https://www.linkedin.com/in/diego-rafael-casellas-pérez',
  intranet: 'https://neli.swisscom.com/profile/68de4bbc910a46dbc5564d00/detail?activeTab=info',
}

// Kleine Fakten-Leiste unter dem Hero
export const STATS = [
  { value: PROFILE.age, suffix: '', label: 'Jahre alt' },
  { value: PROFILE.apprenticeshipYear, suffix: '.', label: 'Lehrjahr' },
  { value: 4, suffix: '', label: 'Projekte' },
  { value: 15, suffix: '+', label: 'Technologien' },
]

// "Über mich"-Panels: Vorderseite = Titel, Rückseite = Text (Klick dreht das Panel)
export const ABOUT_PANELS = [
  {
    kicker: 'Wer',
    title: 'Der Lernende',
    text: 'Ich bin Diego, 18 Jahre alt und mache meine Lehre als Informatiker EFZ mit Fachrichtung Applikationsentwicklung. Programmieren fasziniert mich, seit ich denken kann.',
    tone: 'secondary',
  },
  {
    kicker: 'Wo',
    title: 'Bei Swisscom',
    text: 'Bei der Swisscom arbeite ich in echten Projekten mit: vom ersten HTML-Gerüst bis zu Fullstack-Apps und Data-Engineering mit Kubernetes. Jedes Projekt bringt neue Technologien.',
    tone: 'tertiary',
  },
  {
    kicker: 'Neben dem Code',
    title: 'Kanu Polo',
    text: 'Ausgleich finde ich im Sport. Ich spiele Kanu Polo beim KPZ: schnell, taktisch und nur im Team zu gewinnen. Genau das nehme ich auch in meine Arbeit mit.',
    tone: 'primary',
  },
  {
    kicker: 'Was mich antreibt',
    title: 'Neugier',
    text: 'Ich mache meine Arbeit gerne und will immer dazulernen. Neue Frameworks, neue Tools, neue Probleme: Ich finde es spannend, mich in Unbekanntes einzuarbeiten.',
    tone: 'highlight',
  },
] as const

// Stärken im Überblick, Note A (top) bis E. Bitte nach eigener Einschätzung anpassen.
export const SKILL_STATS = [
  { label: 'Frontend', grade: 'A' },
  { label: 'Backend', grade: 'B' },
  { label: 'Datenbanken', grade: 'B' },
  { label: 'DevOps', grade: 'C' },
  { label: 'Teamwork', grade: 'A' },
  { label: 'Lernkurve', grade: 'A' },
] as const

// Technologien nach Bereich, level 1–5. Bitte nach eigener Einschätzung anpassen.
export const SKILL_GROUPS = [
  {
    title: 'Frontend',
    tone: 'secondary',
    skills: [
      { name: 'HTML & CSS', level: 5 },
      { name: 'JavaScript', level: 4 },
      { name: 'TypeScript', level: 4 },
      { name: 'Angular', level: 3 },
      { name: 'Vue.js', level: 3 },
      { name: 'Next.js', level: 3 },
      { name: 'SCSS', level: 4 },
    ],
  },
  {
    title: 'Backend & Daten',
    tone: 'tertiary',
    skills: [
      { name: 'Python', level: 4 },
      { name: 'Nest.js', level: 3 },
      { name: 'FastAPI', level: 3 },
      { name: 'SQL', level: 4 },
      { name: 'PostgreSQL', level: 3 },
      { name: 'Prisma', level: 3 },
    ],
  },
  {
    title: 'Tools & DevOps',
    tone: 'primary',
    skills: [
      { name: 'Git', level: 4 },
      { name: 'Docker', level: 3 },
      { name: 'Kubernetes', level: 2 },
      { name: 'WSL / Linux', level: 3 },
      { name: 'SDX Design System', level: 3 },
    ],
  },
] as const

// Projekte in chronologischer Reihenfolge (erstes Projekt zuerst)
export const PROJECTS = [
  {
    id: 1,
    title: 'Minions',
    subtitle: 'Die ersten Schritte',
    description: 'In meinem ersten Projekt habe ich meine ersten Schritte in der Berufswelt sowie in der Informatik gemacht.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    tone: 'highlight',
  },
  {
    id: 2,
    title: 'Minions DVX',
    subtitle: 'Komponenten für SDX',
    description: 'In diesem Projekt haben wir Komponenten für SDX, das Design System der Swisscom, entwickelt.',
    tags: ['SDX', 'Angular', 'TypeScript', 'SCSS'],
    tone: 'tertiary',
  },
  {
    id: 3,
    title: 'MAU Automation',
    subtitle: 'Data Engineering',
    description: 'Data-Engineering-Projekt mit Python, FastAPI und SQL, betrieben in Containern auf Kubernetes.',
    tags: ['Python', 'Docker', 'Kubernetes', 'SQL', 'FastAPI', 'SBD'],
    tone: 'primary',
  },
  {
    id: 4,
    title: 'SiteLab',
    subtitle: 'Fullstack im Lernenden-Team',
    description: 'Wir sind ein lernendes Team und arbeiten an Aufträgen wie Next Track oder Creative Studio. Unser Team ist engagiert und neugierig. Wir arbeiten alle zusammen und helfen uns gegenseitig bei Problemen. Als Fullstack-Developer haben wir mit vielen verschiedenen Technologien zu tun.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Nest.js', 'Vue.js', 'WSL', 'Prisma'],
    url: 'https://www.linkedin.com/posts/nino-meier-5b2b99321_closing-a-meaningful-chapter-in-my-apprenticeship-activity-7426967186868731904-j983?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFGH_wQB2DyrHnih0srEe3JZMop7Wz3Fml8',
    tone: 'secondary',
  },
] as const

export type Tone = 'secondary' | 'tertiary' | 'primary' | 'highlight'
