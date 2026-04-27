import { createGlobalStyle } from 'styled-components'

//Global styles applied to the whole app.
//We define our color palette and font here once, so every component can stay consistent.
//Used a little bit of AI tools to help come up with styling for global and some components, is that ok?
const GlobalStyles = createGlobalStyle`
  :root {
    --bg: #0a0a0f;
    --bg-elevated: #14141c;
    --text: #f4f4f5;
    --text-muted: #a1a1aa;
    --accent: #88ce02;        
    --accent-soft: #88ce0220;
    --accent-2: #ff5e6c;      
    --border: #27272a;
    --font-display: 'Space Grotesk', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-display);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* Custom subtle scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: var(--bg);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent);
  }

  ::selection {
    background: var(--accent);
    color: var(--bg);
  }
`

export default GlobalStyles
