import PropTypes from "prop-types";
import { FaCirclePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../../components/shared/ProgressBar";

const BudgetCard = ({ budget, totalIncomeAndExpense }) => {
  const navigate = useNavigate();
  const { budgetId, name, type, goal, openDate, members } = budget;

  const totalExpense = totalIncomeAndExpense.expense;
  const result = Math.floor((totalExpense / goal) * 100);
  const goalPercentage = isNaN(result) || result === Infinity ? 0 : result;

  const emails = members?.map((member) => (
    <span key={member.id} className="text-gray-500 text-xs sm:text-sm">
      {member.email}&nbsp;
    </span>
  ));

  return (
    <div className="mb-10 rounded shadow bg-white">
      <h2 className="text-xl sm:text-2xl bg-green-800 p-2 sm:p-3 rounded-t text-slate-100 text-center font-bold">
        Budget Details
      </h2>

      <div className="flex justify-between items-center p-2 sm:p-4 ">
        <section className="w-3/4 sm:mr-5 sm:text-base text-xs flex flex-col gap-2">
          <KeyValue label="ID" content={`# ${budgetId}`} />
          <KeyValue label="Name" content={name} />
          <KeyValue label="Type" content={type} />
          <KeyValue label="Goal" content={`₹ ${goal}`} />
          <KeyValue
            label="Openning Date"
            content={new Date(openDate).toDateString()}
          />
          <KeyValue label="Members" content={emails} />
          <KeyValue
            label="Expenses"
            content={totalExpense ? `₹ ${totalExpense}` : `₹ 0`}
          />

          <div className="flex items-center">
            <span className="font-bold text-gray-700 mr-5">Goal(%): </span>
            <ProgressBar percentage={goalPercentage} />
          </div>
        </section>

        <section className="flex flex-col items-center gap-2">
          <h3 className="text-green-700 font-bold text-center sm:text-base text-sm">
            Add Transaction
          </h3>
          <div className="w-full flex justify-center">
            <button
              className="rounded-full shadow"
              onClick={() =>
                navigate("/addTransaction", { state: { budgetId, name } })
              }
            >
              <FaCirclePlus className="text-2xl sm:text-4xl text-green-700 hover:text-green-800" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

function KeyValue({ label, content, symbol }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between">
      <p className="font-bold text-gray-700 mr-5">{label}: </p>
      <p className="sm:text-right flex flex-col">
        {symbol}
        {content}
      </p>
    </div>
  );
}

KeyValue.propTypes = {
  label: PropTypes.string,
  content: PropTypes.any,
  symbol: PropTypes.string,
};

BudgetCard.propTypes = {
  budget: PropTypes.object.isRequired,
  totalIncomeAndExpense: PropTypes.object.isRequired,
};

export default BudgetCard;
