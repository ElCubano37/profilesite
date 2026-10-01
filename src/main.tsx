import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { COLOR_SCHEME } from './data/content'
import { applyTheme, THEMES, type ThemeName } from './data/themes'

// Vorschau anderer Schemata per URL möglich, z.B. ?theme=goldenWind
const preview = new URLSearchParams(window.location.search).get('theme')
applyTheme(preview && preview in THEMES ? (preview as ThemeName) : COLOR_SCHEME)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
