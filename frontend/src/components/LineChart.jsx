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
        labels: products.map(p => p.name),
        datasets: [{
            label: "Quantity Sold",
            data: products.map(p => p.quantitySold),
            borderColor: "rgba(153,102,255,1)",
            backgroundColor: "rgba(153,102,255,0.2)",
            fill: true,
            tension: 0.3, // smooth curve
            pointRadius: 5,
            pointHoverRadius: 7,
        }],
    };

    return (
         <Line data={data} />
    );
};

export default LineChart;
