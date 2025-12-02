import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getCategories, deleteCategory } from "../../api/categoryApi";

function CategoryList() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories || []);
    } catch (err) {
      console.error("Failed to load categories:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await deleteCategory(id);
      fetchData(); // refresh list
    } catch (err) {
      alert(err.message || "Failed to delete category");
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center p-4 sm:p-6">
      <div className="w-full max-w-full">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-3 mb-4">
          <span className="text-base sm:text-lg font-medium text-gray-800">
            Manage your product categories
          </span>

          <button
            onClick={() => navigate("/admin/add-category")}
            className="text-white bg-info px-4 py-2 rounded text-sm sm:text-base hover:bg-blue-700 transition"
          >
            + Add Category
          </button>
        </div>

        {/* TABLE WRAPPER */}
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse min-w-[420px]">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left px-2 py-2 font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left px-2 py-2 font-semibold text-gray-700">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((cat) => (
                <tr
                  key={cat._id}
                  className="border-b border-gray-200 last:border-none shadow-md hover:shadow-xl transition-shadow duration-300 rounded"
                >
                  <td className="px-2 py-3 text-gray-800 text-sm sm:text-base">
                    {cat.name}
                  </td>

                  <td className="px-2 py-3">
                    <div className="flex gap-2">

                      {/* EDIT BUTTON */}
                      <button
                        onClick={() =>
                          navigate("/admin/add-category", { state: cat })
                        }
                        className="bg-icon text-white text-xs py-1 px-3 rounded hover:bg-green-800 transition"
                      >
                        Edit
                      </button>

                      {/* DELETE BUTTON */}
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="bg-red-600 text-white text-xs py-1 px-3 rounded hover:bg-red-700 transition"
                      >
                        Delete
                      </button>

                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default CategoryList;
