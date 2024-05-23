import { useQuery } from "@tanstack/react-query";
import { findTotalIncomeAndExpenseByUser } from "../services/api";

export const useFetchTotalIncomeAndExpenseByUser = (axiosPrivate, userId) => {
  return useQuery({
    queryKey: ["totalIncomeAndExpenseByUser", userId],
    queryFn: () => findTotalIncomeAndExpenseByUser(axiosPrivate, userId),
  });
};
