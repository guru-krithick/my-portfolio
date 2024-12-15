"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  percentage: number;
  totalSolved: number;
  totalProblems: number;
};

export default function ProgressCircle({ percentage, totalSolved, totalProblems }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * ((100 - percentage) / 100);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className="w-32 h-32 transform -rotate-90">
        <circle
          className="text-zinc-700"
          strokeWidth="6"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="64"
          cy="64"
        />
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-blue-500"
          strokeWidth="6"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="64"
          cy="64"
          strokeDasharray={circumference}
        />
      </svg>
      <motion.div 
        className="absolute inset-0 flex items-center justify-center flex-col"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-2xl font-bold text-gray-200">{percentage.toFixed(1)}%</span>
        <span className="text-sm text-gray-400">solved</span>
      </motion.div>
      <motion.div 
        className="absolute inset-0 flex items-center justify-center flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-2xl font-bold text-gray-200">{totalSolved}</span>
        <span className="text-sm text-gray-400">/ {totalProblems}</span>
      </motion.div>
    </div>
  );
}