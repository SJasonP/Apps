import {StrictMode} from 'react'
import {createRoot, hydrateRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const tree = (
    <StrictMode>
        <App/>
    </StrictMode>
)

// Prerendered pages ship server markup, so hydrate them; the dev server ships an
// empty root, so mount fresh.
if (container.hasChildNodes()) {
    hydrateRoot(container, tree)
} else {
    createRoot(container).render(tree)
}
