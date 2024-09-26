import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CourseProgressChart = ({ courseProgressData }) => {

  const chartColors = {
    blue: 'rgba(54, 162, 235, 0.8)',
    green: 'rgba(75, 192, 192, 0.8)',
    yellow: 'rgba(255, 206, 86, 0.8)',
    red: 'rgba(255, 99, 132, 0.8)',
  };

  
  
  const data = {
    labels: ['Completed', 'Ongoing', 'Not Started'],
    datasets: [
      {
        data: [
          courseProgressData.completed,
          courseProgressData.ongoing,
          courseProgressData.notStarted,
        ],
        backgroundColor: [chartColors.green, chartColors.yellow, chartColors.red],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Course Progress',
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div style={{ height: '300px' }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};
export default CourseProgressChart;
