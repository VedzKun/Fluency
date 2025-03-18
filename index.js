import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScore = async () => {
      try {
        const response = await fetch("http://localhost:5000/get_score");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setScore(data.score);
        setError(null);
      } catch (error) {
        console.error("Error fetching score:", error);
        setError("Failed to fetch score. Ensure the backend is running.");
      }
    };

    const interval = setInterval(fetchScore, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Posture Assessment</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-lg mb-4">Current Score: {score}</p>
      )}
      <div className="border rounded-md overflow-hidden shadow-md">
        <img
          src="http://localhost:5000/video_feed"
          alt="Webcam Feed"
          className="w-full h-auto"
          onError={() => setError("Failed to load video feed. Ensure the backend is running.")}
        />
      </div>
    </div>
  );
}
