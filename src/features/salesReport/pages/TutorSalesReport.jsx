import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "@/services/api";
import { displayToastAlert } from "@/utils/displayToastAlert";
import { Calendar, DollarSign, BarChart2, Download } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const TutorSalesReport = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const summaryRef = useRef(null);

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      displayToastAlert(300, "Please select both start and end dates.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.get(
        `tutor/sales-report/?start=${startDate.toISOString()}&end=${endDate.toISOString()}`
      );
      setSalesData(res.data.sales || []);
    } catch (error) {
      console.error("Failed to fetch sales data:", error);
      displayToastAlert(500, "Failed to fetch sales data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getTotalSales = () => {
    return salesData.reduce((total, sale) => total + sale.total_sales, 0);
  };

  const getTotalAmount = () => {
    return salesData
      .reduce((total, sale) => total + parseFloat(sale.total_amount), 0)
      .toFixed(2);
  };

  const handleDownloadPDF = () => {
    if (summaryRef.current) {
      html2canvas(summaryRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("sales_summary.pdf");
      });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-700">Sales Report</h2>

      <div className="bg-white p-6 border rounded-lg shadow-sm mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                className="p-2 border border-gray-300  rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full"
                placeholderText="Select Start Date"
                dateFormat="yyyy-MM-dd"
                required
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-full"
                placeholderText="Select End Date"
                dateFormat="yyyy-MM-dd"
                required
              />
            </div>
          </div>
          <button
            onClick={handleGenerateReport}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out flex items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Generating...
              </span>
            ) : (
              <>
                <BarChart2 className="mr-2" size={20} />
                Generate Report
              </>
            )}
          </button>
        </div>
      </div>

      {salesData.length > 0 ? (
        <div className="bg-white p-6 border rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Sales Summary
            </h3>
            <div className="space-x-2">
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out flex items-center"
              >
                <Download className="mr-2" size={20} />
                Download PDF
              </button>
            </div>
          </div>

          <div ref={summaryRef}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="text-blue-500 mr-2" size={24} />
                  <span className="text-lg font-semibold text-blue-700">
                    Date Range
                  </span>
                </div>
                <p className="mt-2 text-sm text-blue-600">
                  {startDate?.toLocaleDateString()} -{" "}
                  {endDate?.toLocaleDateString()}
                </p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <BarChart2 className="text-green-500 mr-2" size={24} />
                  <span className="text-lg font-semibold text-green-700">
                    Total Sales
                  </span>
                </div>
                <p className="mt-2 text-2xl font-bold text-green-600">
                  {getTotalSales()}
                </p>
              </div>
              <div className="bg-purple-100 p-4 rounded-lg">
                <div className="flex items-center">
                  <DollarSign className="text-purple-500 mr-2" size={24} />
                  <span className="text-lg font-semibold text-purple-700">
                    Total Revenue
                  </span>
                </div>
                <p className="mt-2 text-2xl font-bold text-purple-600">
                  {getTotalAmount()}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      SI
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Sales
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData.map((sale, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {sale?.course_title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale?.total_sales}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sale?.total_amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg border shadow-sm text-center">
          <p className="text-lg text-gray-500">
            No data to display. Please generate a report.
          </p>
        </div>
      )}
    </div>
  );
};

export default TutorSalesReport;
