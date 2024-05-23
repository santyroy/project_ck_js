import PropTypes from "prop-types";

const SummaryCard = ({ transactionType, amount = 0 }) => {
  const bgColor = transactionType.toLowerCase().includes("income")
    ? "bg-green-700"
    : "bg-red-700";

  return (
    <div className={`row w-fit flex p-3 ${bgColor} rounded text-white`}>
      <div className="card card-income pr-5">
        <h4 className="font-semibold">{transactionType}</h4>
        <h4 className="font-bold">&#8377; {amount}</h4>
      </div>
    </div>
  );
};

SummaryCard.propTypes = {
  transactionType: PropTypes.string.isRequired,
  amount: PropTypes.number,
};

SummaryCard.defaultValue;

export default SummaryCard;
