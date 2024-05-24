import { useEffect, useState } from "react";
import BudgetRow from "./BudgetRow";
import toast from "react-hot-toast";
import EmptyContainer from "../../components/shared/EmptyContainer";
import { useFetchBudgets } from "../../hooks/useFetchBudgets";

import PropTypes from "prop-types";
import Loading from "../../components/shared/Loading";
import PaginationButtons from "../../components/shared/PaginationButtons";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const BudgetList = () => {
  const [page, setPage] = useState(0);
  const [includeMembers, setIncludeMembers] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const { isFetching, isError, error, data } = useFetchBudgets(
    axiosPrivate,
    page,
    includeMembers
  );

  useEffect(() => {
    if (isError) toast.error(error.message);
  }, [isError, error?.message]);

  return (
    <section className="mt-10">
      <div className="bg-green-800 p-3 sm:px-5 sm:py-3 rounded-t flex flex-col gap-2 text-gray-100">
        <div className="flex">
          <h2 className="text-base sm:text-xl font-semibold grow">
            List of Budgets
          </h2>

          <div className="pagination-button-group flex gap-5 sm:gap-14">
            <PaginationButtons
              page={page}
              setPage={setPage}
              isLastPage={data?.data?.data?.last}
            />
          </div>
        </div>

        <hr />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="members"
            className="cursor-pointer accent-yellow-400 h-4 w-4 rounded"
            onChange={() => setIncludeMembers((prev) => !prev)}
          />
          <label htmlFor="members" className="text-sm sm:text-base">
            Group Budgets
          </label>
        </div>
      </div>

      <div className="table-content bg-white shadow">
        {isFetching ? (
          <Loading />
        ) : data?.data?.data?.content.length === 0 ? (
          <EmptyContainer
            heading="No Budgets Yet!"
            description="In order to create a new budget, please click on 'Create Budget' button"
          />
        ) : (
          <div>
            {data?.data?.data?.content.map((budget) => (
              <BudgetRow key={budget.budgetId} budget={budget} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

BudgetList.propTypes = {
  setShowModal: PropTypes.func,
};

export default BudgetList;
