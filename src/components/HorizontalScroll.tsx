import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styled from 'styled-components'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------
 * HORIZONTAL SCROLL
 * ------------------------------------------------------------------
 * Pin a section in place. As the user scrolls DOWN, translate an
 * inner "track" sideways so panels slide in from the right.
 *
 * The whole trick:
 *   distance = track.scrollWidth - window.innerWidth
 *   animate track.x from 0 → -distance
 *   tie it to scroll with `scrub`
 * ------------------------------------------------------------------ */

const panels = [
  { num: '01', label: 'PIN' },
  { num: '02', label: 'SCRUB' },
  { num: '03', label: 'TRANSLATE' },
]

function HorizontalScroll() {
  const container = useRef<HTMLDivElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const trackEl = track.current
      const containerEl = container.current
      if (!trackEl || !containerEl) 
        return

      // How far the track needs to move = its full width minus one viewport
      const getDistance = () => trackEl.scrollWidth - window.innerWidth

      gsap.to(trackEl, {
        x: () => -getDistance(),
        ease: 'none', // linear progress should matches scroll exactly
        scrollTrigger: {
          trigger: containerEl,
          pin: true,                        // hold section in place
          scrub: 1,                          // tie to scroll, with smoothing. It would feel robotic-like otherwise and would not look good
          end: () => `+=${getDistance()}`,   // scroll length = track distance
          invalidateOnRefresh: true,         // recalc on window resize
          //the three lines above is basically the horizontal entire animation
        },
      })
    },
    { scope: container },
  )

  return (
    <Section ref={container}>
      <Track ref={track}>
        <IntroPanel>
          <SmallLabel>2nd Animation: HORIZONTAL SCROLL</SmallLabel>
          <Big>scroll <Accent>down</Accent>
            <br /> 
          </Big>move <Accent>sideways</Accent>
          <Hint>↓ keep going →</Hint>
        </IntroPanel>

        {panels.map((p, i) => (
          <Panel key={p.num} $alt={i % 2 === 1}>
            <BigNum>{p.num}</BigNum>
            <BigLabel>{p.label}</BigLabel>
          </Panel>
        ))}

        <EndPanel>
          <SmallLabel>Ni Hao</SmallLabel>
          <Big><Accent>magic</Accent>, right?</Big>
        </EndPanel>
      </Track>
    </Section>
  )
}

export default HorizontalScroll

// ------------------ STYLING ------------------ 

const Section = styled.section`
  height: 100vh;
  overflow: hidden;
  position: relative;
`

const Track = styled.div`
  display: flex;
  width: max-content;
  height: 100vh;
  will-change: transform;
`

const IntroPanel = styled.div`
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 6vw;
  gap: 1.5rem;
  background: var(--bg);
  border-right: 1px solid var(--border);
`

const Panel = styled.div<{ $alt?: boolean }>`
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: ${(p) => (p.$alt ? 'var(--bg-elevated)' : 'var(--bg)')};
  border-right: 1px solid var(--border);
`

const EndPanel = styled.div`
  width: 100vw;
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: radial-gradient(ellipse at center, var(--accent-soft), var(--bg) 70%);
`

const SmallLabel = styled.div`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent);
  letter-spacing: 0.1em;
`

const Big = styled.h2`
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 0.95;
`

const Accent = styled.span`
  color: var(--accent);
  font-style: italic;
`

const Hint = styled.div`
  font-family: var(--font-mono);
  font-size: 0.95rem;
  color: var(--text-muted);
`

const BigNum = styled.div`
  font-family: var(--font-mono);
  font-size: clamp(4rem, 14vw, 14rem);
  color: var(--accent);
  font-weight: 700;
  line-height: 1;
`

const BigLabel = styled.div`
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 5rem);
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--text);
`