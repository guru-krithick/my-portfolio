'use client';

import React from 'react';
import GitHubCalendar from 'react-github-calendar';

export const GithubHeatmap = () => {
  // Define a custom theme for the GitHub calendar
  const myTheme = {
    background: '#27272A',
    text: '#ffffff',
    grade4: '#3B82F6', // Very high contributions
    grade3: '#3B82F6FE', // High contributions
    grade2: '#3B82E6d2', // Moderate contributions
    grade1: '#3B82F64A', // Low contributions
    grade0: '#000000', // No contributions
  };

  return (
    <section id="activity" className="py-4">
      <div className="w-full p-4 md:p-8 flex justify-center items-center bg-background">
        <div className="rounded-lg p-4 max-w-6xl w-full transition-all hover:shadow-xl duration-300">
          <div className="flex justify-center">
            <GitHubCalendar
              username="guru-krithick"
              year={2024} // Optional: Show contributions for the year 2024
              blockSize={15} // Optional: Size of the contribution blocks
              blockMargin={5} // Optional: Margin between the blocks
              theme={myTheme} // Apply custom theme
              fontSize={14} // Optional: Font size for labels
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
