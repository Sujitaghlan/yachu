// VideoCard.jsx
import VideoEmbed from "../constant/VideoEmbed";

export default function VideoCard({ video }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100">
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg text-gray-800 truncate">
          {video.title}
        </h3>
        <div className="overflow-hidden rounded-lg">
          <VideoEmbed url={video.videoUrl} />
        </div>
        {video.description && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {video.description}
          </p>
        )}
      </div>
    </div>
  );
}
