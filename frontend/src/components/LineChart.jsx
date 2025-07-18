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
        <div className="bg-white rounded-xl shadow-md">
            <Heading title="Line chart" />
            <Line data={data} />
        </div>
    );
};

export default LineChart;
