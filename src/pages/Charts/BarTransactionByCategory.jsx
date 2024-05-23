import PropTypes from "prop-types";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  consolidateExpenses,
  extractUniqueLabels,
} from "../../utils/AnalyticsData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarTransactionByCategory = ({ expenses = [] }) => {
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Expenses based on Category",
      },
    },
  };

  let labels = extractUniqueLabels(expenses, "category");
  let expenseData = consolidateExpenses(expenses);

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Expenses",
        data: expenseData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Bar options={options} data={barChartData} />;
};

BarTransactionByCategory.propTypes = {
  incomes: PropTypes.array,
  expenses: PropTypes.array,
};

export default BarTransactionByCategory;
