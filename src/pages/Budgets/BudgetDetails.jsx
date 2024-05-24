import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useGetBudget } from "../../hooks/useGetBudget";
import { useFetchTotalIncomeAndExpenseByBudget } from "../../hooks/useFetchTotalIncomeAndExpenseByBudget";
import { useFetchTransactionSummaryByBudget } from "../../hooks/useFetchTransactionSummaryByBudget";
import PageLayout from "../../layouts/PageLayout";
import TransactionsByBudget from "../Transactions/TransactionsByBudget";
import PaymentDetails from "./PaymentDetails";
import Loading from "../../components/shared/Loading";
import BudgetCard from "./BudgetCard";

const BudgetDetails = () => {
  const { budgetId } = useParams();
  const axiosPrivate = useAxiosPrivate();

  // Data for BudgetCard
  const { data: budget, isPending: isPending1 } = useGetBudget(
    axiosPrivate,
    budgetId
  );
  const { data: totalIncomeAndExpense, isPending: isPending2 } =
    useFetchTotalIncomeAndExpenseByBudget(axiosPrivate, budgetId);

  // Data for PaymentDetails
  const { data: summary, isPending: isPending3 } =
    useFetchTransactionSummaryByBudget(axiosPrivate, budgetId);

  return (
    <PageLayout>
      <div className="bg-white p-3 rounded shadow">
        {isPending1 || isPending2 ? (
          <Loading />
        ) : (
          <BudgetCard
            budget={budget?.data?.data}
            totalIncomeAndExpense={totalIncomeAndExpense?.data?.data}
          />
        )}
      </div>

      <div className="bg-white p-3 rounded shadow">
        {isPending3 ? <Loading /> : <PaymentDetails summary={summary} />}
      </div>

      {/* List of all transaction */}
      <TransactionsByBudget budgetId={budgetId} />
    </PageLayout>
  );
};

export default BudgetDetails;
