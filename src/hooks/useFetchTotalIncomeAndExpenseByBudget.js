import { useQuery } from "@tanstack/react-query";
import { findTotalIncomeAndExpenseByBudget } from "../services/api";

export const useFetchTotalIncomeAndExpenseByBudget = (
  axiosPrivate,
  budgetId
) => {
  return useQuery({
    queryKey: ["totalIncomeAndExpenseByBudget", budgetId],
    queryFn: () => findTotalIncomeAndExpenseByBudget(axiosPrivate, budgetId),
  });
};
