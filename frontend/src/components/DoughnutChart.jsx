import { Doughnut } from "react-chartjs-2";

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

const DoughnutChart = ({ products }) => {
    const categories = [...new Set(products.map(p => p.category))];

    const data = {
        labels: categories,
        datasets: [{
            data: categories.map(cat =>
                products.filter(p => p.category === cat)
                    .reduce((sum, p) => sum + p.quantitySold, 0)
            ),
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8e44ad", "#2ecc71"],
        }],
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                Doughtnut chart
            </h1>
            <Doughnut data={data} />
        </div>
    );
};

export default DoughnutChart;
