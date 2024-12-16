// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { time } from "console";

const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql';

const queries = {
  profile: `
    query ($username: String!) {
      matchedUser(username: $username) {
        profile {
          ranking
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
        }
      }
      allQuestionsCount {
        difficulty
        count
      }
    }
  `,
  
  heatmap: `
    query ($username: String!) {
      matchedUser(username: $username) {
        submissionCalendar
      }
    }
  `
};

async function fetchLeetCode(query: string, username: string) {
  const res = await fetch(LEETCODE_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Referer': 'https://leetcode.com'
    },
    body: JSON.stringify({
      query,
      variables: { username }
    })
  });

  if (!res.ok) {
    throw new Error('Failed to fetch LeetCode data');
  }

  return res.json();
}

export async function getUserStats(username: string) {
  const data = await fetchLeetCode(queries.profile, username);
  
  return {
    allQuestionsCount: data.data.allQuestionsCount,
    acSubmissionNum: data.data.matchedUser.submitStats.acSubmissionNum,
    rank: data.data.matchedUser.profile.ranking
  };
}

export async function getUserHeatmap(username: string) {
  const data = await fetchLeetCode(queries.heatmap, username);
  const calendar = JSON.parse(data.data.matchedUser.submissionCalendar);

  // Create an array for the last 365 days (53 weeks)
  const days = Array.from({ length: 364 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (363 - i));  // Adjust for 365 days

    // Using UTC to avoid timezone issues
    const timestamp = Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000);

    return {
      date: date.toLocaleDateString(),
      submissionCount: calendar[timestamp] || 0,
      key : timestamp
    };
  });

  return days;
}

  