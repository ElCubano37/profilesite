export const PROFILE = {
  name: 'Diego Casellas',
  title: 'Applikationsentwickler 2. Lehrjahr',
  bio: 'Ich bin Diego, Lernender bei der Swisscom als Informatiker mit Fachrichtung Applikationsentwicklung. Ich bin 17. Jahre alt. Ich treibe sehr gerne Sport und spiele Kanu Polo beim KPZ. Ich bin sehr begeistert von der Informatik. Ich habe mich schon immer für Computer und das Programmieren interessiert. Ich mache meine Arbeit gerne und bin immer interessiert daran neue Dinge zu lernen.  ',
  photo: '../1_zugeschnitten.png', // Lege dein Foto als public/profile.jpg ab
  linkedin: 'https://www.linkedin.com/in/diego-rafael-casellas-pérez',
  intranet: 'https://neli.swisscom.com/profile/68de4bbc910a46dbc5564d00/detail?activeTab=info', //
}

export const PROJECTS = [
  {
    id: 1,
    title: 'SiteLab',
    description: 'Wir sind ein lernendes Team und arbeiten an Aufträgen wie Next Track oder Creative Studio. Unser Team ist engagiert und neugierig. Wir arbeiten alle zusammen und helfen uns gegenseitig bei Problemen. Wir sind Fullstack-Developer und haben somit mit vielen verschiedenen Technologien zu tun.'
    ,
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Nest.js', 'Vue.js', 'WSL', 'Prisma'],
    url: 'https://www.linkedin.com/posts/nino-meier-5b2b99321_closing-a-meaningful-chapter-in-my-apprenticeship-activity-7426967186868731904-j983?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFGH_wQB2DyrHnih0srEe3JZMop7Wz3Fml8',
    featured: true,
  },
  {
    id: 2,
    title: 'MAU Automation',
    description: 'Data Engineering Projekt. ',
    tags: ['Python', 'Docker, Kubernetes', 'SQL', 'FastAPI', 'SBD'],
    featured: false,
  },
  {
    id: 3,
    title: 'Minions DVX',
    description: 'In diesem Projekt haben wir Komponente für SDX entwickelt.',
    tags: ['SDX', 'Angular', 'TypeScript', 'SCSS'],
    featured: false,
  },
  {
    id: 4,
    title: 'Minions',
    description: 'In meinem ersten Projekt habe ich meine ersten Schritte in der Berufswelt, sowie der Informatik gemacht.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    featured: true,
  },
]
