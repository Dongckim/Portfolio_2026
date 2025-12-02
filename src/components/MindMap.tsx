import { useState, useEffect, useRef } from 'react'

export default function MindMap() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return
      
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Show when element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        setIsVisible(true)
      }
    }

    // Check initial visibility
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    setIsExpanded(!isExpanded)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(false)
  }

  return (
    <>
      <div 
        ref={containerRef}
        className={`mindmap-container ${isVisible ? 'visible' : ''}`} 
        onClick={handleClick}
      >
        <img 
          src="/mindmap.jpg" 
          alt="Mind Map" 
          className="mindmap-image"
          onLoad={() => setIsVisible(true)}
        />
        <div className="mindmap-overlay">
          <span className="mindmap-hint">Click to expand</span>
        </div>
      </div>

      {isExpanded && (
        <div className="mindmap-modal" onClick={handleClose}>
          <div className="mindmap-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="mindmap-close" onClick={handleClose}>×</button>
            <img 
              src="/mindmap.jpg" 
              alt="Mind Map - Expanded" 
              className="mindmap-modal-image"
            />
          </div>
        </div>
      )}
    </>
  )
}

