"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface WelcomeOverlayProps {
  onComplete: () => void
}

export default function WelcomeOverlay({ onComplete }: WelcomeOverlayProps) {
  const [displayedText, setDisplayedText] = useState("")
  const fullText = "To a special someone 💕"
  const typingDuration = 3.5 // seconds

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000
      const progress = Math.min(elapsed / typingDuration, 1)
      const charCount = Math.floor(progress * fullText.length)
      setDisplayedText(fullText.slice(0, charCount))

      if (progress >= 1) {
        clearInterval(interval)
        setTimeout(onComplete, 1000) // Wait 1 second before fading out
      }
    }, 30)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <h1 className="[font-family:var(--font-cursive)] text-6xl md:text-7xl text-white font-light tracking-wide text-balance min-h-20">
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
            className="ml-1"
          >
            |
          </motion.span>
        </h1>
      </div>
    </motion.div>
  )
}
