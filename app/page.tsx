"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import WelcomeOverlay from "@/components/welcome-overlay"
import EnvelopeCard from "@/components/envelope-card"
import AnimatedHearts from "@/components/animated-hearts"

export default function Page() {
  const [showOverlay, setShowOverlay] = useState(true)

  useEffect(() => {
    // Overlay closes after typing animation completes (approximately 4.5 seconds)
    const timer = setTimeout(() => {
      setShowOverlay(false)
    }, 4500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 flex items-center justify-center">
      <AnimatedHearts />

      <AnimatePresence>{showOverlay && <WelcomeOverlay onComplete={() => setShowOverlay(false)} />}</AnimatePresence>

      <AnimatePresence mode="wait">
        {!showOverlay && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <EnvelopeCard />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
