import { Pie } from "react-chartjs-2";

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

const PieChart = ({ products }) => {
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
        <div className="bg-white rounded-xl shadow-md">
            <Heading title="Pie chart" />
            <Pie data={data} />
        </div>
    );
};

export default PieChart;
