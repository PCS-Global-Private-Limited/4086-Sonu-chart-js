import { Bubble } from "react-chartjs-2";

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

const BubbleChart = ({ products }) => {
    const data = {
        datasets: products.slice(0, 6).map((p, i) => ({
            label: p.name,
            data: [{
                x: p.price,
                y: p.quantitySold,
                r: Math.max(5, p.quantitySold / 5), // Bubble size
            }],
            backgroundColor: `hsl(${i * 60}, 70%, 60%)`,
        })),
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">
                Bubble chart
            </h1>
            <Bubble data={data} />
        </div>
    );
};

export default BubbleChart;
