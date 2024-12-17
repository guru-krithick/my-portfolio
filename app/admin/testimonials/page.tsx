/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from 'react'
import { getTestimonials, createTestimonial, deleteTestimonial } from '@/lib/api'
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface Testimonial {
  _id: string
  name: string
  designation: string
  rating: number
  recommendation: string
  image: string
}

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, '_id'>>({
    name: '',
    designation: '',
    rating: 5,
    recommendation: '',
    image: ''
  })
  const { toast } = useToast()

  useEffect(() => {
    fetchTestimonials()
  }, [page])

  const fetchTestimonials = async () => {
    try {
      const { testimonials, totalPages } = await getTestimonials(page)
      setTestimonials(testimonials)
      setTotalPages(totalPages)
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      toast({
        title: "Error",
        description: "Failed to fetch testimonials",
        variant: "destructive",
      })
    }
  }

  const handleCreateTestimonial = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      Object.entries(newTestimonial).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, value.toString())
        }
      })
      await createTestimonial(formData)
      setIsDialogOpen(false)
      setNewTestimonial({
        name: '',
        designation: '',
        rating: 5,
        recommendation: '',
        image: ''
      })
      fetchTestimonials()
      toast({
        title: "Success",
        description: "Testimonial created successfully",
      })
    } catch (error) {
      console.error('Error creating testimonial:', error)
      toast({
        title: "Error",
        description: "Failed to create testimonial",
        variant: "destructive",
      })
    }
  }

  const handleDeleteTestimonial = async (id: string) => {
    try {
      await deleteTestimonial(id)
      fetchTestimonials()
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      })
    }
  }

  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Designation", accessorKey: "designation" },
    { header: "Rating", accessorKey: "rating" },
    { header: "Recommendation", accessorKey: "recommendation" },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Testimonials Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Create Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Testimonial</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateTestimonial} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  value={newTestimonial.designation}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, designation: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  value={newTestimonial.rating}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="recommendation">Recommendation</Label>
                <Textarea
                  id="recommendation"
                  value={newTestimonial.recommendation}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, recommendation: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, image: e.target.files?.[0] || '' })}
                  required
                />
              </div>
              <Button type="submit">Add Testimonial</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        data={testimonials}
        columns={columns}
        onDelete={handleDeleteTestimonial}
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

