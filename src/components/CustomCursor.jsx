import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    if (!dot || !ring || !glow) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top  = mouseY + 'px'
      glow.style.left = mouseX + 'px'
      glow.style.top  = mouseY + 'px'
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.left = ringX + 'px'
      ring.style.top  = ringY + 'px'
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    const onEnter = () => setHovering(true)
    const onLeave = () => setHovering(false)

    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    window.addEventListener('mousemove', onMove, { passive: true })

    // Observe DOM for new interactive elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={glowRef} className="mouse-glow" />
      <div ref={dotRef}  className={`cursor-dot  ${hovering ? 'hovering' : ''}`} />
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  )
}
