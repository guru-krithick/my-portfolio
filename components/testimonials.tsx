"use client"

import { motion, useMotionValue } from 'framer-motion'
import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const testimonials = [
  {
    name: "John Doe",
    title: "CEO, Company A",
    content: "Guru Krithick is an exceptional developer. His work on our project was outstanding."
  },
  {
    name: "Jane Smith",
    title: "CTO, Company B",
    content: "Working with Guru was a pleasure. His technical skills and problem-solving abilities are top-notch."
  },
  // Add more testimonials as needed
]

export default function Testimonials() {
  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef(null)
  const x = useMotionValue(0)

  return (
    <section id="testimonials" className="py-24 bg-muted/50 overflow-hidden">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 font-playfair"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Testimonials
        </motion.h2>
        <motion.div
          ref={constraintsRef}
          className="overflow-hidden cursor-grab active:cursor-grabbing"
        >
          <motion.div
            drag="x"
            dragConstraints={constraintsRef}
            style={{ x }}
            className="flex gap-6"
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="min-w-[300px] md:min-w-[400px]"
                whileHover={{ scale: isDragging ? 1 : 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.title}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{testimonial.content}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

