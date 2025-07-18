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
    const productNames = products.map(p => p.name);
    const quantities = products.map(p => p.quantitySold);

    const data = {
        labels: productNames,
        datasets: [{
            data: quantities,
            backgroundColor: [
                "#FF6384", "#36A2EB", "#FFCE56", "#8e44ad", "#2ecc71",
                "#f39c12", "#1abc9c", "#e74c3c", "#34495e", "#9b59b6"
            ],
        }],
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-4">
            <Heading title="Pie chart" />
            <Pie data={data} />
        </div>
    );
};




export default PieChart;
