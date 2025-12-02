import { useEffect, useState, useRef } from "react";
import {
  FiPackage,
  FiShoppingCart,
  FiGrid,
} from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { RiFileExcel2Line } from "react-icons/ri";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

// APIs
import { getAllProducts } from "../../api/productApi";
import { getCategories } from "../../api/categoryApi";
import { getOrders } from "../../api/OrderApi";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);

  const chartRef = useRef(null);
  const tableRef = useRef(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const productRes = await getAllProducts();
      setProducts(productRes.data || []);

      const categoryRes = await getCategories();
      setCategories(categoryRes.categories || []);

      const orderRes = await getOrders();
      setOrders(orderRes.orders || []);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    }
  };

  //  STATISTICS 
  const totalProducts = products.length;
  const totalSales = orders.filter((o) => o.status === "Delivered").length;
  const categoryCount = categories.length;

  //  INVENTORY TABLE 
  const inventory = products.map((p) => ({
    name: p.productName,
    stock: p.stock,
    status:
      p.stock === 0 ? "out" : p.stock <= 10 ? "low" : "in",
  }));

  //  EXPORT INVENTORY TABLE TO PDF 
  const exportTablePDF = () => {
    html2canvas(tableRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = 190;
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 10, 10, width, height);
      pdf.save("product_inventory.pdf");
    });
  };

  //  EXPORT INVENTORY TABLE TO EXCEL 
  const exportTableExcel = () => {
    const data = inventory.map((i) => ({
      Product: i.name,
      Stock: i.stock,
      Status: i.status,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Inventory");
    XLSX.writeFile(wb, "product_inventory.xlsx");
  };

  //  MONTHLY SALES 
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(2025, i).toLocaleString("default", { month: "short" })
  );

  const monthlySales = new Array(12).fill(0);

  orders.forEach((o) => {
    if (o.status === "Delivered") {
      const m = new Date(o.createdAt).getMonth();
      monthlySales[m] += o.totalAmount;
    }
  });

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Sales (Rs)",
        data: monthlySales,
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  const chartOptions = { responsive: true };

  //  EXPORT GRAPH PDF 
  const exportGraphPDF = () => {
    html2canvas(chartRef.current).then((canvas) => {
      const pdf = new jsPDF();
      const img = canvas.toDataURL("image/png");
      pdf.addImage(img, "PNG", 10, 10, 190, 120);
      pdf.save("monthly_sales_graph.pdf");
    });
  };

  //  EXPORT GRAPH EXCEL 
  const exportGraphExcel = () => {
    const data = months.map((m, i) => ({
      Month: m,
      Sales: monthlySales[i],
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, "Monthly Sales");
    XLSX.writeFile(wb, "monthly_sales.xlsx");
  };

  return (
    <div className="w-full min-h-screen bg-secondary p-3 font-paragraph flex justify-center animate-fade-in-up">
      <div className="w-full max-w-6xl">

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

          {/* Total Products */}
          <div className="relative bg-white rounded-md p-5 shadow-sm animate-slide-in-left">
            <p className="text-h3 text-tertiary font-semibold">Total Products</p>
            <h1 className="text-h1 font-bold mt-1 text-primary">{totalProducts}</h1>
            <FiPackage className="absolute right-4 top-4 text-3xl text-icon" />
          </div>

          {/* Total Sales */}
          <div className="relative bg-white rounded-md p-5 shadow-sm animate-slide-in-left delay-200">
            <p className="text-h3 text-tertiary font-semibold">Total Sales</p>
            <h1 className="text-h1 font-bold mt-1 text-primary">{totalSales}</h1>
            <FiShoppingCart className="absolute right-4 top-4 text-3xl text-icon" />
          </div>

          {/* Categories */}
          <div className="relative bg-white rounded-md p-5 shadow-sm animate-slide-in-left delay-300">
            <p className="text-h3 text-tertiary font-semibold">Category</p>
            <h1 className="text-h1 font-bold mt-1 text-primary">{categoryCount}</h1>
            <FiGrid className="absolute right-4 top-4 text-3xl text-icon" />
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white p-5 rounded-md shadow-sm my-6 animate-fade-in-up delay-200">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-primary text-h2">Inventory Status</h2>

            <div className="flex gap-2">
              <button
                onClick={exportTablePDF}
                className="px-3 py-1 text-sm bg-red-300 rounded flex items-center gap-1"
              >
                <HiOutlineDocumentText className="text-lg" /> PDF
              </button>

              <button
                onClick={exportTableExcel}
                className="px-3 py-1 text-sm bg-green rounded flex items-center gap-1"
              >
                <RiFileExcel2Line className="text-lg" /> Excel
              </button>
            </div>
          </div>

          <div ref={tableRef} className="overflow-x-auto">
            <table className="w-full text-sm min-w-[400px]">
              <thead>
                <tr className="text-left text-tertiary text-xs border-b">
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Stock</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {inventory.map((item, idx) => (
                  <tr key={idx} className="border-b">
                    <td className="py-2">{item.name}</td>
                    <td>{item.stock}</td>

                    <td>
                      {item.status === "low" && (
                        <span className="bg-yellow-200 py-1 px-2 rounded text-xs">Low Stock</span>
                      )}
                      {item.status === "in" && (
                        <span className="bg-green py-1 px-2 rounded text-xs">In Stock</span>
                      )}
                      {item.status === "out" && (
                        <span className="bg-red-500 text-white py-1 px-2 rounded text-xs">
                          Out Of Stock
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Sales Graph */}
        <div className="bg-white rounded-md p-5 shadow-sm mb-6 animate-fade-in-up delay-300">
          <div className="flex justify-between items-center">
            <p className="text-h3 font-semibold text-tertiary">Monthly Sales</p>

            <div className="flex gap-2">
              <button
                onClick={exportGraphPDF}
                className="px-3 py-1 text-sm bg-red-300 rounded flex items-center gap-1"
              >
                <HiOutlineDocumentText className="text-lg" /> PDF
              </button>

              <button
                onClick={exportGraphExcel}
                className="px-3 py-1 text-sm bg-green rounded flex items-center gap-1"
              >
                <RiFileExcel2Line className="text-lg" /> Excel
              </button>
            </div>
          </div>

          <div ref={chartRef} className="mt-5">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
