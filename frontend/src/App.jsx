import { useEffect, useState } from "react";
import AddProductModal from "./modals/AddProductModal.jsx";
import BarChart from "./components/BarChart.jsx";
import LineChart from "./components/LineChart.jsx";
import PieChart from "./components/PieChart.jsx";
import DoughnutChart from "./components/DoughnutChart.jsx";
import RadarChart from "./components/RadarChart.jsx";
import PolarAreaChart from "./components/PolarAreaChart.jsx";
import BubbleChart from "./components/BubbleChart.jsx";
import ScatterChart from "./components/ScatterChart.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URI}/api/fetch-all-product`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Fetch error:", err));
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URI}/api/add-product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Add product error:", error);
    }
  };

  return (
    <div>
      <div className="p-4 bg-white shadow-md flex justify-between items-center sticky top-0">
        <h1 className="text-2xl font-bold">Product Dashboard</h1>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </button>
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center underline">
        Quantity Sold Overview 📦
      </h1>

      {modalOpen && (
        <AddProductModal
          onClose={() => setModalOpen(false)}
          onAdd={handleAddProduct}
        />
      )}

      {products.length === 0 ? (
        <div className="h-[80vh] flex flex-col items-center justify-center bg-gray-100">
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">No Products Found</h2>
          <p className="text-lg text-gray-500">Please add some products to visualize the data.</p>
        </div>
      ) : (
        <div className="charts-grid">
          <BarChart products={products} />
          <LineChart products={products} />
          <PieChart products={products} />
          <DoughnutChart products={products} />
          <RadarChart products={products} />
          <PolarAreaChart products={products} />
          <BubbleChart products={products} />
          <ScatterChart products={products} />
        </div>
      )}
    </div>
  );
}

export default App;
