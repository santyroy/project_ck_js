import { useQuery } from "@tanstack/react-query";
import { findTransactionsByBudget } from "../services/api";

export const useFetchTransactionsByBudget = (
  axiosPrivate,
  budgetId,
  page,
  size
) => {
  return useQuery({
    queryKey: ["transactionsByBudget", budgetId, page],
    queryFn: () => findTransactionsByBudget(axiosPrivate, budgetId, page, size),
  });
};
