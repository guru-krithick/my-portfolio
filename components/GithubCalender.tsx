'use client';

import React, { useEffect, useState } from 'react';
import { GitHubCalendar } from 'github-contribution-calendar';

// Custom theme for the GitHub calendar
const myTheme = {
  noContributions: '#000000', // Light Blue for no submissions
  low: '#3B82F64A', // Light Purple-Blue for low submissions
  moderate: '#3B82E6d2', // Purple-Blue for moderate submissions
  high: '#3B82F6FE', // Blue for high submissions
  veryHigh: '#3B82F6', // Darker Blue for very high submissions
};

export const GithubHeatmap = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once the component is mounted in the browser
    setIsClient(true);
  }, []);

  // If it's not the client (i.e., it's still being rendered on the server), return null
  if (typeof window === 'undefined' || !isClient) {
    return null;
  }

  return (
    <section id="activity" className="py-4">
      <div className="w-full p-4 md:p-8 flex justify-center items-center bg-background">
        <div className="rounded-lg p-4 max-w-6xl w-full transition-all hover:shadow-xl duration-300">
          <div className="flex justify-center">
            <GitHubCalendar
              username="guru-krithick"
              token={process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN} // Public environment variable
              year={2024} // Optional: defaults to the current year
              showLabels={true} // Optional
              fontSize={14} // Optional
              labelColor="#ffffff" // Optional
              theme="custom"
              customTheme={myTheme} // Using custom color theme
              background="#27272A"
              className="rounded-lg border border-gray-400/30 hover:border-blue-400 transition-colors"
            />
          </div>
          <p className="text-center mt-4 text-muted-foreground text-lg">
            Track my GitHub contributions over time. The more blue the blocks, the more active I am on GitHub.
          </p>
        </div>
      </div>
    </section>
  );
};
