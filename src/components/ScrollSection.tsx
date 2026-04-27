import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from 'styled-components'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------
 * SCROLL SECTION
 * ------------------------------------------------------------------
 * What this demonstrates:
 *   - ScrollTrigger with `scrub: true` = animation tied to scroll position
 *   - Pinning a section while the user scrolls
 *
 * `scrub: true' means "play the animation forward when scrolling down,
 * and backward when scrolling up". The animation progress is locked
 * to the user's scroll progress.
 * ------------------------------------------------------------------ */

function ScrollSection() {
  const container = useRef(null)

  useGSAP(
    () => {
      // Animates the big rotating square as the user scrolls through this section
      gsap.to('.scroll-shape', {
        rotation: 360,
        scale: 1.4,
        backgroundColor: '#ff5e6c',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=1200',         // animation lasts 1200px of scroll
          scrub: 1,              // tie animation to scroll, with 1s smoothing
          pin: true,             // keep this section pinned in viewport while scrolling
        },
      })

      // Fade and move the labels independently
      gsap.to('.scroll-label', {
        x: 200,
        opacity: 0.3,
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=1200',
          scrub: 1,
        },
      })

      gsap.from('.scroll-progress-fill', {
        scaleX: 0,
        transformOrigin: 'left center',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: '+=1200',
          scrub: 1,
        },
      })
    },
    { scope: container },
  )

  return (
    <Section ref={container}>
      <Pinned>
        <Eyebrow>1st Animation: ScrollTrigger</Eyebrow>
        <Title>Ties animation <Accent>directly</Accent> to scroll</Title>

        <ShapeWrap>
          <Shape className="scroll-shape" />
        </ShapeWrap>

        <Labels>
          <Label className="scroll-label">scrub</Label>
          <Label className="scroll-label">pin</Label>
          <Label className="scroll-label">progress</Label>
        </Labels>

        <ProgressBar>
          <ProgressFill className="scroll-progress-fill" />
        </ProgressBar>

        <Hint>↓ keep scrolling — the square rotates with you</Hint>
      </Pinned>
    </Section>
  )
}

export default ScrollSection

// ------------------ STYLING ------------------ 

const Section = styled.section`
  position: relative;
`

const Pinned = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 2rem;
  background: var(--bg);
`

const Eyebrow = styled.div`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent);
  letter-spacing: 0.05em;
`

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  text-align: center;
  max-width: 800px;
`

const Accent = styled.span`
  color: var(--accent);
  font-style: italic;
`

const ShapeWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`

const Shape = styled.div`
  width: 120px;
  height: 120px;
  background: var(--accent);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(136, 206, 2, 0.3);
`

const Labels = styled.div`
  display: flex;
  gap: 2rem;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--text-muted);
`

const Label = styled.div`
  padding: 0.4rem 0.9rem;
  border: 1px solid var(--border);
  border-radius: 999px;
`

const ProgressBar = styled.div`
  width: min(400px, 80vw);
  height: 4px;
  background: var(--border);
  border-radius: 2px;
  overflow: hidden;
`

const ProgressFill = styled.div`
  width: 100%;
  height: 100%;
  background: var(--accent);
`

const Hint = styled.div`
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 1rem;
`
