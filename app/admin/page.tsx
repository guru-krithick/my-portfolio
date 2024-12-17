/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProjects, getCertifications, getTestimonials, getResume } from "@/lib/api"

export default async function AdminDashboard() {
  const { projects, totalPages: projectPages }: any= await getProjects()
  const { certifications, totalPages: certPages } : any = await getCertifications()
  const { testimonials, totalPages: testimonialPages } : any = await getTestimonials()
  const resume = await getResume()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{projects.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{certifications.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{testimonials.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{resume ? 'Uploaded' : 'Not Uploaded'}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

