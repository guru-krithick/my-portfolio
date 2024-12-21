'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Toaster } from "@/components/ui/toaster"
import { Sidebar } from '@/components/admin/AdminSidebar'
import { Button } from "@/components/ui/button"
import { logout } from '@/lib/api'
import { useToast } from "@/hooks/use-toast"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token && pathname !== '/admin/auth') {
      router.push('/admin/auth')
    } else if (token && pathname === '/admin/auth') {
      router.push('/admin')
    } else {
      setIsAuthenticated(!!token)
    }
  }, [router, pathname])

  const handleLogout = async () => {
    try {
      await logout()
      localStorage.removeItem('adminToken')
      setIsAuthenticated(false)
      router.push('/admin/auth')
      toast({
        title: "Success",
        description: "Logged out successfully",
      })
    } catch (error) {
      console.error('Logout error:', error)
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      })
    }
  }

  if (isAuthenticated === null) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated && pathname !== '/admin/auth') {
    return <>{children}</>
  }

  if (pathname === '/admin/auth') {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
