import Hero from './components/Hero'
import ScrollSection from './components/ScrollSection'
import HorizontalScroll from './components/HorizontalScroll'
import InteractiveSection from './components/InteractiveSection'
import styled from 'styled-components'

const Main = styled.main`
  min-height: 100vh;
`

function App() {
  return (
    <Main>
      <Hero />
      <ScrollSection />
      <HorizontalScroll />
      <InteractiveSection />
    </Main>
  )
}

export default App