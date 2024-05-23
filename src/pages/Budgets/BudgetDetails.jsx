import PageLayout from "../../layouts/PageLayout";
import { useLocation, useNavigate } from "react-router-dom";
import TransactionsByBudget from "../Transactions/TransactionsByBudget";
import { FaBell, FaCirclePlus } from "react-icons/fa6";

import PropTypes from "prop-types";
import { useFetchTotalIncomeAndExpenseByBudget } from "../../hooks/useFetchTotalIncomeAndExpenseByBudget";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import ProgressBar from "../../components/shared/ProgressBar";
import { useFetchTransactionSummaryByBudget } from "../../hooks/useFetchTransactionSummaryByBudget";
import { splitWise } from "../../utils/SplitWise";

const BudgetDetails = () => {
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const { state } = useLocation();
  const { budgetId, name, type, goal, openDate, members } = state;

  const { data: totalIncomeAndExpense } = useFetchTotalIncomeAndExpenseByBudget(
    axiosPrivate,
    budgetId
  );
  const totalExpense = totalIncomeAndExpense?.data?.data?.expense;
  const result = Math.floor((totalExpense / goal) * 100);
  const goalPercentage = isNaN(result) || result === Infinity ? 0 : result;

  const { data: summary } = useFetchTransactionSummaryByBudget(
    axiosPrivate,
    budgetId
  );
  const expenseSummary = summary?.data?.data?.totalIncomeAndExpensePerUsers;
  const payments = splitWise(expenseSummary);

  const emails = members.map((member) => (
    <span key={member.id} className="text-gray-500 text-xs sm:text-sm">
      {member.email}&nbsp;
    </span>
  ));

  const paymentsDetails = payments.map((payment, index) => (
    <div
      key={index}
      className="text-gray-700 sm:m-1 py-1 flex gap-5 items-center"
    >
      <span className="text-orange-600 animate-pulse">
        <FaBell />
      </span>
      <p className="flex flex-wrap text-xs sm:text-sm">
        <span className="mr-2 text-gray-800 font-semibold">{payment.from}</span>
        <span className="mr-2">pays</span>
        <span className="mr-2 text-gray-800 font-semibold">{payment.to}</span>
        <span className="mr-2 text-red-600 font-bold">₹ {payment.amount}</span>
      </p>
    </div>
  ));

  return (
    <PageLayout>
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

      {paymentsDetails.length > 0 && (
        <div className="payment-details mb-10 bg-white rounded shadow">
          <h2 className="text-base sm:text-xl bg-yellow-500 p-2 sm:p-3 rounded-t text-black text-center">
            Payments Details
          </h2>
          <div className="px-2 py-1 sm:px-4 sm:py-2">{paymentsDetails}</div>
        </div>
      )}

      {/* List of all transaction */}
      <TransactionsByBudget budgetId={budgetId} />
    </PageLayout>
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

export default BudgetDetails;
