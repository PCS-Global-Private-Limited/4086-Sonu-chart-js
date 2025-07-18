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
import Heading from "./Heading";

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
        <div className="bg-white rounded-xl shadow-md h-screen">
            <Heading title="Polar area chart" />
            <PolarArea data={data} />
        </div>
    )
};

export default PolarAreaChart;
