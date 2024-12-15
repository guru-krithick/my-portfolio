"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function ResumeManagement() {
  const [resumeUrl, setResumeUrl] = useState('')
  const { toast } = useToast()

  const updateResumeUrl = () => {
    // Here you would typically update the resume URL in your backend
    console.log('Updating resume URL:', resumeUrl)
    toast({
      title: "Resume URL updated",
      description: "The resume URL has been successfully updated.",
    })
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Resume Management</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Update Resume URL</h2>
        <div className="flex gap-4">
          <div className="flex-grow">
            <Label htmlFor="resumeUrl" className="sr-only">Resume URL</Label>
            <Input
              id="resumeUrl"
              placeholder="Enter new resume URL"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
            />
          </div>
          <Button onClick={updateResumeUrl} className="bg-blue-600 hover:bg-blue-700">Update Resume URL</Button>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Current Resume</h2>
        <p>Current resume URL: {resumeUrl || 'Not set'}</p>
      </div>
    </div>
  )
}

