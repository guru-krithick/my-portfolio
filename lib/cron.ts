import cron from "node-cron";
import { fetchLeetCodeData } from "@/lib/fetchLeetCodeData";

const USERNAME = "yourLeetCodeUsername"; // Replace with your username

console.log("Cron job initialized. Fetching LeetCode stats daily.");

// Run at midnight daily
cron.schedule("0 0 * * *", async () => {
  try {
    await fetchLeetCodeData(USERNAME);
    console.log("Daily data fetched successfully.");
  } catch (err) {
    console.error("Error fetching daily data:", err);
  }
});
