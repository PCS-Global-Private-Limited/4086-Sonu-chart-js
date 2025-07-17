import { Line } from "react-chartjs-2";

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

const LineChart = ({ products }) => {
    const data = {
        labels: products.map(p => new Date(p.createdAt).toLocaleDateString()),
        datasets: [{
            label: "Quantity Sold Over Time",
            data: products.map(p => p.quantitySold),
            borderColor: "rgba(153,102,255,1)",
            fill: false,
        }],
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                Line chart
            </h1>
            <Line data={data} />
        </div>
    );
};

export default LineChart;
