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
                name: p.name,
            })),
            backgroundColor: "rgba(75,192,192,1)",
        }],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const point = context.raw;
                        return `${point.name}: ₹${point.x}, Sold: ${point.y}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Price (₹)',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Quantity Sold',
                }
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4">
            <Heading title="Scatter chart" />
            <Scatter data={data} options={options} />
        </div>
    );
};


export default ScatterChart;
