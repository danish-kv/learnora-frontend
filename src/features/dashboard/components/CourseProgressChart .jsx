import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const CourseProgressChart = ({ courseProgressData }) => {
  const data = {
    labels: ["Completed", "Ongoing", "Not Started"], 
    datasets: [
      {
        label: "Course Progress",
        data: [
          courseProgressData.completed,
          courseProgressData.ongoing,
          courseProgressData.notStarted,
        ], 
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", 
          "rgba(255, 206, 86, 0.6)", 
          "rgba(255, 99, 132, 0.6)",  
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default CourseProgressChart;
