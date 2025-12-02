import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineCloudUpload } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { createGallery, updateGallery, getGalleryById } from "../../api/galleryApi";

export default function AddGallery() {
  const navigate = useNavigate();
  const { id } = useParams(); // edit mode if id exists

  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load existing gallery data in edit mode
  useEffect(() => {
    if (!id) return; // Add mode, no need to load

    const loadGallery = async () => {
      setLoading(true);
      try {
        const res = await getGalleryById(id);
        console.log("API response:", res);

        const data = res.image; // <-- Correctly access the nested image object
        if (data) {
          setDescription(data.description || "");
          setImagePreview(data.imageUrl || null);
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load gallery item.");
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description) return alert("Please enter a description.");
    if (!id && !image) return alert("Please upload an image.");

    try {
      if (id) {
        await updateGallery(id, { image, description });
        alert("Gallery updated successfully!");
      } else {
        await createGallery({ image, description });
        alert("Gallery added successfully!");
      }
      navigate("/admin/list-gallery");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to save gallery.");
    }
  };

  // Loading state while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading gallery data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <button className="flex items-center gap-2 mb-6 text-gray-700" onClick={() => navigate(-1)}>
        <AiOutlineArrowLeft size={20} /> Back
      </button>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Description Field */}
        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write image description..."
            className="w-full border px-3 py-2 rounded"
            rows={4}
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-medium">
            Upload Image {id ? "(optional)" : <span className="text-red-500">*</span>}
          </label>

          <label
            htmlFor="upload"
            className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
          >
            <AiOutlineCloudUpload size={30} className="mx-auto mb-2 text-gray-500" />
            <p className="text-gray-500">
              Drop your image here, or <span className="text-blue-500 underline">browse</span>
            </p>

            <input
              id="upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {/* Preview */}
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-3 w-40 h-40 object-cover rounded" />
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-900 text-white py-3 rounded hover:bg-blue-800 transition"
        >
          {id ? "Update Image" : "Add Image"}
        </button>
      </form>
    </div>
  );
}
