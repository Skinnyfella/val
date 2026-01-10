"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function AnimatedHearts() {
  const [isClient, setIsClient] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setIsClient(true)
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }, [])

  const hearts = Array.from({ length: 8 }, (_, i) => i)

  if (!isClient) {
    return <div className="fixed inset-0 pointer-events-none overflow-hidden" />
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-30"
          initial={{
            x: Math.random() * (dimensions.width || 1),
            y: Math.random() * (dimensions.height || 1),
            opacity: 0.3,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: Math.random() * 2,
          }}
        >
          💕
        </motion.div>
      ))}
    </div>
  )
}
