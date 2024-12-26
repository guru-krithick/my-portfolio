import { Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-card py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Github className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Linkedin className="h-6 w-6" />
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
            <Twitter className="h-6 w-6" />
          </a>
        </div>
        <p className="text-muted-foreground">&copy; {new Date().getFullYear()} Guru Krithick. All rights reserved.</p>
      </div>
    </footer>
  )
}

