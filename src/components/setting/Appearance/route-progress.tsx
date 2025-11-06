"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isLoading) {
      timer = setInterval(() => {
        setProgress((prev) => {
          if (prev < 90) return prev + Math.random() * 5
          return prev
        })
      }, 120)
    }

    const handleReady = () => {
      setProgress(100)
      setTimeout(() => setIsLoading(false), 600)
    }

    if (document.readyState === "complete" || document.readyState === "interactive") {
      handleReady()
    } else {
      window.addEventListener("DOMContentLoaded", handleReady)
      window.addEventListener("load", handleReady)
    }

    return () => {
      clearInterval(timer)
      window.removeEventListener("DOMContentLoaded", handleReady)
      window.removeEventListener("load", handleReady)
    }
  }, [isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="progressbar"
          className="fixed top-0 left-0 w-full h-[1.5px] z-9999 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Base progress fill */}
          <motion.div
            className="h-full bg-linear-to-r from-primary/80 via-primary to-primary/80 relative"
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut", duration: 0.3 }}
          >
            {/* Shimmer animation */}
            <motion.div
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/60 to-transparent"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Subtle glow when progress is near completion */}
          {progress > 95 && (
            <motion.div
              className="absolute inset-0 bg-primary/20 blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
