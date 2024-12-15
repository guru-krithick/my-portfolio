"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/admin/data-table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react'

interface Certification {
  id: number
  title: string
  issuer: string
  date: string
  url: string
}

const initialCertifications: Certification[] = [
  { id: 1, title: "Certification 1", issuer: "Issuer 1", date: "2023-01-01", url: "https://cert1.com" },
  { id: 2, title: "Certification 2", issuer: "Issuer 2", date: "2023-02-01", url: "https://cert2.com" },
]

export default function CertificationsManagement() {
  const [certifications, setCertifications] = useState(initialCertifications)
  const [newCertification, setNewCertification] = useState<Omit<Certification, 'id'>>({ title: '', issuer: '', date: '', url: '' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const columns = [
    { header: "Title", accessorKey: "title" },
    { header: "Issuer", accessorKey: "issuer" },
    { header: "Date", accessorKey: "date" },
    { header: "URL", accessorKey: "url" },
  ]

  const handleAddCertification = () => {
    setCertifications([...certifications, { id: Date.now(), ...newCertification }])
    setNewCertification({ title: '', issuer: '', date: '', url: '' })
    setIsDialogOpen(false)
  }

  const handleEditCertification = (certification: Certification) => {
    // Implement edit logic
  }

  const handleDeleteCertification = (certification: Certification) => {
    setCertifications(certifications.filter(c => c.id !== certification.id))
  }

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
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input
                  id="title"
                  value={newCertification.title}
                  onChange={(e) => setNewCertification({ ...newCertification, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="issuer" className="text-right">Issuer</Label>
                <Input
                  id="issuer"
                  value={newCertification.issuer}
                  onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newCertification.date}
                  onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="url" className="text-right">URL</Label>
                <Input
                  id="url"
                  value={newCertification.url}
                  onChange={(e) => setNewCertification({ ...newCertification, url: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddCertification}>Add Certification</Button>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        data={certifications}
        columns={columns}
        onEdit={handleEditCertification}
        onDelete={handleDeleteCertification}
      />
    </div>
  )
}

