"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Heart, ExternalLink, Download, Award, Star, Coffee, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoLogoWhatsapp, IoSend } from "react-icons/io5";
import Link from "next/link";

export default function ContactSection() {
  const achievements = [
    { icon: <Star className="h-5 w-5" />, label: "4.9 Rating" },
    { icon: <Award className="h-5 w-5" />, label: "Certified Dev" },
    { icon: <Coffee className="h-5 w-5" />, label: "10+ Projects" },
  ];

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/guru-krithick",
      label: "GitHub",
      username: "@guru-krithick",
      description: "Check out my open-source projects and contributions",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com/in/guru-krithick",
      label: "LinkedIn",
      username: "Guru Krithick",
      description: "Connect with me professionally",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      href: "https://x.com/GuruKrithick130?t=ehutCMRQsWB8LkKzqGO51w&s=08",
      label: "Twitter",
      username: "@GuruKrithick130",
      description: "Follow me for tech insights and updates",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:krithickguru13@gmail.com",
      label: "Email",
      username: "krithickguru13@gmail.com",
      description: "Drop me a line anytime",
    },
  ];

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-blue-950 dark:via-gray-900 dark:to-blue-950 p-4 sm:p-8">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="p-8 sm:p-12">
            <div className="space-y-8">
              {/* Header with Animated Text */}
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2,
                    ease: [0, 0.71, 0.2, 1.01]
                  }}
                >
                  <h2 className="text-4xl sm:text-5xl font-bold">
                    <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text font-playfair text-transparent">
                      Transform Ideas
                    </span>
                    <br />
                    <span className="text-gray-800 font-playfair dark:text-gray-200">
                      Into Digital Reality
                    </span>
                  </h2>
                  <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
                    Ready to build something extraordinary? Let&apos;s collaborate and bring your vision to life with cutting-edge web solutions.
                  </p>
                </motion.div>

                {/* Achievement Badges */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-wrap justify-center gap-4 mt-6"
                >
                  {achievements.map((achievement, index) => (
                    <TooltipProvider key={index}>
                      <Tooltip>
                        <TooltipTrigger>
                          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                            {achievement.icon}
                            <span className="font-medium">{achievement.label}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Verified Achievement</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </motion.div>
              </div>

              {/* Interactive Social Links Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.6 }}
                  >
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="group p-4 bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                {link.icon}
                                <span className="font-medium">{link.label}</span>
                              </div>
                              <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </div>
                        </a>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <div className="space-y-2">
                          <h4 className="text-sm font-semibold">{link.username}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {link.description}
                          </p>
                          <Badge variant="secondary" className="mt-2">
                            Click to connect
                          </Badge>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  </motion.div>
                ))}
              </div>

              {/* Quick Contact Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center gap-4"
              >
                <Button
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => window.open('tel:+919363041148')}
                >
                  <Phone className="mr-2 h-4 w-4" /> Quick Call
                </Button>
                <Button
                  variant="outline"
                  className="group border-blue-200 hover:border-blue-300"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/My-resume.pdf'; // Replace with the actual path to your resume file
                    link.download = 'My-resume.pdf'; // Set the desired file name
                    link.click();
                  }}
                >
                  <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  Resume
                </Button>
              </motion.div>

              <div className=" flex justify-center">
                <div className="md:min-w-[350px] min-w-full sm:min-w-[300px]">
                  <div className="flex p-2 items-center border rounded-full justify-between">
                    <div className="flex gap-3 items-center">
                    <Link href="https://wa.me/9363041148">
                      <IoLogoWhatsapp className="text-blue-600 p-2 text-4xl bg-blue-200 rounded-full" />
                      </Link>
                      <h1 className="font-semibold lg:text-md text-sm">
                        +91 93630 41148
                      </h1>
                    </div>

                    <Link href="https://wa.me/9363041148">
                      <div className="">
                        <IoSend className="text-blue-600 p-2 text-4xl bg-blue-200 rounded-full" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              {/* GitHub Sponsor Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mt-8 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/40 dark:to-blue-800/40 rounded-2xl p-6 text-center"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-2">
                    <Heart className="h-6 w-6 text-red-500 animate-pulse" />
                    <h3 className="text-xl font-semibold">Support Open Source</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto">
                    Help me create more amazing open-source projects for the community
                  </p>
                  <Button
                    variant="default"
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                    onClick={() => window.open('https://github.com/sponsors/guru-krithick', '_blank')}
                  >
                    <Heart className="mr-2 h-4 w-4" /> Become a Sponsor
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
