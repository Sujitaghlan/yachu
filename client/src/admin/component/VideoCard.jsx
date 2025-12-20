import VideoEmbed from "../../constant/VideoEmbed";
import { deleteVideo } from "../../api/videoApi";

export default function VideoCard({ video, onDelete }) {
  const token = localStorage.getItem("accessToken");

  const handleDelete = async () => {
    if (!confirm("Delete this video?")) return;
    await deleteVideo(video._id, token);
    onDelete();
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-3">
      <h3 className="font-semibold">{video.title}</h3>

      <VideoEmbed url={video.videoUrl} />

      <button
        onClick={handleDelete}
        className="bg-red-500 text-white px-3 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}
