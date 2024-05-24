import { useState } from "react";
import EmptyContainer from "../../components/shared/EmptyContainer";
import Loading from "../../components/shared/Loading";
import { ErrorMessage } from "../../components/shared/Message";
import { useFetchTransactionsByBudget } from "../../hooks/useFetchTransactionsByBudget";
import TransactionRow from "./TransactionRow";
import PaginationButtons from "../../components/shared/PaginationButtons";

import PropTypes from "prop-types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const TransactionsByBudget = ({ budgetId }) => {
  const [page, setPage] = useState(0);
  const axiosPrivate = useAxiosPrivate();

  const { data, isFetching, isError, error } = useFetchTransactionsByBudget(
    axiosPrivate,
    budgetId,
    page,
    10
  );

  return (
    <div className="bg-white p-3 rounded shadow">
      {isFetching ? (
        <Loading />
      ) : isError ? (
        <div>
          <ErrorMessage message={error.message} />
        </div>
      ) : data?.data?.data.content.length > 0 ? (
        <div>
          <div className="flex flex-col mb-4 gap-2 sm:flex-row sm:gap-0">
            <p className="font-bold w-1/6 text-gray-700 text-xs sm:text-base sm:pl-3">
              Amount (&#8377;)
            </p>
            <p className="font-bold w-1/6 text-gray-700 text-xs sm:text-base">
              Category
            </p>
            <p className="font-bold w-1/6 text-gray-700 text-xs sm:text-base">
              Date
            </p>
            <p className="font-bold w-1/6 text-gray-700 text-xs sm:text-base">
              Budget
            </p>
            <p className="font-bold w-1/6 text-gray-700 text-xs sm:text-base">
              User
            </p>
            <p className="font-bold w-1/6 text-gray-700 text-xs sm:text-base">
              Action
            </p>
          </div>

          <div className="h-80 overflow-y-auto scroll-smooth">
            {data?.data?.data.content.map((transaction) => (
              <TransactionRow
                key={transaction.date}
                transaction={transaction}
              />
            ))}
          </div>

          <div className="mt-4">
            <PaginationButtons
              page={page}
              setPage={setPage}
              isLastPage={data?.data?.data?.last}
            />
          </div>
        </div>
      ) : (
        <EmptyContainer
          heading="No Transactions"
          description="All Your Transactions Appear Here"
        />
      )}
    </div>
  );
};

TransactionsByBudget.propTypes = {
  budgetId: PropTypes.number.isRequired,
};

export default TransactionsByBudget;
