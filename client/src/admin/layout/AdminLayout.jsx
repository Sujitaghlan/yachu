import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  // Close sidebar when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && open) {
        setOpen(false);
      }
    };
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  return (
    <div className="flex h-screen">
      {/* Sidebar: static on desktop, toggleable on mobile */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminNavbar setOpen={setOpen} />
        
        {/* Main content area with proper spacing */}
        <main className="flex-1 overflow-y-auto p-3 md:p-4 bg-gray-100 h-[calc(100vh-64px)] md:h-[calc(100vh-72px)]">
          {/* Container with proper padding */}
          <div className="max-w-full mx-auto h-full">
            {/* This renders the Dashboard or other admin pages */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;