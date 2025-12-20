import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVideos, deleteVideo } from "../../api/videoApi";
import { toast } from "react-hot-toast";

const AdminVideos = () => {
  const navigate = useNavigate();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        setVideos(Array.isArray(data.videos) ? data.videos : []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch videos.");
      }
    };
    fetchVideos();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newVideo = {
      title: e.target.title.value,
    };
    setVideos([...videos, newVideo]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await deleteVideo(id); // remove from backend
      setVideos((prev) => prev.filter((v) => v._id !== id));
      toast.success("Video deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete video");
    }
  };

  const handleEdit = async (id) => {
    navigate(`/admin/add-videos/${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-gray-500">Manage your videos</p>
        <button
          onClick={() => navigate("/admin/add-videos")}
          className="text-white bg-blue-700 px-4 py-2 rounded text-sm sm:text-base hover:bg-blue-800 transition"
        >
          + Add Videos
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Video URL</th>
              <th className="border px-4 py-2 text-left">Description</th>
              <th className="border px-4 py-2 text-left">Edit</th>
              <th className="border px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{video.title}</td>
                <td className="border px-4 py-2">
                  {video.videoUrl ? (
                    <a
                      href={video.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {video.videoUrl}
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="border px-4 py-2">{video.description || "-"}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEdit(video._id)}
                    className="text-green"
                  >
                    Edit
                  </button>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(video._id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVideos;
