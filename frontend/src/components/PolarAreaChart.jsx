import { PolarArea } from "react-chartjs-2";

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

const PolarAreaChart = ({ products }) => {
    const categories = [...new Set(products.map(p => p.category))];

    const data = {
        labels: categories,
        datasets: [{
            data: categories.map(cat =>
                products.filter(p => p.category === cat)
                    .reduce((sum, p) => sum + p.quantitySold, 0)
            ),
            backgroundColor: ["#f39c12", "#1abc9c", "#9b59b6", "#2ecc71", "#e74c3c"],
        }],
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                        Polar area chart
                    </h1>
                    <PolarArea data={data} />
                </div>
    );
};

export default PolarAreaChart;
