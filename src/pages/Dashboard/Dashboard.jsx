import LoggedInHeader from "../../components/shared/LoggedInHeader";
import SummaryCard from "../../components/shared/SummaryCard";
import PageLayout from "../../layouts/PageLayout";
import useAuthContext from "../../hooks/useAuthContext";
import { useFetchTotalIncomeAndExpenseByUser } from "../../hooks/useFetchTotalIncomeAndExpenseByUser";
import TransactionsByUser from "../Transactions/TransactionsByUser";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Dashboard = () => {
  const { user } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();

  const { data: totalMoney } = useFetchTotalIncomeAndExpenseByUser(
    axiosPrivate,
    user.userId
  );

  return (
    <PageLayout>
      <LoggedInHeader />
      <section className="summary flex flex-row justify-between gap-1">
        <SummaryCard
          transactionType="Total Income"
          amount={totalMoney?.data?.data.income}
        />
        <SummaryCard
          transactionType="Total Expense"
          amount={totalMoney?.data?.data.expense}
        />
      </section>

      <hr className="my-5 h-[1px] bg-gray-300" />

      <h3 className="text-xl text-slate-800 font-bold">Recent Transactions</h3>

      <TransactionsByUser />
    </PageLayout>
  );
};

export default Dashboard;
