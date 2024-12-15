"use client";

import { motion } from "framer-motion";
import type { SubmitStats } from "@/types/leetcode";
import ProgressCircle from "./ProgressCircle";

const difficultyColors = {
  Easy: "bg-green-500",
  Medium: "bg-yellow-500",
  Hard: "bg-red-500",
} as const;

export default function ProblemStats({ stats }: { stats: SubmitStats }) {
  const [totalQuestions, ...difficultyWiseTotal] = stats.allQuestionsCount;
  const [totalSolved, ...sectionWiseSolved] = stats.acSubmissionNum;
  const solvedPercentage = (totalSolved?.count / totalQuestions?.count) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-800 rounded-2xl mx-auto shadow-lg p-6 flex-1 overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-200">
          Problem Solving Stats
        </h2>
        <span className="text-sm bg-blue-500/20 px-3 py-1 rounded-full text-blue-300 border border-blue-500/30">
          Rank #{stats.rank}
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <ProgressCircle 
          percentage={solvedPercentage} 
          totalSolved={totalSolved.count!}
          totalProblems={totalQuestions.count!}
        />
        <div className="flex-1 w-full overflow-hidden">
          {difficultyWiseTotal.map((difficulty, index) => {
            const section = sectionWiseSolved[index];
            const percentage = (section.count! / difficulty.count!) * 100;

            return (
              <div key={difficulty.difficulty} className="mb-4 last:mb-0">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-300">
                    {difficulty.difficulty}
                  </span>
                  <span className="text-sm text-gray-400">
                    {section.count} / {difficulty.count}
                  </span>
                </div>
                <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${difficultyColors[difficulty.difficulty as keyof typeof difficultyColors]}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
