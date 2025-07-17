import { Scatter } from "react-chartjs-2";

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

const ScatterChart = ({ products }) => {
    const data = {
        datasets: [{
            label: "Price vs Quantity Sold",
            data: products.map(p => ({
                x: p.price,
                y: p.quantitySold,
            })),
            backgroundColor: "rgba(75,192,192,1)",
        }],
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                Scatter chart
            </h1>
            <Scatter data={data} />
        </div>
    )
};

export default ScatterChart;
