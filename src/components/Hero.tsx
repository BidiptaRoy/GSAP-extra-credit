import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import styled from 'styled-components'

/* ------------------------------------------------------------------
 * HERO SECTION
 * ------------------------------------------------------------------
 * What this demonstrates:
 *   - gsap.from()  → animates elements FROM a state TO their final state
 *   - stagger      → delays each element so they animate in sequence
 *   - useGSAP()    → official React hook for safe cleanup on unmount
 *
 * GSAP uses a `ref` to know which element to animate. We attach the
 * ref to a container, then use gsap.from() to animate each child.
 * ------------------------------------------------------------------ */

function Hero() {
  // 1. Create a ref pointing to our container element
  const container = useRef(null)

  // 2. useGSAP() runs animations safely inside React. The "scope" tells GSAP to only target elements inside the container.
  useGSAP(
    () => {
      // Animate each line of text from below + transparent → into place
      gsap.from('.hero-line', {
        y: 80,           // start 80px below
        opacity: 0,      // start invisible
        duration: 1,     // animation lasts 1 second
        ease: 'power3.out',
        stagger: 0.15,   // each line waits 0.15s after the previous
      })

      // Animate the badge with a slight delay
      gsap.from('.hero-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        delay: 0.6,
      })

      // Animate the scroll cue gently after everything else
      gsap.from('.hero-scroll-cue', {
        y: -20,
        opacity: 0,
        duration: 1,
        delay: 1.4,
        ease: 'power2.out',
      })
    },
    { scope: container }, // container
  )

  return (
    <Section ref={container}>
      <Inner>
        <Badge className="hero-badge">
          <Dot /> Show &amp; Tell · Spring 2026
        </Badge>

        <Headline>
          <Line className="hero-line">Animate the web!</Line>
          <Line className="hero-line">with <Accent>GSAP</Accent></Line>
          <Line className="hero-line subtitle">A tour of the GreenSock Animation Platform, aka GSAP  — in React.</Line>
        </Headline>

        <ScrollCue className="hero-scroll-cue">↓ scroll to explore</ScrollCue>
      </Inner>
    </Section>
  )
}

export default Hero

// ------------------ STYLING ------------------ 

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  background:
    radial-gradient(ellipse at top, var(--accent-soft), transparent 60%),
    var(--bg);
`

const Inner = styled.div`
  max-width: 1100px;
  width: 100%;
  text-align: center;
`

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
`

const Dot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 12px var(--accent);
`

const Headline = styled.h1`
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
`

const Line = styled.div`
  display: block;
  overflow: hidden;
  padding: 0.05em 0;

  &.subtitle {
    font-size: clamp(1rem, 2vw, 1.25rem);
    font-weight: 400;
    color: var(--text-muted);
    letter-spacing: 0;
    margin-top: 1.5rem;
  }
`

const Accent = styled.span`
  color: var(--accent);
  font-style: italic;
`

const ScrollCue = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--text-muted);
`
