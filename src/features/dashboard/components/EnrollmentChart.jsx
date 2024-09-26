import React from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const chartColors = {
  blue: 'rgba(54, 162, 235, 0.8)',
  green: 'rgba(75, 192, 192, 0.8)',
  yellow: 'rgba(255, 206, 86, 0.8)',
  red: 'rgba(255, 99, 132, 0.8)',
};

const EnrollmentChart = ({ enrollmentData }) => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oc', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Enrollments',
        data: enrollmentData,
        backgroundColor: chartColors.blue,
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Enrollments',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Enrollments',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div style={{ height: '300px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};






export default EnrollmentChart