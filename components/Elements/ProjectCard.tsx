"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, Github } from "lucide-react";
import ProjectButton from "./ExploreButton";
import { Button } from "../ui/button";

interface ProjectCardProps {
  title: string;
  subtitle: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectCard({
  title,
  subtitle,
  image,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      className="project-card rounded-lg bg-white shadow-lg overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4">
        {/* Title and Subtitle */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            {title}
          </h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>

        {/* Links */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-4">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors"
              >
                <Globe className="h-6 w-6" />
              </a>
            )}
          </div>

          {/* Explore Button */}
          <Button
            size="lg"
            variant="default"
            className="rounded-full block lg:hidden"
          >
            My Resume
          </Button>
          <div className="hidden lg:block">
            <ProjectButton />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
