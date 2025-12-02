import { useEffect, useRef } from 'react'

interface PortfolioMeaningProps {
  mousePosition: { x: number; y: number }
  scrollY: number
}

export default function PortfolioMeaning({ scrollY }: PortfolioMeaningProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    if (!section || !text) return

    // Calculate scroll progress based on viewport height (same as cube animation)
    // Text appears when cube starts moving (at 0.2 viewport height)
    const viewportHeight = window.innerHeight
    const scrollStart = viewportHeight * 0.2  // Same as cube animation start
    const scrollEnd = viewportHeight * 0.8    // Same as cube animation end
    const scrollProgress = Math.max(0, Math.min(1, (scrollY - scrollStart) / (scrollEnd - scrollStart)))
    
    // Show text immediately when cube starts moving (much earlier)
    if (scrollProgress > 0.1) {
      text.classList.add('visible')
    } else {
      text.classList.remove('visible')
    }
  }, [scrollY])

  return (
    <section ref={sectionRef} className="portfolio-meaning-section">
      <div className="portfolio-meaning-content">
      <div ref={textRef} className="portfolio-meaning-text">
        <p className="meaning-line meaning-line-1">
        0s & 1s,
        </p>
        <p className="meaning-line meaning-line-1">
        form the foundation of every space I create,
        </p>
        <p className="meaning-line meaning-line-2">
          and light gives that space shape and intention.
        </p>
        <p className="meaning-line meaning-line-3">
          Through this digital interaction,
        </p>
        <p className="meaning-line meaning-line-4">
        I build environments that become meaningful,
        </p>
        <p className="meaning-line meaning-line-4">
        transformative spaces for the user.
        </p>
      </div>
      </div>
    </section>
  )
}

