import { Pie } from "react-chartjs-2";
import { Chart as ChatJS, ArcElement, Tooltip, Legend } from "chart.js";
import { pieChartData } from "./FAKE_DATA";

ChatJS.register(ArcElement, Tooltip, Legend);

const PieGraph = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Social Media Time",
      },
    },
  };
  return <Pie options={options} data={pieChartData} />;
};

export default PieGraph;
