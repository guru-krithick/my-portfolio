"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
import { Home, Briefcase, Award, MessageSquare, FileText } from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { name: 'Projects', href: '/admin/projects', icon: Briefcase },
  { name: 'Certifications', href: '/admin/certifications', icon: Award },
  { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
  { name: 'Resume', href: '/admin/resume', icon: FileText },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64 bg-white shadow">
      <div className="flex items-center justify-center h-16 border-b">
        <span className="text-2xl font-semibold text-blue-600">Admin Dashboard</span>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="p-4 space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

