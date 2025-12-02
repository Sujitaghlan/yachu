import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGalleryList, deleteGallery } from "../../api/galleryApi";

export default function GalleryList() {
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const data = await getGalleryList();
      setGallery(Array.isArray(data.image) ? data.image : []);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch gallery.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    try {
      await deleteGallery(id);
      fetchGallery();
    } catch (err) {
      console.error(err);
      alert("Failed to delete image.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading gallery...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center p-4 sm:p-6">
      <div className="w-full max-w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-3 mb-4">
          <span className="text-base sm:text-lg font-medium text-gray-800">
            Manage your gallery images
          </span>

          <button
            onClick={() => navigate("/admin/add-images")}
            className="text-white bg-blue-700 px-4 py-2 rounded text-sm sm:text-base hover:bg-blue-800 transition"
          >
            + Add Image
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[420px]">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left px-2 py-2 font-semibold text-gray-700">Description</th>
                <th className="text-left px-2 py-2 font-semibold text-gray-700">Image</th>
                <th className="text-left px-2 py-2 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {gallery.length > 0 ? (
                gallery.map((item) => (
                  <tr key={item._id} className="border-b border-gray-200 hover:shadow-md transition-shadow duration-300 rounded">
                    <td className="px-2 py-3 text-gray-800 text-sm sm:text-base">{item.description}</td>
                    <td className="px-2 py-3">
                      <img src={item.imageUrl} alt={item.description} className="w-20 h-20 object-cover rounded" />
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/admin/add-images/${item._id}`)}
                          className="bg-[#008000] text-white text-xs py-1 px-3 rounded hover:bg-green-500 transition"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="bg-red-600 text-white text-xs py-1 px-3 rounded hover:bg-red-500 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-gray-500">
                    No gallery items found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
