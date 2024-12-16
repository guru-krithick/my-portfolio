'use client';  


import React, { useEffect, useState } from "react";
import { GitHubCalendar } from "github-contribution-calendar";
const my_theme = {
    noContributions: "#000000",  // Light Blue for no submissions
    low: "#3B82F64A",              // Light Purple-Blue for low submissions
    moderate: "#3B82F6E1",         // Purple-Blue for moderate submissions
    high: "#3B82F6FE",             // Blue for high submissions
    veryHigh: "#3B82F6",           // Darker Blue for very high submissions
};

export const GithubHeatmap = () => {

    console.log(process.env.GITHUB_ACCESS_TOKEN);

    const [isClient, setIsClient] = useState(false);
  
    useEffect(() => {
      // This will run only on the client-side
      setIsClient(true);
    }, []);
  

    if (!isClient) {
      // Render nothing or a loading indicator on the server-side
      return null;
    }
    
    
    return (
      <section id="activity" className="py-2"> {/* Further reduced padding */}
        <div className="w-full p-4 md:p-8 flex justify-center items-center bg-background">
          <div className="rounded-lg p-4 max-w-9xl w-full transform transition-all hover:scale-100 hover:shadow-3xl duration-300">
        
            <div className="flex justify-center">
              <GitHubCalendar
                username="guru-krithick"
                token={process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN}
// Optional: default is undefined
                year={2024} // Optional: default is current year
                showLabels={true} // Optional
                fontSize={14} // Optional
                labelColor="#ffffff" // Optional: default is '#000000'
                theme="custom"
                customTheme={my_theme} // Optional : defaults to "forest"
                background="#27272A"
                className="w-3.5 h-3.5 rounded-lg border border-gray-400/30 hover:border-blue-400 transition-colors"
              />
            </div>
            <p className="text-center mt-2 text-muted-foreground text-xl pb-6"> {/* Reduced margin-top */}
              Track my GitHub contributions over time. The more blue the blocks, the more active I am on GitHub.
            </p>
          </div>
        </div>
      </section>
    );
  };
  