import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Filler, Legend);

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const chartData = {
    labels,
    datasets: [
      {
        label: 'Repair NPS (P)',
        data: [5, 4, 3, 2, 1.5, 1.5, 3, 5, 2, 4, 3, 1],
        // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        fill: true,
        borderColor: 'rgba(254, 225, 134, 0.5)',
        backgroundColor: 'rgba(254, 225, 134, 0.5)',
        // tension: 0.1,
        yAxisID: 'y',
      },
      {
        label: 'Volume (C)',
        data: [3.5, 3.5, 0.5, 0.7, 0.7, 3.7, 3.7, 0.5, 0.5, 0, 0.8, 3.8],
        fill: true,
        borderColor: 'rgba(193, 146, 146, 0.5)',
        backgroundColor: 'rgba(193, 146, 146, 0.5)',
      },
      {
        label: 'Reclaim (%)',
        data: [4.5, 5, 1, 1.5, 1.5, 5.1, 4.9, 1.8, 1.2, 1.2, 1.5, 4.7],
        fill: true,
        borderColor: "rgba(197, 179, 175, 0.5)",
        backgroundColor: "rgba(197, 179, 175, 0.5)",
      },
      {
        label: 'RTAT (D)',
        data: [4, 4.2, 0.7, 0.9, 0.8, 4.2, 4.2, 1.1, 0.5, 0.4, 1, 4],
        fill: true,
        borderColor: "rgba(225, 206, 192, 0.5)",
        backgroundColor: "rgba(225, 206, 192, 0.5)",
      }
    ]
};

const chartOptions = {
    interaction: {
        mode: 'index',
        intersect: false,
    },
    resize: true,
    maxBarThickness: 15,
    maintainAspectRatio :false,
    plugins: {
        legend: {
          position: 'top',
        //   display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => `Value: ${context.parsed.y}`,
            },
        },
    },
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        max: 6,
        min: 0,
      },
      y_sub: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        max: 160,
        min: 0,
      },
    },
};

const LineChart = () => {
    return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;