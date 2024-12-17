/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from 'react'
import { getResume, updateResume } from '@/lib/api'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface Resume {
  _id: string
  url: string
  version: number
  lastUpdated: string
}

export default function ResumeManagement() {
  const [resume, setResume] = useState<Resume | null>(null)
  const [newResumeUrl, setNewResumeUrl] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    fetchResume()
  }, [])

  const fetchResume = async () => {
    try {
      const resumeData = await getResume()
      setResume(resumeData)
      setNewResumeUrl(resumeData?.url || '')
    } catch (error) {
      console.error('Error fetching resume:', error)
      toast({
        title: "Error",
        description: "Failed to fetch resume",
        variant: "destructive",
      })
    }
  }

  const handleUpdateResume = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (resume) {
        await updateResume(resume._id, { url: newResumeUrl })
        fetchResume()
        toast({
          title: "Success",
          description: "Resume updated successfully",
        })
      } else {
        // If no resume exists, create a new one
        await updateResume('new', { url: newResumeUrl })
        fetchResume()
        toast({
          title: "Success",
          description: "Resume created successfully",
        })
      }
    } catch (error) {
      console.error('Error updating resume:', error)
      toast({
        title: "Error",
        description: "Failed to update resume",
        variant: "destructive",
      })
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Resume Management</h1>
      <form onSubmit={handleUpdateResume} className="space-y-4">
        <div>
          <Label htmlFor="resumeUrl">Resume URL</Label>
          <Input
            id="resumeUrl"
            value={newResumeUrl}
            onChange={(e) => setNewResumeUrl(e.target.value)}
            placeholder="Enter resume URL"
            required
          />
        </div>
        <Button type="submit">
          {resume ? 'Update Resume' : 'Create Resume'}
        </Button>
      </form>
      {resume && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Current Resume</h2>
          <p>URL: <a href={resume.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{resume.url}</a></p>
          <p>Version: {resume.version}</p>
          <p>Last Updated: {new Date(resume.lastUpdated).toLocaleString()}</p>
        </div>
      )}
    </div>
  )
}

