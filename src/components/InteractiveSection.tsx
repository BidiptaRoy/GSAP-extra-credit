import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import styled from 'styled-components'

/* ------------------------------------------------------------------
 * INTERACTIVE SECTION
 * ------------------------------------------------------------------
 * What this demonstrates:
 *   - Triggering GSAP animations from React event handlers
 *   - useGSAP() with contextSafe so cleanup still works correctly
 *
 * The contextSafe() helper wraps event-handler animations so GSAP
 * tracks them and cleans them up when the component unmounts.
 * ------------------------------------------------------------------ */

function InteractiveSection() {
  const container = useRef(null)
  const ballRef = useRef(null)
  const [count, setCount] = useState(0) //to set count how many times a man/woman bounces their ball

  // useGSAP utilizes contextSafe for animations triggered from event handlers.
  const { contextSafe } = useGSAP({ scope: container })

  // Bounce the ball on click
  const handleBounce = contextSafe(() => {
    setCount((c) => c + 1)

    // gsap.to() animates an element TO a new state
    gsap.to(ballRef.current, {
      keyframes: [
        { y: -120, duration: 0.4, ease: 'power2.out' },
        { y: 0,    duration: 0.4, ease: 'bounce.out' },
      ],
    })
  })

  // Random spin
  const handleSpin = contextSafe(() => {
    gsap.to(ballRef.current, {
      rotation: '+=360',
      duration: 0.6,
      ease: 'power2.inOut',
    })
  })

  // Color flash
  const handleFlash = contextSafe(() => {
    gsap.to(ballRef.current, {
      backgroundColor: '#ff5e6c',
      duration: 0.2,
      yoyo: true,        // play forward, then reverse
      repeat: 1,         // only once
    })
  })

  return (
    <Section ref={container}>
      <Header>
        <Eyebrow>3rd and Final Animation: Interactive Ball!</Eyebrow>
        <Title>Animations on demand</Title>
        <Sub>Hook up GSAP to click handlers, hover states, form events — anything. Try the buttons below.</Sub>
      </Header>

      <Playground>
        <Stage>
          <Ball ref={ballRef} />
        </Stage>

        <Controls>
          <Button onClick={handleBounce}>
            <Icon>⬆</Icon> Bounce
          </Button>
          <Button onClick={handleSpin}>
            <Icon>↻</Icon> Spin
          </Button>
          <Button onClick={handleFlash}>
            <Icon>✦</Icon> Flash
          </Button>
        </Controls>

        <Counter>bounces: <CounterValue>{count}</CounterValue></Counter>
      </Playground>
    </Section>
  )
}

export default InteractiveSection

// ------------------ styled-components ------------------ 

const Section = styled.section`
  padding: 8rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  margin-bottom: 4rem;
  max-width: 720px;
`

const Eyebrow = styled.div`
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--accent);
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
`

const Title = styled.h2`
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
  margin-bottom: 1rem;
`

const Sub = styled.p`
  font-size: 1.125rem;
  color: var(--text-muted);
`

const Playground = styled.div`
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`

const Stage = styled.div`
  height: 220px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  border-bottom: 1px dashed var(--border);
  padding-bottom: 1rem;
`

const Ball = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 12px 40px rgba(136, 206, 2, 0.4);
`

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: var(--bg);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.1s ease;

  &:hover {
    border-color: var(--accent);
  }

  &:active {
    transform: translateY(1px);
  }
`

const Icon = styled.span`
  font-family: var(--font-mono);
  color: var(--accent);
`

const Counter = styled.div`
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--text-muted);
`

const CounterValue = styled.span`
  color: var(--accent);
  font-weight: 600;
`
