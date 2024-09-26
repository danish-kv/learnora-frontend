import React from "react";
import TableWrapper from "./TableWrapper";
import { Calendar, DollarSign, User, CreditCard } from "lucide-react";

export const LatestPaymentsTable = ({ paymentsData }) => {
  if (!paymentsData || paymentsData.length === 0) return null;

  return (
    <TableWrapper title="Latest Payments">
      <ul className="divide-y divide-gray-200">
        {paymentsData.map((payment, index) => (
          <li key={index} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 mr-2" />
                <p className="text-sm font-medium text-gray-900">{payment.user?.username}</p>
              </div>
              <div className="ml-2 flex-shrink-0 flex items-center">
                <DollarSign className="h-5 w-5 text-green-500 mr-1" />
                <p className="text-sm font-semibold text-green-600">${payment.amount}</p>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <CreditCard className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <span className="font-medium mr-2">Type:</span>
                {payment?.access_type}
              </div>
              <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                <span className="font-medium mr-2">Date:</span>
                {new Date(payment.created_at).toLocaleDateString()}
              </div>
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <span className="font-medium mr-2">Status:</span>
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                payment.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {payment.status || 'Pending'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </TableWrapper>
  );
};

export default LatestPaymentsTable;