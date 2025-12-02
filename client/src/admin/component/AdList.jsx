/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAds, deleteAd } from "../../api/adApi";

function AdList() {
  const navigate = useNavigate();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadAds = async () => {
    setLoading(true);
    try {
      const res = await getAllAds();
      if (res.success) setAds(res.ads);
      else setError(res.message || "Failed to load ads");
    } catch (err) {
      setError("Error fetching ads");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadAds();
  }, []);

  const handleDeleteAd = async (adId) => {
    if (!window.confirm("Are you sure you want to delete this ad?")) return;

    const prevAds = [...ads];
    setAds(ads.filter((a) => a._id !== adId));
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await deleteAd(adId, token);
      if (res.success) setMessage(res.message || "Ad deleted successfully!");
      else {
        setAds(prevAds);
        setError(res.message || "Failed to delete");
      }
    } catch (err) {
      setAds(prevAds);
      setError("Error deleting ad");
    }
  };

  if (loading) return <div className="p-4">Loading ads...</div>;

  return (
    <div className="w-full font-sans text-sm p-4">
      {message && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">{message}</div>}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>}

      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <div className="text-gray-600 text-xs flex-grow min-w-[150px] truncate">
          Manage your ad inventory
        </div>
        <button
          onClick={() => navigate("/admin/ad-form")}
          className="bg-blue-700 text-white text-xs py-1 px-3 rounded whitespace-nowrap hover:bg-blue-800"
        >
          + Add Ad
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[280px]">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left font-semibold pb-1 px-2">Product</th>
              <th className="text-left font-semibold pb-1 px-2">Discount %</th>
              <th className="text-left font-semibold pb-1 px-2">Ad Content</th>
              <th className="text-left font-semibold pb-1 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="py-4 px-2">{ad.productId?.productName || "Unknown Product"}</td>
                <td className="py-4 px-2">{ad.discountPercent}%</td>
                <td className="py-4 px-2">{ad.adContent}</td>
                <td className="py-4 px-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/ad-form/${ad._id}`)}
                      className="bg-[#008000] text-white text-xs py-1 px-3 rounded hover:bg-green-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAd(ad._id)}
                      className="bg-red-600 text-white text-xs py-1 px-3 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {ads.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No ads found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdList;
