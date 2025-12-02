import { FiHome, FiBox, FiLogOut, FiX } from "react-icons/fi";
import { LuNotebookText } from "react-icons/lu";
import { MdOutlineInventory2 } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaAd } from "react-icons/fa";

function AdminSidebar({ open, setOpen }) {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("/admin");

  const handleClick = (path) => {
    setActiveLink(path);
    navigate(path);
    if (open) setOpen(false); 
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setActiveLink("/login");

    navigate("/login");

    if (open) setOpen(false);
  };

  const linkClass = (path) =>
    `flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors ${
      activeLink === path
        ? "bg-primary text-white"
        : "text-primary hover:bg-primary hover:text-white"
    }`;

  return (
    <>
      {/* Overlay only on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 h-full w-72 bg-white shadow-xl border-r border-secondary z-50
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Mobile close button */}
        <button
          className="md:hidden absolute top-4 right-4 text-2xl"
          onClick={() => setOpen(false)}
        >
          <FiX />
        </button>

        <div className="border-b border-secondary p-5">
          <h1 className="font-headline text-primary text-2xl">Uchit Trader’s</h1>
          <p className="text-tertiary text-sm">Store Management</p>
        </div>

        <nav className="p-4 space-y-3">
          <div
            className={linkClass("/admin")}
            onClick={() => handleClick("/admin")}
          >
            <FiHome className="text-xl" /> Dashboard
          </div>

          <div
            className={linkClass("/admin/list-products")}
            onClick={() => handleClick("/admin/list-products")}
          >
            <FiBox className="text-xl" /> Product
          </div>

          <div
            className={linkClass("/admin/category")}
            onClick={() => handleClick("/admin/category")}
          >
            <BiCategory className="text-xl" /> Category
          </div>

          <div
            className={linkClass("/admin/ad-list")}
            onClick={() => handleClick("/admin/ad-list")}
          >
            <FaAd className="text-xl" /> Ad Management
          </div>

          <div
            className={linkClass("/admin/list-gallery")}
            onClick={() => handleClick("/admin/list-gallery")}
          >
            <MdOutlineInventory2 className="text-xl" /> Gallery
          </div>

          <div
            className={linkClass("/admin/order")}
            onClick={() => handleClick("/admin/order")}
          >
            <LuNotebookText className="text-xl" /> Order Management
          </div>
        </nav>

        {/* --- Logout Button --- */}
        <div
          onClick={handleLogout}
          className="absolute bottom-5 left-5 flex items-center gap-3 cursor-pointer 
                     text-primary hover:text-red-600 transition-colors"
        >
          <FiLogOut className="text-xl" /> Logout
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;
