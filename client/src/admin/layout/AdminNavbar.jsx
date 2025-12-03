import { FiMenu, FiBell } from "react-icons/fi";

function AdminNavbar({ setOpen }) {
  return (
    <header className="w-full bg-white shadow-md border-b border-secondary p-4 flex justify-between items-center px-4 md:px-6">
      <button 
        onClick={() => setOpen(true)} 
        className="md:hidden text-primary text-2xl p-1"
      >
        <FiMenu />
      </button>
      <h1 className="text-lg md:text-xl font-headline text-primary ml-2 md:ml-0">
        Admin Dashboard
      </h1>
      <div className="flex items-center gap-4 text-primary">
        <FiBell className="text-xl cursor-pointer p-1" />
      </div>
    </header>
  );
}

export default AdminNavbar;