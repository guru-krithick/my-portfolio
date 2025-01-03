"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TerminalAnimation } from "@/components/Elements/TerminalAnimation";
import DownloadButton from "../Elements/DownloadButton";

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-white overflow-hidden"
    >
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-10 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            className="text-center lg:text-left space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-4xl lg:text-6xl text-gray-800 font-bold font-playfair">
              Hi There, I&apos;m{" "}
              <span className="bg-clip-text text-transparent animate-gradient-text font-playfair">
                Guru Krithick
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-xl text-muted-foreground font-poppins">
              Full Stack Developer & UI/UX Enthusiast
            </p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Resume Button */}
              <Button
                size="lg"
                variant="outline"
                className="rounded-full block lg:hidden px-6 py-3 text-black text-sm md:text-base shadow-md hover:shadow-lg transition-all ease-in-out"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = "/My-resume.pdf"; // Replace with the actual path to your resume file
                  link.download = "My-resume.pdf"; // Set the desired file name
                  link.click();
                }}
              >
                My Resume
              </Button>

              {/* Download Button for Larger Screens */}
              <div className="hidden lg:block">
                <DownloadButton />
              </div>

              {/* Contact Me Button */}
              <Button
                size="xl"
                className=" hidden lg:block rounded-full px-6 py-3 text-sm md:text-base bg-black text-white shadow-md hover:shadow-lg hover:bg-gray-800 transition-all ease-in-out"
              >
                Contact Me
              </Button>
              <Button
                size="lg"
                className="block lg:hidden rounded-full px-6 py-3 text-sm md:text-base bg-black text-white shadow-md hover:shadow-lg hover:bg-gray-800 transition-all ease-in-out"
              >
                Contact Me
              </Button>
            </motion.div>

            {/* Terminal Animation */}
            <div className="mt-8 pt-10 lg:mt-12 lg:pt-14 flex justify-center lg:flex-none lg:justify-start">
              <TerminalAnimation
                command="Welcome to my portfolio!"
                title="Terminal"
              />
            </div>
          </motion.div>

          {/* Right Column - Image */}
          <motion.div
            className="relative order-first lg:order-last"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full aspect-square max-w-[500px] mx-auto">
              <Image
                alt="Guru Krithick"
                src="https://avatar.iran.liara.run/public/48"
                fill
                className="object-cover rounded-full bg-gray-200 p-4 "
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-50 opacity-20 rounded-full" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
