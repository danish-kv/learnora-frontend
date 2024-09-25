import React from "react";

const DashboardCard = ({ label, value, icon, bgColor }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg ${bgColor} text-white`}>
      <div className="flex items-center">
        <div className="text-3xl mr-4">{icon}</div>
        <div>
          <h4 className="text-lg font-semibold">{label}</h4>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
