// Results.jsx
import { useEffect, useState } from "react";
import { getVideos } from "../api/videoApi";
import VideoCard from "./VideoCard";

export default function Results() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getVideos().then((res) => setVideos(res.videos || []));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      {videos.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No videos found
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
