import { Radar } from "react-chartjs-2";

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
    RadialLinearScale,
} from 'chart.js';
import Heading from "./Heading";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    RadialLinearScale,
    Tooltip,
    Legend,
    Title
);

const RadarChart = ({ products }) => {
    const topProducts = products.slice(0, 5);

    const data = {
        labels: topProducts.map(p => p.name),
        datasets: [
            {
                label: "Price",
                data: topProducts.map(p => p.price),
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
            },
            {
                label: "Quantity Sold",
                data: topProducts.map(p => p.quantitySold),
                backgroundColor: "rgba(54,162,235,0.2)",
                borderColor: "rgba(54,162,235,1)",
            }
        ],
    };

    return (
        <div className="bg-white rounded-xl shadow-md h-screen">
            <Heading title="Radar chart" />
            <Radar data={data} />
        </div>
    );
};

export default RadarChart;
