// Farbschemata der Seite. Ausgewählt wird das Schema in content.ts (COLOR_SCHEME).
//
// Rollen:
//   ink        Konturen, Schatten, dunkle Flächen
//   paper      Seitenhintergrund      cream  helle Panels      skin  warme Akzentflächen
//   primary    Hero- und Kontakt-Hintergrund
//   secondary  Skills-Hintergrund, Hauptakzent
//   tertiary   zweiter Akzent
//   highlight  Buttons, Abzeichen, Markierungen
//   on*        Textfarbe auf der jeweiligen Farbe

type Shades = { DEFAULT: string; dark: string; light: string }

export type Theme = {
  label: string
  ink: string
  paper: string
  cream: string
  skin: string
  primary: Shades
  secondary: Shades
  tertiary: Shades
  highlight: Shades
  onPrimary: string
  onSecondary: string
  onTertiary: string
  onHighlight: string
}

export const THEMES = {
  // Bild 1: Steel Ball Run Cover, Regengrün, Violett, Himmelblau, Orange
  steelBallRun: {
    label: 'Steel Ball Run',
    ink: '#17111f',
    paper: '#f3e9d2',
    cream: '#fbf4e2',
    skin: '#efc99a',
    primary: { DEFAULT: '#5d8b4c', dark: '#2e5537', light: '#9fc27a' },
    secondary: { DEFAULT: '#4f2f86', dark: '#2c1a4d', light: '#9d7fd6' },
    tertiary: { DEFAULT: '#2c97cf', dark: '#1a5f86', light: '#8fd0ef' },
    highlight: { DEFAULT: '#e8702a', dark: '#a8471a', light: '#f5a25a' },
    onPrimary: '#fbf4e2',
    onSecondary: '#fbf4e2',
    onTertiary: '#17111f',
    onHighlight: '#17111f',
  },

  // Bild 2: Rosa Abendhimmel, Karminrot, Limettengrün, Lavendel
  goldenWind: {
    label: 'Golden Wind',
    ink: '#1c0f17',
    paper: '#f6e6e4',
    cream: '#fff6f2',
    skin: '#f0c39b',
    primary: { DEFAULT: '#c4658a', dark: '#6e2a4a', light: '#e6a1bb' },
    secondary: { DEFAULT: '#a8213f', dark: '#4a0f22', light: '#e27791' },
    tertiary: { DEFAULT: '#8cd650', dark: '#3f7a2a', light: '#c4f08f' },
    highlight: { DEFAULT: '#a9a4ef', dark: '#5b55b0', light: '#d3d0fa' },
    onPrimary: '#fff6f2',
    onSecondary: '#fff6f2',
    onTertiary: '#1c0f17',
    onHighlight: '#1c0f17',
  },

  // Bild 3: Senfgelber Himmel, Marineblau, Gelbgrün, Ziegelrot
  diamondMustard: {
    label: 'Diamond (Senf)',
    ink: '#14121f',
    paper: '#f2e7cc',
    cream: '#fbf5e3',
    skin: '#f1cfa3',
    primary: { DEFAULT: '#c49a2a', dark: '#6e5210', light: '#e6c66a' },
    secondary: { DEFAULT: '#252a5c', dark: '#121433', light: '#7c83d0' },
    tertiary: { DEFAULT: '#d6e04f', dark: '#6d7614', light: '#eef39a' },
    highlight: { DEFAULT: '#b8443a', dark: '#7a2620', light: '#e07c6f' },
    onPrimary: '#fbf5e3',
    onSecondary: '#fbf5e3',
    onTertiary: '#14121f',
    onHighlight: '#fbf5e3',
  },

  // Bild 4: Petrol-Himmel, orange Wolken, Indigo, Stand-Blau
  diamondTeal: {
    label: 'Diamond (Petrol)',
    ink: '#141a1f',
    paper: '#f4e6cf',
    cream: '#fcf5e6',
    skin: '#e9b98f',
    primary: { DEFAULT: '#3e8a78', dark: '#1c4a42', light: '#86c4b2' },
    secondary: { DEFAULT: '#3a3360', dark: '#1d1a33', light: '#8a83c2' },
    tertiary: { DEFAULT: '#5c8fe0', dark: '#2c4f90', light: '#a9c6f5' },
    highlight: { DEFAULT: '#f0a12c', dark: '#a8650f', light: '#f8c870' },
    onPrimary: '#fcf5e6',
    onSecondary: '#fcf5e6',
    onTertiary: '#141a1f',
    onHighlight: '#141a1f',
  },

  // Bild 5: Pink-violetter Himmel, Lila, Kuppelgrün, Orange
  moriohPink: {
    label: 'Morioh (Pink)',
    ink: '#1a1020',
    paper: '#f4e8ec',
    cream: '#fff7f8',
    skin: '#f0c7a8',
    primary: { DEFAULT: '#c56c9e', dark: '#6a2c55', light: '#e7a9cb' },
    secondary: { DEFAULT: '#5b3aa0', dark: '#2a1a52', light: '#a58be0' },
    tertiary: { DEFAULT: '#3f8a6a', dark: '#1e4a38', light: '#8fcfae' },
    highlight: { DEFAULT: '#e88a2c', dark: '#a35a14', light: '#f5b46a' },
    onPrimary: '#fff7f8',
    onSecondary: '#fff7f8',
    onTertiary: '#fff7f8',
    onHighlight: '#1a1020',
  },
} satisfies Record<string, Theme>

export type ThemeName = keyof typeof THEMES

// "#rrggbb" -> "r g b", damit Tailwind Transparenz (z.B. bg-ink/20) anwenden kann
function rgb(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`
}

export function applyTheme(name: ThemeName) {
  const t: Theme = THEMES[name] ?? THEMES.steelBallRun
  const root = document.documentElement.style
  const vars: Record<string, string> = {
    ink: t.ink,
    paper: t.paper,
    cream: t.cream,
    skin: t.skin,
    'on-primary': t.onPrimary,
    'on-secondary': t.onSecondary,
    'on-tertiary': t.onTertiary,
    'on-highlight': t.onHighlight,
  }
  for (const role of ['primary', 'secondary', 'tertiary', 'highlight'] as const) {
    vars[role] = t[role].DEFAULT
    vars[`${role}-dark`] = t[role].dark
    vars[`${role}-light`] = t[role].light
  }
  for (const [key, hex] of Object.entries(vars)) root.setProperty(`--${key}`, rgb(hex))
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t.primary.dark)
}
