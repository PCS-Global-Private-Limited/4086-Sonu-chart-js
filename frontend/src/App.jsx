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
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import DropZone from "./components/DropZone.jsx"
import DraggableChart from "./components/DraggableChart.jsx"
import { useNavigate } from 'react-router-dom';

function App() {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  // const [droppedChartId, setDroppedChartId] = useState(null);
  const [droppedChartId1, setDroppedChartId1] = useState(null);
  const [droppedChartId2, setDroppedChartId2] = useState(null);

  const navigate = useNavigate()

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

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over?.id === "drop-zone-1") {
      setDroppedChartId1(active.id);
    } else if (over?.id === "drop-zone-2") {
      setDroppedChartId2(active.id);
    }
  };


  const renderChartById = (id, size = "normal") => {
    const chartProps = { products };
    const wrapperClass =
      size === "large"
        ? "w-full h-[80vh] bg-white rounded-xl flex justify-center items-center"
        : "w-full h-full flex justify-center items-center";

    switch (id) {
      case "bar": return <div className={wrapperClass}><BarChart {...chartProps} /></div>;
      case "line": return <div className={wrapperClass}><LineChart {...chartProps} /></div>;
      case "pie": return <div className={wrapperClass}><PieChart {...chartProps} /></div>;
      case "doughtnut": return <div className={wrapperClass}><DoughnutChart {...chartProps} /></div>;
      case "radar": return <div className={wrapperClass}><RadarChart {...chartProps} /></div>;
      case "polar": return <div className={wrapperClass}><PolarAreaChart {...chartProps} /></div>;
      case "bubble": return <div className={wrapperClass}><BubbleChart {...chartProps} /></div>;
      case "scatter": return <div className={wrapperClass}><ScatterChart {...chartProps} /></div>;
      default: return null;
    }
  };


  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        <div className="p-4 bg-white shadow-md flex justify-between items-center sticky top-0">
          <h1 className="sm:text-2xl font-bold">Product Dashboard</h1>
          <div>
            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-600 text-white px-2 sm:px-3 py-1 mx-2 sm:mx-4 rounded-md"
            >
              Add Product
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-md"
            >
              Dashboard
            </button>
          </div>
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
          <div className="flex flex-col gap-y-6 xl:flex-row justify-between items-start md:gap-x-3 p-4">
            <div className="charts-grid grid grid-cols-4 sm:grid-cols-5 xl:grid-cols-1 xl:w-[12rem] gap-x-2 gap-y-4 py-6">
              {["bar", "line", "pie", "doughtnut", "radar", "polar", "bubble", "scatter"]
                .filter((id) => id !== droppedChartId1 && id !== droppedChartId2)
                .map((id) => (
                  <DraggableChart key={id} id={id}>
                    <h1 className="text-center text-[10px]">{id[0].toUpperCase() + id.slice(1)} chart</h1>
                    <div className="bg-white rounded-lg shadow-md h-[5rem] xl:h-[3rem]">
                      {renderChartById(id)}
                    </div>
                  </DraggableChart>
                ))}
            </div>

            <DropZone id="drop-zone-1">
              {droppedChartId1 && renderChartById(droppedChartId1, "large")}
            </DropZone>

            <DropZone id="drop-zone-2">
              {droppedChartId2 && renderChartById(droppedChartId2, "large")}
            </DropZone>
          </div>

        )}
      </div>
    </DndContext>
  );
}

export default App;
