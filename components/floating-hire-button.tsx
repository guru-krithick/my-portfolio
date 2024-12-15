"use client"

import { motion } from 'framer-motion'
import { Button } from './ui/button'

export default function FloatingHireButton() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button asChild size="lg" className="rounded-full shadow-lg">
          <a href="#contact">
            Hire Me
          </a>
        </Button>
      </motion.div>
    </motion.div>
  )
}

