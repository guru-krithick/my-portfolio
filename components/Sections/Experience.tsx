"use client";
import React from "react";
import { IoLocationSharp } from "react-icons/io5";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { MdWork } from "react-icons/md";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <div className="lg:px-20 px-8 py-10 bg-background text-foreground">
      <motion.h1
        initial={{ opacity: 0, scale: 0.4, x: 100 }}
        whileInView={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 50 }}
        viewport={{ once: true }}
        className="font-ephesis text-6xl font-medium text-gray-900 dark:text-gray-100text-center mb-12"
      >
        My{" "}
        <span className="font-playfair text-5xl text-primary font-bold">
          Experience
        </span>
      </motion.h1>
      <div className="flex flex-col pt-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 1, y: 100 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 50 }}
          viewport={{ once: true }}
          className=""
        >
          <div className="flex gap-3 md:items-center">
            <div className="bg-gradient-to-br h-fit w-fit from-primary to-secondary text-xl p-2 rounded-full text-white">
              <MdWork className="" />
            </div>
            <div className="md:flex justify-between w-full items-center">
              <h1 className="font-bold font-playfair text-2xl text-black">
                Full Stack Developer Intern
              </h1>
              <h1 className="text-gray-400">Jul 2024 - Current</h1>
            </div>
          </div>
          <div className="px-5 pl-7 pt-2 pb-5 ml-[18px]">
            <div className="flex items-center gap-2">
              <HiBuildingOffice2 />
              <h1 className="text-black font-poppins">DNYX</h1>
            </div>
            <div className="flex items-center gap-2">
              <IoLocationSharp />
              <h2 className="text-black font-poppins">Remote, TN</h2>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
