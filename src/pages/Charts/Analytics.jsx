import PageLayout from "../../layouts/PageLayout";
import LoggedInHeader from "../../components/shared/LoggedInHeader";
import LineGraph from "./Line";
import BarGraph from "./Bar";
import PieGraph from "./Pie";
import { useFetchTransactionByUser } from "../../hooks/useFetchTransactionByUser";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import LineTransactionByUser from "./LineTransactionByUser";
import BarTransactionByCategory from "./BarTransactionByCategory";

const Analytics = () => {
  const [page] = useState(0);
  const { user } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();

  const { data } = useFetchTransactionByUser(
    axiosPrivate,
    user.userId,
    page,
    10
  );

  let incomesPerDay = data?.data?.data.content
    .filter((transaction) => transaction.type === "CREDIT")
    .map((income) => {
      return {
        date: new Date(income.date),
        amount: income.amount,
      };
    });

  let expensesPerDay = data?.data?.data.content
    .filter((transaction) => transaction.type === "DEBIT")
    .map((expense) => {
      return {
        date: new Date(expense.date),
        amount: expense.amount,
      };
    });

  let incomesPerCategory = data?.data?.data.content
    .filter((transaction) => transaction.type === "CREDIT")
    .map((income) => {
      return {
        category: income.category,
        amount: income.amount,
      };
    });

  let expensesPerCategory = data?.data?.data.content
    .filter((transaction) => transaction.type === "DEBIT")
    .map((expense) => {
      return {
        category: expense.category,
        amount: expense.amount,
      };
    });

  return (
    <PageLayout>
      <LoggedInHeader />
      <div className="bg-white p-5 shadow rounded flex flex-col gap-16">
        <LineTransactionByUser
          incomes={incomesPerDay}
          expenses={expensesPerDay}
        />

        <div className="min-h-96">
          <BarTransactionByCategory
            incomes={incomesPerCategory}
            expenses={expensesPerCategory}
          />
        </div>

        <div className="mb-40"></div>
        <LineGraph />
        <BarGraph />
        <PieGraph />
      </div>
    </PageLayout>
  );
};

export default Analytics;
