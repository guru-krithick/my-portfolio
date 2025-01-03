import { Github, Linkedin, Twitter, Mail, Globe } from 'lucide-react';
import { IoLogoWhatsapp } from 'react-icons/io5';

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://github.com/guru-krithick"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://linkedin.com/in/guru-krithick"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://x.com/GuruKrithick130?t=ehutCMRQsWB8LkKzqGO51w&s=08"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="mailto:krithickguru13@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Mail className="h-6 w-6" />
          </a>
          <a
            href="https://wa.me/9363041148"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <IoLogoWhatsapp className="h-6 w-6" />
          </a>
          <a
            href="https://guru-krithick.com" // Replace with your personal website
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            <Globe className="h-6 w-6" />
          </a>
        </div>
        <p className="text-gray-600">
          &copy; {new Date().getFullYear()} Guru Krithick. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
