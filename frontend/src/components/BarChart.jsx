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
        <div className="bg-white rounded-xl shadow-md h-screen">
            <Heading title="Bar chart" />
                <Bar data={data} />
        </div>
    )
};

export default BarChart;
