import PropTypes from "prop-types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  consolidateTransactionsByDate,
  extractUniqueDates,
} from "../../utils/AnalyticsData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineTransactionByUser = ({ incomes = [], expenses = [] }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Income vs Expense",
      },
    },
  };

  // create labels for X-axis started
  let labels = [];
  let temp = new Set();
  let incomeLabels = extractUniqueDates(incomes);
  incomeLabels.forEach((i) => temp.add(i));
  let expenseLabels = extractUniqueDates(expenses);
  expenseLabels.forEach((i) => temp.add(i));

  // Custom sort function for date strings in "dd/MM/yyyy" format
  const customSortV2 = (a, b) => {
    const [dayA, monthA, yearA] = a.split("/");
    const [dayB, monthB, yearB] = b.split("/");
    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
    return dateA - dateB;
  };

  labels = Array.from(temp).sort(customSortV2);
  // create labels for X-axis ended

  // // create data for Y-axis started
  let expenseData = consolidateTransactionsByDate(expenses);
  const expenseDataSet = labels.map((label) =>
    expenseData[label] !== undefined ? expenseData[label] : 0
  );

  let incomeData = consolidateTransactionsByDate(incomes);
  const incomeDataSet = labels.map((label) =>
    incomeData[label] !== undefined ? incomeData[label] : 0
  );
  // // create data for Y-axis ended

  // create lineChartData
  const lineChartDataV2 = {
    labels,
    datasets: [
      {
        label: "Income",
        data: incomeDataSet,
        borderColor: "rgb(21, 128, 61)",
        backgroundColor: "rgba(21, 128, 61, 0.5)",
      },
      {
        label: "Expense",
        data: expenseDataSet,
        borderColor: "rgb(185, 28, 28)",
        backgroundColor: "rgba(185, 28, 28, 0.5)",
      },
    ],
  };

  return <Line options={options} data={lineChartDataV2} />;
};

LineTransactionByUser.propTypes = {
  incomes: PropTypes.array,
  expenses: PropTypes.array,
};

export default LineTransactionByUser;
