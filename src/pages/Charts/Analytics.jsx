import PageLayout from "../../layouts/PageLayout";
import LoggedInHeader from "../../components/shared/LoggedInHeader";
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
    100
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
        <div className="min-h-80">
          <LineTransactionByUser
            incomes={incomesPerDay}
            expenses={expensesPerDay}
          />
        </div>

        <div className="min-h-80">
          <BarTransactionByCategory
            incomes={incomesPerCategory}
            expenses={expensesPerCategory}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default Analytics;
