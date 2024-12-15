'use client';

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from "./ui/button"


export default function AboutMe() {
  return (
    <section id="activity" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-full md:w-1/2"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                          <Image 
                            alt="Guru Krithick" 
                            src="https://avatar.iran.liara.run/public/48" 
                            fill
                            className="object-cover rounded-full bg-card p-4"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20 rounded-full" />
                        </div>
          </motion.div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 font-playfair">About<span className="text-primary font-ephesis text-5xl font-medium "> Myself</span></h2>
            <p className="text-xl font-semibold mb-4">Passionate Developer & Creative Problem Solver</p>
            <p className="text-muted-foreground mb-6">
              I&apos;m a full-stack developer with a passion for creating innovative and user-friendly web applications. 
              With a strong foundation in modern web technologies and a keen eye for design, I strive to build 
              seamless digital experiences that make a difference.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg">
                <a href="#contact">Get in Touch</a>
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
      </div>
    </section>
  )
}

