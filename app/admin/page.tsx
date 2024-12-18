/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProjects, getCertifications, getTestimonials, getResume } from "@/lib/api"

export default async function AdminDashboard() {
  let projects = [], certifications = [], testimonials = [], resume = null;
  let projectPages = 0, certPages = 0, testimonialPages = 0;

  try {
    const projectsData = await getProjects() as { projects: any[], totalPages: number };
    projects = projectsData.projects;
    projectPages = projectsData.totalPages;

    const certificationsData = await getCertifications() as { certifications: any[], totalPages: number };
    certifications = certificationsData.certifications;
    certPages = certificationsData.totalPages;

    const testimonialsData = await getTestimonials() as { testimonials: any[], totalPages: number };
    testimonials = testimonialsData.testimonials;
    testimonialPages = testimonialsData.totalPages;

    resume = await getResume();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }

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

