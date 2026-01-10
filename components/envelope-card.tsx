"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Envelope from "./envelope"
import ValentineCard from "./valentine-card"

export default function EnvelopeCard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <Envelope key="envelope" onOpen={() => setIsOpen(true)} />
        ) : (
          <ValentineCard key="card" onBack={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
