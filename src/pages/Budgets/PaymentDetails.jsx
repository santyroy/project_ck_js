import PropTypes from "prop-types";
import { splitWise } from "../../utils/SplitWise";
import { FaBell } from "react-icons/fa6";

const PaymentDetails = ({ summary }) => {
  const expenseSummary = summary?.data?.data?.totalIncomeAndExpensePerUsers;
  const allBudgetMembers = summary?.data?.data?.allBudgetMembers;

  // Iterate through allBudgetMembers and update the expenseSummary with empty object for non transacted members
  allBudgetMembers.forEach((email) => {
    if (!Object.prototype.hasOwnProperty.call(expenseSummary, email)) {
      expenseSummary[email] = { income: 0, expense: 0 };
    }
  });

  const payments = splitWise(expenseSummary);

  const paymentsDetails = payments.map((payment, index) => (
    <div
      key={index}
      className="text-gray-700 sm:m-1 py-1 flex gap-5 items-center"
    >
      <span className="text-orange-600">
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
    <>
      {paymentsDetails.length > 0 && (
        <div className="payment-details mb-10 bg-white rounded shadow">
          <h2 className="text-base sm:text-xl bg-yellow-500 p-2 sm:p-3 rounded-t text-black text-center">
            Payments Details
          </h2>
          <div className="px-2 py-1 sm:px-4 sm:py-2">{paymentsDetails}</div>
        </div>
      )}
    </>
  );
};

PaymentDetails.propTypes = {
  summary: PropTypes.object,
};

export default PaymentDetails;
