"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Card } from '../ui/card'

gsap.registerPlugin(ScrollTrigger)

const education = [
  {
    year: "2023 - 2027",
    degree: "Bachelor of Engineering in Electronics and Communication",
    institution: "Chennai Institute of Technology",
    description: "Currently pursuing my degree"
  },
  {
    year: "2023",
    degree: "Higher Secondary Certificate (HSC) in Maths & Computer Science",
    institution: "Doveton Boys Hr Sec School",
    description: "Graduated with high marks"
  },
  {
    year: "2021",
    degree: "Secondary School Leaving Certificate (SSLC)",
    institution: "Doveton Boys Hr Sec School",
    description: "Completed with distinction"
  }
  
]

export default function EducationTimeline() {
  const timelineRef = useRef(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const timeline = timelineRef.current
    const cards = cardsRef.current

    gsap.fromTo(
      timeline,
      { scaleY: 0 },
      {
        scaleY: 1,
        transformOrigin: "top",
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timeline,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse"
        }
      }
    )

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top center+=100",
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }, [])

  return (
    <section id="experience" className="py-24 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-ephesis text-6xl font-medium text-gray-900 dark:text-gray-100text-center mb-12 items-start">My{" "}
          <span className="font-playfair text-5xl text-primary font-bold">Education</span></h2>
        <div className="relative max-w-4xl mx-auto">
          <div
            ref={timelineRef}
            className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-primary"
          />
          {education.map((item, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              <Card className={`w-[calc(50%-2rem)] p-6 ${
                index % 2 === 0 ? 'mr-8' : 'ml-8'
              }`}>
                <span className="text-sm font-medium text-primary font-charm">
                  {item.year}
                </span>
                <h3 className="text-xl font-bold font-playfair mt-2">
                  {item.degree}
                </h3>
                <p className="text-muted-foreground font-poppins mt-1">
                  {item.institution}
                </p>
                <p className="mt-2 text-sm font-poppins">
                  {item.description}
                </p>
              </Card>
              <div className="absolute left-[calc(50%-0.5rem)] w-4 h-4 rounded-full bg-primary" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

