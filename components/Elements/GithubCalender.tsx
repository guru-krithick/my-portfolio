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
    <section id="activity" className="py-4 bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Heading */}
        <h3 className="text-5xl text-center text-black font-ephesis mb-4 pb-2 pt-6">
          Github{" "}
          <span className="text-primary font-bold font-playfair text-4xl">
            {" "}Activity Heatmap
          </span>
        </h3>

        {/* Heatmap */}
        <div className="w-full p-4 md:p-8 flex justify-center items-center">
          <div className="rounded-lg p-4 max-w-9xl w-full transition-all hover:shadow-lg duration-300 bg-gray-100">
            <div className="flex justify-center">
              <GitHubCalendar 
                username="guru-krithick"
              />
            </div>
            <p className="text-center mt-4 text-gray-700 text-lg">
              Track my GitHub contributions over time. The more vibrant the blocks, the more active I am on GitHub.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
