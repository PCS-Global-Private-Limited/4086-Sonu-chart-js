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
        <div className="bg-white rounded-xl shadow-md h-screen">
            <Heading title="Bubble chart" />
            <Bubble data={data} />
        </div>
    );
};

export default BubbleChart;
