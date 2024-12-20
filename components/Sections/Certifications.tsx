import { Card,  CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const certifications = [
  {
    title: "Certification 1",
    description: "A brief description of Certification 1",
    pdfLink: "#"
  },
  {
    title: "Certification 2",
    description: "A brief description of Certification 2",
    pdfLink: "#"
  },
  // Add more certifications as needed
]

export default function Certifications() {
  return (
    <section id="certifications" className="py-24">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{cert.title}</CardTitle>
                <CardDescription>{cert.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <a href={cert.pdfLink} download>Download PDF</a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

