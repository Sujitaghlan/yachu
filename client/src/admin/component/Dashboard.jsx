import {
  FiMenu,
  FiPackage,
  FiShoppingCart,
  FiGrid,
} from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { RiFileExcel2Line } from "react-icons/ri";

function Dashboard() {
  return (
    <div className="w-full min-h-screen bg-secondary p-3 font-paragraph flex justify-center animate-fade-in-up">
      <div className="w-full max-w-6xl">

        {/* Top Bar */}
        <div className="flex items-center bg-white p-4 font-bold rounded-md mb-6 shadow-sm">
          <FiMenu className="text-2xl text-primary cursor-pointer" />
          <span className="flex-1 text-lg ml-3 font-headline text-primary">
            Admin Dashboard
          </span>
          <IoNotificationsOutline className="text-2xl text-primary cursor-pointer" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {/* Product Card */}
          <div className="relative bg-white rounded-md p-5 shadow-sm animate-slide-in-left">
            <p className="text-h3 text-tertiary font-semibold">Total Products</p>
            <h1 className="text-h1 font-bold mt-1 text-primary">105</h1>
            <p className="text-xs text-tertiary">0 out of stock, 2 low stock</p>
            <FiPackage className="absolute right-4 top-4 text-3xl text-icon" />
          </div>

          {/* Total Sales */}
          <div className="relative bg-white rounded-md p-5 shadow-sm animate-slide-in-left delay-200">
            <p className="text-h3 text-tertiary font-semibold">Total Sales</p>
            <h1 className="text-h1 font-bold mt-1 text-primary">Rs. 1,25,800</h1>
            <FiShoppingCart className="absolute right-4 top-4 text-3xl text-icon" />
          </div>

          {/* Categories */}
          <div className="relative bg-white rounded-md p-5 shadow-sm animate-slide-in-left delay-300">
            <p className="text-h3 text-tertiary font-semibold">Category</p>
            <h1 className="text-h1 font-bold mt-1 text-primary">4</h1>
            <p className="text-xs text-tertiary">4 products across category</p>
            <FiGrid className="absolute right-4 top-4 text-3xl text-icon" />
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white p-5 rounded-md shadow-sm my-6 animate-fade-in-up delay-200">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-primary text-h2">Inventory Status</h2>

            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-red-300 rounded flex items-center gap-1">
                <HiOutlineDocumentText className="text-lg" /> PDF
              </button>
              <button className="px-3 py-1 text-sm bg-green rounded flex items-center gap-1">
                <RiFileExcel2Line className="text-lg" /> Excel
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="text-left text-tertiary text-xs border-b">
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Stock</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-2">Dandruff Case</td><td>10</td>
                  <td><span className="bg-yellow-200 py-1 px-2 rounded text-xs">Low Stock</span></td>
                </tr>

                <tr className="border-b">
                  <td className="py-2">Hairfall Case</td><td>100</td>
                  <td><span className="bg-green py-1 px-2 rounded text-xs">In Stock</span></td>
                </tr>

                <tr className="border-b">
                  <td className="py-2">Baldness Case</td><td>10</td>
                  <td><span className="bg-yellow-200 py-1 px-2 rounded text-xs">Low Stock</span></td>
                </tr>

                <tr className="border-b">
                  <td className="py-2">Bottle Shampoo</td><td>0</td>
                  <td><span className="bg-red-500 text-white py-1 px-2 rounded text-xs">Out Of Stock</span></td>
                </tr>

                <tr className="border-b">
                  <td className="py-2">Sachet Oil</td><td>10</td>
                  <td><span className="bg-yellow-200 py-1 px-2 rounded text-xs">Low Stock</span></td>
                </tr>

                <tr>
                  <td className="py-2">Sachet Shampoo</td><td>10</td>
                  <td><span className="bg-yellow-200 py-1 px-2 rounded text-xs">Low Stock</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Sales */}
        <div className="bg-white rounded-md p-5 shadow-sm mb-6 animate-fade-in-up delay-300">
          <p className="text-h3 font-semibold text-tertiary">Monthly Sales</p>

          <div className="flex justify-around items-end h-32 mt-5">
            <div className="w-8 h-16 border-2 border-black"></div>
            <div className="w-8 h-28 border-2 border-black"></div>
            <div className="w-8 h-20 border-2 border-black"></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
