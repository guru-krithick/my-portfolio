/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the GitHubCalendar component to prevent SSR issues
const GitHubCalendar = dynamic<{ username: string; token?: string; year: number; showLabels: boolean; fontSize: number; labelColor: string; customTheme: any; background: string; className: string }>(
  () => import('github-contribution-calendar').then((mod) => mod.default),
  { ssr: false }
);

// Define a custom theme for the heatmap
const myTheme = {
  noContributions: '#000000', // Black for no submissions
  low: '#3B82F64A',           // Light Blue for low submissions
  moderate: '#3B82E6d2',      // Medium Blue for moderate submissions
  high: '#3B82F6FE',          // Bright Blue for high submissions
  veryHigh: '#3B82F6',        // Dark Blue for very high submissions
};

export const GithubHeatmap = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Ensure rendering only occurs on the client-side
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Prevent rendering on the server-side
    return null;
  }

  return (
    <section id="activity" className="py-4">
      <div className="w-full p-4 md:p-8 flex justify-center items-center bg-background">
        <div className="rounded-lg p-4 max-w-6xl w-full transition-all hover:shadow-xl duration-300">
          <div className="flex justify-center">
            <GitHubCalendar
              username="guru-krithick" // Replace with your GitHub username
              token={process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN} // Ensure this variable is set in your .env file
              year={2024} // Display contributions for the year 2024
              showLabels={true} // Show month labels
              fontSize={14} // Font size for text
              labelColor="#ffffff" // Label color (white)
              customTheme={myTheme} // Use the defined custom theme
              background="#27272A" // Background color for the calendar
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
