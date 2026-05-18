import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@fontsource-variable/plus-jakarta-sans'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.min.css'
import News from './News.jsx'
import NewNews from './NewNews.jsx'
import App2 from './App2.jsx'
import OlxUI from './olx.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <App2 />
  </StrictMode>,
)

