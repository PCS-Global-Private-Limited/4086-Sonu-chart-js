import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Tooltip,
    Legend,
    Title
);

const BarChart = ({ products }) => {
    const data = {
        labels: products.map(p => p.name),
        datasets: [{
            label: "Quantity Sold",
            data: products.map(p => p.quantitySold),
            backgroundColor: "rgba(75,192,192,0.6)",
        }],
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                Bar chart
            </h1>
            <Bar data={data} />
        </div>
    )
};

export default BarChart;
