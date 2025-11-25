import { FiMenu, FiBell } from "react-icons/fi";

function AdminNavbar({ setOpen }) {
  return (
    <header className="w-full bg-white shadow-md border-b border-secondary p-4 flex justify-between items-center">
      <button onClick={() => setOpen(true)} className="md:hidden text-primary text-2xl">
        <FiMenu />
      </button>
      <h1 className="text-xl font-headline text-primary">Admin Dashboard</h1>
      <div className="flex items-center gap-4 text-primary">
        <FiBell className="text-xl cursor-pointer" />
      </div>
    </header>
  );
}

export default AdminNavbar;
