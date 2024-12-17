"use client"

import { useState, useEffect, useCallback } from 'react'
import { getProjects, createProject, updateProject, deleteProject } from '@/lib/api'
import { DataTable } from "@/components/admin/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface Project {
  _id: string
  title: string
  subtitle: string
  description: string
  image: string | File
  githubUrl: string
  liveUrl: string
  skills: string[]
}

interface ApiResponse {
  projects: Project[]
  totalPages: number
}

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([])
  const [totalPages, setTotalPages] = useState<number>(0)
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [newProject, setNewProject] = useState<Omit<Project, '_id'>>({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    githubUrl: '',
    liveUrl: '',
    skills: []
  })
  const { toast } = useToast()

  const fetchProjects = useCallback(async () => {
    try {
      const { projects, totalPages } = await getProjects(search, page) as ApiResponse
      setProjects(projects)
      setTotalPages(totalPages)
    } catch (error) {
      console.error('Error fetching projects:', error)
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      })
    }
  }, [search, page, toast])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      Object.entries(newProject).forEach(([key, value]) => {
        if (key === 'skills') {
          formData.append(key, (value as string[]).join(','))
        } else if (key === 'image' && value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, value as string)
        }
      })
      await createProject(formData)
      setIsDialogOpen(false)
      setNewProject({
        title: '',
        subtitle: '',
        description: '',
        image: '',
        githubUrl: '',
        liveUrl: '',
        skills: []
      })
      fetchProjects()
      toast({
        title: "Success",
        description: "Project created successfully",
      })
    } catch (error) {
      console.error('Error creating project:', error)
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      })
    }
  }

  const handleUpdateProject = async (id: string, projectData: Partial<Project>) => {
    try {
      const formData = new FormData()
      Object.entries(projectData).forEach(([key, value]) => {
        if (key === 'skills') {
          formData.append(key, (value as string[]).join(','))
        } else if (key === 'image' && value instanceof File) {
          formData.append(key, value)
        } else {
          formData.append(key, value as string)
        }
      })
      await updateProject(id, formData)
      fetchProjects()
      toast({
        title: "Success",
        description: "Project updated successfully",
      })
    } catch (error) {
      console.error('Error updating project:', error)
      toast({
        title: "Error",
        description: "Failed to update project",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProject = async (id: string) => {
    try {
      await deleteProject(id)
      fetchProjects()
      toast({
        title: "Success",
        description: "Project deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting project:', error)
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      })
    }
  }

  const columns: { header: string, accessorKey: keyof Project }[] = [
    { header: "Title", accessorKey: "title" },
    { header: "Subtitle", accessorKey: "subtitle" },
    { header: "GitHub URL", accessorKey: "githubUrl" },
    { header: "Live URL", accessorKey: "liveUrl" },
  ]

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
            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  value={newProject.subtitle}
                  onChange={(e) => setNewProject({ ...newProject, subtitle: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => setNewProject({ ...newProject, image: e.target.files?.[0] || '' })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <Input
                  id="githubUrl"
                  value={newProject.githubUrl}
                  onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="liveUrl">Live URL</Label>
                <Input
                  id="liveUrl"
                  value={newProject.liveUrl}
                  onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input
                  id="skills"
                  value={newProject.skills.join(', ')}
                  onChange={(e) => setNewProject({ ...newProject, skills: e.target.value.split(',').map(s => s.trim()) })}
                />
              </div>
              <Button type="submit">Add Project</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <DataTable<Project>
        data={projects}
        columns={columns}
        onEdit={(project: Project) => handleUpdateProject(project._id, project)}
        onDelete={(project: Project) => handleDeleteProject(project._id)}
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
