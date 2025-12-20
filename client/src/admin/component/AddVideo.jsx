import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createVideo, updateVideo, getVideoById } from "../../api/videoApi";
import { toast } from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";

export default function AddVideo({ onSuccess }) {
  const navigate = useNavigate();
  const { id } = useParams(); 

  const [videoData, setVideoData] = useState({
    title: "",
    videoUrl: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false); 

  useEffect(() => {
    if (id) {
      const fetchVideo = async () => {
        try {
          setFetching(true);
          const data = await getVideoById(id);
          console.log("Data", data);
          setVideoData({
            title: data.video.title || "",
            videoUrl: data.video.videoUrl || "",
            description: data.video.description || "",
          });
        } catch (err) {
          toast.error("Failed to fetch video");
        } finally {
          setFetching(false);
        }
      };
      fetchVideo();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideoData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, videoUrl, description } = videoData;

    if (!title.trim() || !videoUrl.trim()) {
      toast.error("Title and URL are required");
      return;
    }

    try {
      setLoading(true);
      if (id) {
        await updateVideo(id, { title, videoUrl, description });
        toast.success("Video updated successfully");
      } else {
        await createVideo({ title, videoUrl, description });
        toast.success("Video added successfully");
      }
      onSuccess?.();
      navigate("/admin/list-videos");
    } catch (err) {
      toast.error(err.message || "Failed to save video");
    } finally {
      setLoading(false);
    }
  };

  if (id && fetching) {
    return <p>Loading video data...</p>;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4 max-w-2xl"
      >
        <button
          onClick={() => navigate("/admin/list-videos")}
          className="mt-4"
          type="button"
        >
          <BiArrowBack className="inline-block mr-1" />
          Back
        </button>

        <h2 className="text-xl font-semibold">
          {id ? "Edit Video" : "Add Video"}
        </h2>

        <input
          className="w-full border p-2 rounded"
          placeholder="Video title"
          name="title"
          value={videoData.title}
          onChange={handleChange}
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Paste video URL (YT, TikTok, Insta, FB)"
          name="videoUrl"
          value={videoData.videoUrl}
          onChange={handleChange}
        />

        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description (optional)"
          name="description"
          value={videoData.description}
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          {loading
            ? id
              ? "Updating..."
              : "Adding..."
            : id
            ? "Update Video"
            : "Add Video"}
        </button>
      </form>
    </div>
  );
}
