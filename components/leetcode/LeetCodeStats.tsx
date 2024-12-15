import { getUserStats, getUserHeatmap } from "@/lib/leetcode";
import ProblemStats from "./ProblemStats";
import HeatMap from "./HeatMap";

export default async function LeetCodeStats({
  username,
}: {
  username: string;
}) {
  const [stats, heatmap] = await Promise.all([
    getUserStats(username),
    getUserHeatmap(username),
  ]);

  return (
    <section id="activity" className="py-2"> {/* Further reduced padding */}
      <div className="w-full bg-background flex items-center justify-center pl-0 ml-0 pt-0 mt-0">
        <div className="w-full max-w-7xl px-4 sm:px-6 pl-0 ml-0 pt-0 mt-0">
        
          <div className="grid grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr] gap-4"> {/* Reduced gap */}
            {/* ProblemStats */}
            <div className="flex justify-center items-center">
              <ProblemStats stats={stats} />
            </div>

            {/* LeetCode Activity Heatmap */}
            <div className="w-full flex justify-center items-center">
              <div className="text-center">
                <HeatMap data={heatmap} />
              </div>
            </div>
          </div>
          <p className="text-center mt-2 pt-4 text-muted-foreground text-xl pb-10"> {/* Reduced margin-top and padding-top */}
            Track your LeetCode submissions over time. The more green the blocks, the more active you are on LeetCode.
          </p>
        </div>
      </div>
    </section>
  );
}
