export const lineChartData = {
  // X-axis
  labels: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  datasets: [
    {
      label: "Steps I",
      data: [3000, 5000, 6000, 8000, 5000, 2000, 6000], // Y-axis
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Steps II",
      data: [1000, 4000, 7000, 4000, 6000, 2700, 6800], // Y-axis
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const barChartData = {
  labels: ["Rent", "Groceries", "Utilities", "Entertainment", "Transportation"],
  datasets: [
    {
      label: "Expenses",
      data: [1200, 300, 150, 180, 100],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
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

export const pieChartData = {
  labels: ["Facebook", "Instagram", "Twitter", "YouTube", "LinkedIn"],
  datasets: [
    {
      label: "Time Spent",
      data: [120, 60, 30, 90, 45],
      backgroundColor: [
        "rgba(255, 99, 132, 0.8)",
        "rgba(54, 162, 235, 0.8)",
        "rgba(255, 206, 86, 0.8)",
        "rgba(75, 192, 192, 0.8)",
        "rgba(153, 102, 255, 0.8)",
      ],
      hoverOffset: 4,
    },
  ],
};
