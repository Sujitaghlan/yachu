import { Outlet } from "react-router-dom";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar: static on desktop, toggleable on mobile */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar setOpen={setOpen} />
        <main className="overflow-y-auto p-4 bg-gray-100 h-full">
          {/* This renders the Dashboard or other admin pages */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
    