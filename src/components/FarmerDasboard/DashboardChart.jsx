import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DashboardChart = () => {
  const [chartData, setChartData] = useState({
    labels: ['No. of Products', 'Orders Completed', 'Pending Orders', 'Revenue'],
    datasets: [
      {
        label: 'Order Statistics',
        data: [0, 0, 0, 0], // Initial data
        backgroundColor: ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc'],
        borderColor: ['#4f46e5', '#6366f1', '#818cf8', '#a5b4fc'],
        borderWidth: 1,
      },
    ],
  });

  // Function to fetch and update data
  const fetchData = () => {
    // Example of updating with real data
    setChartData({
      ...chartData,
      datasets: [
        {
          ...chartData.datasets[0],
          data: [7, 5, 3, 10], // Replace with actual fetched data
        },
      ],
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,  // Ensures the chart can change height based on width
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="lg:p-8 h-screen flex flex-col items-center justify-center">
      <h2 className="text-lg lg:text-2xl font-semibold mb-6">Dashboard Overview</h2>
      <div className="relative w-full h-64 md:h-80 lg:h-96">
        {/* The div above will ensure responsive height adjustments */}
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DashboardChart;
