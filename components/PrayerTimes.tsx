"use client";

import { useEffect, useState } from "react";

interface PrayerTime {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
}

export default function PrayerTimes() {
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const response = await fetch("https://www.islamicfinder.us/index.php/api/prayer_times", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            user_ip: "auto", // The API will detect the user's IP
            method: "3", // MWL method
            time_format: "1", // 12-hour format
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch prayer times");

        const data = await response.json();
        setPrayerTimes(data.results);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTimes();
  }, []);

  if (loading) {
    return (
      <div className="space-y-2 text-sm text-muted-foreground animate-pulse">
        <div className="h-4 bg-muted rounded w-20"></div>
        <div className="h-4 bg-muted rounded w-20"></div>
        <div className="h-4 bg-muted rounded w-20"></div>
        <div className="h-4 bg-muted rounded w-20"></div>
        <div className="h-4 bg-muted rounded w-20"></div>
      </div>
    );
  }

  if (!prayerTimes) {
    return null;
  }

  return (
    <div className="space-y-2 text-sm text-muted-foreground">
      <p>Fajr: {prayerTimes.Fajr}</p>
      <p>Dhuhr: {prayerTimes.Dhuhr}</p>
      <p>Asr: {prayerTimes.Asr}</p>
      <p>Maghrib: {prayerTimes.Maghrib}</p>
      <p>Isha: {prayerTimes.Isha}</p>
    </div>
  );
}