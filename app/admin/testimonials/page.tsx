"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/admin/data-table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  company: string
  content: string
}

const initialTestimonials: Testimonial[] = [
  { id: 1, name: "John Doe", company: "Company A", content: "Great work!" },
  { id: 2, name: "Jane Smith", company: "Company B", content: "Excellent developer!" },
]

export default function TestimonialsManagement() {
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [newTestimonial, setNewTestimonial] = useState<Omit<Testimonial, 'id'>>({ name: '', company: '', content: '' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const columns = [
    { header: "Name", accessorKey: "name" },
    { header: "Company", accessorKey: "company" },
    { header: "Content", accessorKey: "content" },
  ]

  const handleAddTestimonial = () => {
    setTestimonials([...testimonials, { id: Date.now(), ...newTestimonial }])
    setNewTestimonial({ name: '', company: '', content: '' })
    setIsDialogOpen(false)
  }

  const handleEditTestimonial = (testimonial: Testimonial) => {
    // Implement edit logic
  }

  const handleDeleteTestimonial = (testimonial: Testimonial) => {
    setTestimonials(testimonials.filter(t => t.id !== testimonial.id))
  }

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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input
                  id="name"
                  value={newTestimonial.name}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="company" className="text-right">Company</Label>
                <Input
                  id="company"
                  value={newTestimonial.company}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="content" className="text-right">Content</Label>
                <Textarea
                  id="content"
                  value={newTestimonial.content}
                  onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddTestimonial}>Add Testimonial</Button>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        data={testimonials}
        columns={columns}
        onEdit={handleEditTestimonial}
        onDelete={handleDeleteTestimonial}
      />
    </div>
  )
}

