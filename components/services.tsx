"use client"

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Code, Palette, Globe, Smartphone } from 'lucide-react'

const services = [
  {
    title: "Web Development",
    description: "Creating responsive and performant web applications using modern technologies.",
    icon: Globe
  },
  {
    title: "UI/UX Design",
    description: "Designing intuitive and visually appealing user interfaces for optimal user experience.",
    icon: Palette
  },
  {
    title: "Mobile App Development",
    description: "Building cross-platform mobile applications for iOS and Android devices.",
    icon: Smartphone
  },
  {
    title: "Custom Software Solutions",
    description: "Developing tailored software solutions to meet specific business needs.",
    icon: Code
  }
]

export default function Services() {
  return (
    <section id="services" className="py-24 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 gradient-text font-playfair"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-lift">
                <CardHeader>
                  <service.icon className="w-12 h-12 mb-4 text-primary" />
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

