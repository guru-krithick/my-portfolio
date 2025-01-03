"use client";

import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectCard from "../ProjectCard";
// import { Button } from "../ui/button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import Link from "next/link";

const projects = [
  // {
  //   title: "Health-Connect",
  //   subtitle: "Ecommerce",
  //   image: "/health-connect.png",
  //   liveUrl: "https://health-connect-web.vercel.app/",
  //   githubUrl: "https://github.com/guru-krithick/health-connect",
  // },
  {
    title: "Portfolio",
    subtitle: "Portfolio Template",
    image: "/portfolio.png",
    liveUrl: "#",
    githubUrl: "https://github.com/guru-krithick/my-portfolio",
  },
  {
    title: "Certificate Generator",
    subtitle: "HR Management",
    image: "/certificate-generator.png",
    // liveUrl: "#",
    githubUrl: "https://github.com/guru-krithick/Completion-Automation",
  },
];

export default function ProjectCarousel() {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="font-ephesis text-6xl font-medium text-gray-900 dark:text-gray-100">
            My{" "}
            <span className="font-playfair text-5xl text-primary font-bold">
              Projects
            </span>
          </h2>
          {/* <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => sliderRef.current?.slickPrev()}
              className="text-gray-700 dark:text-gray-300 hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => sliderRef.current?.slickNext()}
              className="text-gray-700 dark:text-gray-300 hover:text-primary"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div> */}
        </div>
        
        {/* Slider */}
        <Slider ref={sliderRef} {...settings} className="slick-container">
          {projects.map((project, index) => (
            <div key={index} className="px-3">
              <ProjectCard {...project} />
            </div>
          ))}
        </Slider>
        <div className="flex justify-end mt-8">
  {/* <Link href="/projects">
    <Button size="lg" className="rounded-md">
      View All Projects
    </Button>
  </Link> */}
</div>

      </div>
    </section>
  );
}