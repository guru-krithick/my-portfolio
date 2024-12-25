'use client';

import React, { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';


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
        <div className="rounded-lg p-4 max-w-9xl w-full transition-all hover:shadow-xl duration-300">
          <div className="flex justify-center">
            <GitHubCalendar 
              username="guru-krithick"
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