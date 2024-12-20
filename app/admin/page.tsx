/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getProjects, getCertifications, getTestimonials, getResume } from "@/lib/api"

export default async function AdminDashboard() {
  let projects = [], certifications = [], testimonials = [], resume = null;
  let projectPages = 0, certPages = 0, testimonialPages = 0;
  let errors = [];

  try {
    const projectsData = await getProjects() as { projects: any[], totalPages: number };
    projects = projectsData.projects;
    projectPages = projectsData.totalPages;
  } catch (error) {
    console.error("Error fetching projects:", error);
    errors.push("Failed to fetch projects");
  }

  try {
    const certificationsData = await getCertifications() as { certifications: any[], totalPages: number };
    certifications = certificationsData.certifications;
    certPages = certificationsData.totalPages;
  } catch (error) {
    console.error("Error fetching certifications:", error);
    errors.push("Failed to fetch certifications");
  }

  try {
    const testimonialsData = await getTestimonials() as { testimonials: any[], totalPages: number };
    testimonials = testimonialsData.testimonials;
    testimonialPages = testimonialsData.totalPages;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    errors.push("Failed to fetch testimonials");
  }

  try {
    resume = await getResume();
  } catch (error) {
    console.error("Error fetching resume:", error);
    errors.push("Failed to fetch resume");
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Admin Dashboard</h1>
      {errors.length > 0 && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <ul className="list-disc list-inside">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle>Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {projects.length > 0 ? (
              <p className="text-6xl font-bold">{projects.length}</p>
            ) : (
              <p className="text-xl">No projects found</p>
            )}
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardHeader>
            <CardTitle>Total Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            {certifications.length > 0 ? (
              <p className="text-6xl font-bold">{certifications.length}</p>
            ) : (
              <p className="text-xl">No certifications found</p>
            )}
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
          <CardHeader>
            <CardTitle>Total Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
            {testimonials.length > 0 ? (
              <p className="text-6xl font-bold">{testimonials.length}</p>
            ) : (
              <p className="text-xl">No testimonials found</p>
            )}
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle>Resume</CardTitle>
          </CardHeader>
          <CardContent>
            {resume ? (
              <p className="text-6xl font-bold">Uploaded</p>
            ) : (
              <p className="text-xl">Not uploaded</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

