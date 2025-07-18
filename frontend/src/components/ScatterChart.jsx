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
        <div className="bg-white rounded-xl shadow-md">
            <Heading title="Radar chart" />
            <Scatter data={data} />
        </div>
    )
};

export default ScatterChart;
