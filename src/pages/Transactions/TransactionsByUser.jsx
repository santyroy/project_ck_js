import { useState } from "react";
import EmptyContainer from "../../components/shared/EmptyContainer";
import Loading from "../../components/shared/Loading";
import { ErrorMessage } from "../../components/shared/Message";
import useAuthContext from "../../hooks/useAuthContext";
import { useFetchTransactionByUser } from "../../hooks/useFetchTransactionByUser";
import TransactionRow from "./TransactionRow";
import PaginationButtons from "../../components/shared/PaginationButtons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const TransactionsByUser = () => {
  const [page, setPage] = useState(0);
  const { user } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();
  const { data, isFetching, isError, error } = useFetchTransactionByUser(
    axiosPrivate,
    user.userId,
    page,
    10
  );

  return (
    <div className="mt-5 bg-white p-3 rounded shadow">
      {isFetching ? (
        <Loading />
      ) : isError ? (
        <div>
          <ErrorMessage message={error.message} />
        </div>
      ) : data?.data?.data.content.length > 0 ? (
        <div>
          <div className="flex mb-4">
            <p className="font-bold w-1/5 text-gray-700 text-xs sm:text-base sm:pl-3">
              Amount (&#8377;)
            </p>
            <p className="font-bold w-1/5 text-gray-700 text-xs sm:text-base">
              Category
            </p>
            <p className="font-bold w-1/5 text-gray-700 text-xs sm:text-base">
              Date
            </p>
            <p className="font-bold w-1/5 text-gray-700 text-xs sm:text-base">
              Budget
            </p>
            <p className="font-bold w-1/5 text-gray-700 text-xs sm:text-base">
              Actions
            </p>
          </div>

          <div className="h-72 overflow-y-auto scroll-smooth">
            {data?.data?.data.content.map((transaction) => (
              <TransactionRow
                key={transaction.date}
                transaction={transaction}
                by="user"
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

export default TransactionsByUser;
