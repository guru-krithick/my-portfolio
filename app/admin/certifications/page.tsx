/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from 'react'
import { getCertifications, createCertification, updateCertification, deleteCertification } from '@/lib/api'
import { DataTable } from "@/components/admin/DataTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface Certification {
  _id: string
  name: string
  provider: string
  skills: string[]
  url: string
  level: string
  image: string | File
}

export default function CertificationsManagement() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCertification, setNewCertification] = useState<Omit<Certification, '_id'>>({
    name: '',
    provider: '',
    skills: [],
    url: '',
    level: '',
    image: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchCertifications()
  }, [page, search])

  const fetchCertifications = async () => {
    try {
      const { certifications, totalPages } = await getCertifications(search, page) as { certifications: Certification[], totalPages: number }
      setCertifications(certifications)
      setTotalPages(totalPages)
    } catch (error) {
      console.error('Error fetching certifications:', error)
      toast({
        title: "Error",
        description: "Failed to fetch certifications",
        variant: "destructive",
      })
    }
  }

  const handleCreateCertification = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      Object.entries(newCertification).forEach(([key, value]) => {
        if (key === 'skills') {
          formData.append(key, (value as string[]).join(','))
        } else if (key === 'image' && value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, value as string)
        }
      })
      await createCertification(formData)
      setIsDialogOpen(false)
      setNewCertification({
        name: '',
        provider: '',
        skills: [],
        url: '',
        level: '',
        image: ''
      })
      fetchCertifications()
      toast({
        title: "Success",
        description: "Certification created successfully",
      })
    } catch (error) {
      console.error('Error creating certification:', error)
      toast({
        title: "Error",
        description: "Failed to create certification",
        variant: "destructive",
      })
    }
  }

  const handleUpdateCertification = async (certification: Certification) => {
    const { _id, ...certificationData } = certification
    try {
      const formData = new FormData()
      Object.entries(certificationData).forEach(([key, value]) => {
        if (key === 'skills') {
          formData.append(key, (value as string[]).join(','))
        } else if (key === 'image' && value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, value as string)
        }
      })
      await updateCertification(_id, formData)
      fetchCertifications()
      toast({
        title: "Success",
        description: "Certification updated successfully",
      })
    } catch (error) {
      console.error('Error updating certification:', error)
      toast({
        title: "Error",
        description: "Failed to update certification",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCertification = async (certification: Certification) => {
    try {
      await deleteCertification(certification._id)
      fetchCertifications()
      toast({
        title: "Success",
        description: "Certification deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting certification:', error)
      toast({
        title: "Error",
        description: "Failed to delete certification",
        variant: "destructive",
      })
    }
  }

  const columns: { header: string, accessorKey: keyof Certification }[] = [
    { header: "Name", accessorKey: "name" },
    { header: "Provider", accessorKey: "provider" },
    { header: "Level", accessorKey: "level" },
    { header: "URL", accessorKey: "url" },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Certifications Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Create Certification
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Certification</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateCertification} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newCertification.name}
                  onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="provider">Provider</Label>
                <Input
                  id="provider"
                  value={newCertification.provider}
                  onChange={(e) => setNewCertification({ ...newCertification, provider: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  value={newCertification.skills.join(', ')}
                  onChange={(e) => setNewCertification({ ...newCertification, skills: e.target.value.split(',').map(s => s.trim()) })}
                />
              </div>
              <div>
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  value={newCertification.url}
                  onChange={(e) => setNewCertification({ ...newCertification, url: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <Select
                  value={newCertification.level}
                  onValueChange={(value) => setNewCertification({ ...newCertification, level: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => setNewCertification({ ...newCertification, image: e.target.files?.[0] || '' })}
                  required
                />
              </div>
              <Button type="submit">Add Certification</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search certifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable<Certification>
        data={certifications}
        columns={columns}
        onEdit={handleUpdateCertification}
        onDelete={handleDeleteCertification}
      />
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="mx-4">Page {page} of {totalPages}</span>
          <Button
            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}

