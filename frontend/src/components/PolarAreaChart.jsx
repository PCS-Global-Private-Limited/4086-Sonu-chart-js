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
  const productNames = products.map(p => p.name);
  const quantities = products.map(p => p.quantitySold);

  const data = {
    labels: productNames,
    datasets: [{
      data: quantities,
      backgroundColor: [
        "#f39c12", "#1abc9c", "#9b59b6", "#2ecc71", "#e74c3c",
        "#FF6384", "#36A2EB", "#FFCE56", "#8e44ad", "#34495e"
      ],
    }],
  };

  return (
    <PolarArea data={data} />
  );
};


export default PolarAreaChart;
