"use client"

import { motion } from "framer-motion"

interface EnvelopeProps {
  onOpen: () => void
}

export default function Envelope({ onOpen }: EnvelopeProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center space-y-8"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="relative w-96 h-60 cursor-pointer"
        initial={{ rotateX: 0 }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
      >
        {/* Envelope body */}
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full drop-shadow-2xl"
          style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))" }}
        >
          {/* Outer envelope */}
          <defs>
            <linearGradient id="envelopeBg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: "#FEF3C7", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#F3D5A5", stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          {/* Main envelope body */}
          <rect x="20" y="80" width="360" height="200" fill="url(#envelopeBg)" stroke="#D4AF37" strokeWidth="2" />

          {/* Envelope flap top triangle */}
          <polygon points="20,80 200,30 380,80" fill="#FCD34D" stroke="#D4AF37" strokeWidth="2" />

          {/* Left flap edge */}
          <polygon points="20,80 200,30 200,80" fill="#F59E0B" opacity="0.3" />

          {/* Decorative lines on flap */}
          <line x1="80" y1="55" x2="120" y2="80" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />
          <line x1="320" y1="55" x2="280" y2="80" stroke="#D4AF37" strokeWidth="1" opacity="0.5" />

          {/* Center fold line */}
          <line x1="200" y1="80" x2="200" y2="280" stroke="#D4AF37" strokeWidth="1" opacity="0.3" strokeDasharray="5" />
        </svg>

        {/* Wax seal positioned on envelope */}
        <motion.button
          onClick={onOpen}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 focus:outline-none"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="relative w-24 h-24 cursor-pointer"
            animate={{
              boxShadow: [
                "0 10px 30px rgba(220, 38, 38, 0.4), inset 0 -2px 5px rgba(0,0,0,0.3)",
                "0 15px 40px rgba(220, 38, 38, 0.6), inset 0 -2px 5px rgba(0,0,0,0.3)",
                "0 10px 30px rgba(220, 38, 38, 0.4), inset 0 -2px 5px rgba(0,0,0,0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {/* Wax seal circle background */}
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <defs>
                <radialGradient id="sealGradient" cx="35%" cy="35%">
                  <stop offset="0%" style={{ stopColor: "#DC2626", stopOpacity: 1 }} />
                  <stop offset="70%" style={{ stopColor: "#991B1B", stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: "#7F1D1D", stopOpacity: 1 }} />
                </radialGradient>
              </defs>

              {/* Main seal circle */}
              <circle cx="50" cy="50" r="48" fill="url(#sealGradient)" stroke="#5F0F0F" strokeWidth="2" />

              {/* Decorative rope/string border */}
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#FCD34D"
                strokeWidth="1"
                opacity="0.6"
                strokeDasharray="2,3"
              />

              {/* Heart symbol in center */}
              <g transform="translate(50, 50)">
                <path
                  d="M 0,-8 C -8,-15 -18,-15 -18,-5 C -18,5 0,18 0,18 C 0,18 18,5 18,-5 C 18,-15 8,-15 0,-8 Z"
                  fill="#FCD34D"
                  stroke="#F59E0B"
                  strokeWidth="0.5"
                />
              </g>

              {/* Shine/gloss effect */}
              <ellipse cx="35" cy="30" rx="12" ry="10" fill="white" opacity="0.3" />
            </svg>
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Hint text */}
      <motion.p
        className="text-center text-rose-600 font-light italic"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        Click the seal to open
      </motion.p>
    </motion.div>
  )
}
