import PropTypes from "prop-types";

const ProgressBar = ({ percentage = 0 }) => {
  const color = percentage < 100 ? "bg-purple-800" : "bg-red-600";
  return (
    <div className="grow">
      <div className="h-4 w-full bg-purple-400/40 rounded-md flex items-center">
        <div
          className={`h-[80%] ${color} rounded-md text-white text-xs font-bold flex justify-center items-center`}
          style={{ width: `${percentage}%` }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number,
};

export default ProgressBar;
