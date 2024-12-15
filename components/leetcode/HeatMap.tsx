"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { HeatMapDetail } from "@/types/leetcode";
import { calcOpacity } from "@/lib/utils";

function Block({ count }: { count: number }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      style={{
        backgroundColor: count > 0 ? `rgba(59, 130, 246, ${calcOpacity(count)})` : 'transparent'
      }}
      className="w-3.5 h-3.5 rounded-sm border border-gray-400/30 hover:border-blue-400 transition-colors"
      title={`${count} submissions on this day`}
    />
  );
}

export default function HeatMap({ data }: { data: HeatMapDetail[] }) {
    const [mounted, setMounted] = useState(false);
  
    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) return null;
  
    const totalDays = data.length;
    const weeksCount = Math.ceil(totalDays / 7);
    const weeks = [];
  
    // Split the data into weeks
    for (let i = 0; i < weeksCount; i++) {
      weeks.push(data.slice(i * 7, (i + 1) * 7));
    }
  
    // Add months' visual gaps
    const months = [];
    for (let i = 0; i < weeksCount; i++) {
      months.push(i % 4 === 0 ? <div className="month-gap" key={`gap-${i}`} /> : null); // Adding gap every 4 weeks (roughly a month)
    }
  
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-zinc-800 rounded-2xl mx-auto shadow-lg p-6 flex-1 overflow-hidden"
      >
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-200">
            Heatmap (Last 53 Weeks)
          </h2>
        </div>
  
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-[repeat(53,1fr)] gap-1 relative">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <Block key={`${weekIndex}-${dayIndex}`} count={day.submissionCount} />
                ))}
              </div>
            ))}
            {months}
          </div>
        </div>
  
        <div className="flex justify-between mt-4 text-sm text-gray-400">
          <span>{data[0]?.date}</span>
          <span>{data[data.length - 1]?.date}</span>
        </div>
      </motion.div>
    );
  }
  