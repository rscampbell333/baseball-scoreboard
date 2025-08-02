import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Top from './Top.tsx'

createRoot(document.getElementById('root')!).render(
    <App Component={Top}/>
)
