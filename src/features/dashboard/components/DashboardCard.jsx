import { ArrowUpRight } from "lucide-react";
import React from "react";

const DashboardCard = ({ stats }) => {
  if (!stats) {
    return null;
  }
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white overflow-hidden border shadow-sm rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.label}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {item.value}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCard;
