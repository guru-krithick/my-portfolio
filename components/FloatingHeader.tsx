"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useMediaQuery } from '@/hooks/use-media-query'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'
import { ModeToggle } from './Elements/ModeToggle'
import { cn } from '@/lib/utils'
import { Ephesis } from 'next/font/google'

// Import Leckerli One font
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ephesis = Ephesis({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-leckerli',
})

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Activity', href: '#activity' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  // { name: 'About', href: '#about' },
]

export default function FloatingHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const isMobile = useMediaQuery("(max-width: 768px)")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = document.querySelectorAll('section[id]')
      const scrollPosition = window.scrollY + 100 // offset for header

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute('id') || ''

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
  className={cn(
    "fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-2xl shadow-lg backdrop-blur-lg mx-auto max-w-screen-2xl",
    isScrolled
      ? "bg-white/60 dark:bg-black/60 py-3"
      : "bg-white/30 dark:bg-black/30 py-4"
  )}
  initial={{ y: -100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  <nav className="flex items-center justify-between px-4">
    <Link
      href="#home"
      className={cn(
        "text-3xl font-bold hover:text-primary transition-colors text-gray-800 dark:text-gray-100",
        ephesis.variable, // Apply the Charm font
        "font-ephesis"
      )}
    >
      Guru
    </Link>

    {isMobile ? (
      <div className="flex items-center gap-2">
        <ModeToggle />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6 text-gray-800 dark:text-gray-100" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white dark:bg-black">
            <nav className="flex flex-col gap-4 mt-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-lg font-semibold transition-colors px-4 py-2 rounded-lg ",
                    activeSection === item.href.replace('#', '')
                      ? "text-primary"
                      : "text-gray-800 dark:text-gray-100 hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="mt-4 w-full" asChild>
                <Link href="#contact">Hire Me</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    ) : (
      <div className="flex items-center gap-6 ">
        <nav className="flex items-center gap-6 ">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-base font-semibold transition-colors relative font-poppins",
                activeSection === item.href.replace('#', '')
                  ? "text-primary"
                  : "text-gray-800 dark:text-gray-100 hover:text-primary",
                  "font-poppins"
              )}
            >
              {item.name}
              {activeSection === item.href.replace('#', '') && (
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeSection"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Button
            className="rounded-full px-5 hover:scale-105 transition-transform font-semibold"
            asChild
          >
            <Link href="#contact">Hire Me</Link>
          </Button>
        </div>
      </div>
    )}
  </nav>
</motion.header>
  )
}
