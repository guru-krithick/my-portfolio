import { Button } from "@/components/ui/button"

export default function Resume() {
  return (
    <section id="resume" className="py-24">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Resume</h2>
        <p className="mb-8">Download my resume to learn more about my skills and experience.</p>
        <Button asChild>
          <a href="/path-to-your-resume.pdf" download>Download Resume</a>
        </Button>
      </div>
    </section>
  )
}

