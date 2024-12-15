"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/admin/data-table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from 'lucide-react'

interface Project {
  id: number
  title: string
  subtitle: string
  githubUrl: string
  liveUrl: string
  image: string
}

const initialProjects: Project[] = [
  { id: 1, title: "Project 1", subtitle: "Subtitle 1", githubUrl: "https://github.com/1", liveUrl: "https://live1.com", image: "/image1.jpg" },
  { id: 2, title: "Project 2", subtitle: "Subtitle 2", githubUrl: "https://github.com/2", liveUrl: "https://live2.com", image: "/image2.jpg" },
]

export default function ProjectsManagement() {
  const [projects, setProjects] = useState(initialProjects)
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({ title: '', subtitle: '', githubUrl: '', liveUrl: '', image: '' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const columns = [
    { header: "Title", accessorKey: "title" },
    { header: "Subtitle", accessorKey: "subtitle" },
    { header: "GitHub URL", accessorKey: "githubUrl" },
    { header: "Live URL", accessorKey: "liveUrl" },
  ]

  const handleAddProject = () => {
    setProjects([...projects, { id: Date.now(), ...newProject }])
    setNewProject({ title: '', subtitle: '', githubUrl: '', liveUrl: '', image: '' })
    setIsDialogOpen(false)
  }

  const handleEditProject = (project: Project) => {
    // Implement edit logic
  }

  const handleDeleteProject = (project: Project) => {
    setProjects(projects.filter(p => p.id !== project.id))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" /> Create Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="subtitle" className="text-right">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={newProject.subtitle}
                  onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="githubUrl" className="text-right">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  value={newProject.githubUrl}
                  onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="liveUrl" className="text-right">Live URL</Label>
                <Input
                  id="liveUrl"
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">Image URL</Label>
                <Input
                  id="image"
                  value={newProject.image}
                  onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleAddProject}>Add Project</Button>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable
        data={projects}
        columns={columns}
        onEdit={handleEditProject}
        onDelete={handleDeleteProject}
      />
    </div>
  )
}

