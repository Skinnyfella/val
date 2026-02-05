"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"

interface ValentineCardProps {
  onBack?: () => void
}

export default function ValentineCard({ onBack }: ValentineCardProps) {
  const [selectedResponse, setSelectedResponse] = useState<"yes" | "no" | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Your Google Apps Script Web app URL (from step 3 in previous instructions)
  // Replace this with your real /exec URL!
  const SCRIPT_URL = "https://script.google.com/macros/s/YOUR_LONG_UNIQUE_ID_HERE/exec";

  // Play music when card opens
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Music autoplay prevented:", error)
      })
    }
  }, [])

  // Debug audio element
  useEffect(() => {
    setTimeout(() => {
      if (audioRef.current) {
        console.log("Audio src:", audioRef.current.src)
        console.log("Audio canPlayType:", audioRef.current.canPlayType("audio/mpeg"))
      }
    }, 500)
  }, [])

  // Pause music when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  const handleResponse = async (response: "yes" | "no") => {
    setSelectedResponse(response)

    try {
      // Send the response to Google Apps Script
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Use this to avoid CORS issues (data still sends!)
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ response }) // Sends { response: "yes" } or "no"
      })

      // Optional: Log success for debugging
      console.log(`Response sent to Sheet: ${response}`)
    } catch (err) {
      console.error("Error sending response:", err)
      // You can still show the UI feedback even if send fails
    }

    if (response === "yes") {
      setShowConfetti(true)
    }
  }

  return (
    <motion.div
      className="relative"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background music */}
      <audio ref={audioRef} loop src="/valentine-music.mp3"></audio>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md">
        {/* Decorative hearts */}
        <div className="flex justify-center space-x-3 mb-6">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            >
              💕
            </motion.span>
          ))}
        </div>

        {/* Main message */}
        <div className="text-center mb-8">
          <p className="font-serif text-rose-600 text-lg mb-4">Dear Riri,</p>
          <p className="text-gray-700 font-light leading-relaxed mb-4">
            I know Valentine’s Day isn’t really my thing, but I’d actually love to take you out that day. Go arcade , dinner, an open air cinema then party later.
          </p>
          <p className="text-gray-700 font-light leading-relaxed mb-6">
            Just us spending time together   So this is me officially asking, will you go out with me?
          </p>

          {/* Big question */}
          
        </div>

        {/* Response buttons */}
        {selectedResponse === null ? (
          <div className="flex gap-4 justify-center">
            <motion.button
              onClick={() => handleResponse("yes")}
              className="px-8 py-3 bg-rose-500 text-white rounded-full font-semibold shadow-lg hover:bg-rose-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Yes 💖
            </motion.button>
            <motion.button
              onClick={() => handleResponse("no")}
              className="px-8 py-3 bg-gray-300 text-gray-700 rounded-full font-semibold shadow-lg hover:bg-gray-400 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              No 🙈
            </motion.button>
          </div>
        ) : selectedResponse === "yes" ? (
          <motion.div className="text-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <p className="text-3xl mb-4">🎉</p>
            <p className="font-serif text-2xl text-rose-600 mb-4">You've made me the happiest! 💕</p>
            <p className="text-gray-600 font-light">I can't wait to celebrate with you. Happy Valentine's Day! 🌹</p>
          </motion.div>
        ) : (
          <motion.div className="text-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <p className="text-2xl mb-4">🙈</p>
            <p className="text-gray-600 font-light">That's okay! But I'll keep hoping. 💕</p>
          </motion.div>
        )}
      </div>

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="fixed text-3xl"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -50,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight,
                opacity: 0,
              }}
              transition={{
                duration: 2 + Math.random(),
                delay: Math.random() * 0.3,
              }}
            >
              {["💕", "🌹", "✨", "💫", "🎉"][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}