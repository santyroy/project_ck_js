import { useQuery } from "@tanstack/react-query";
import { getBudget } from "../services/api";

export const useGetBudget = (axiosPrivate, budgetId) => {
  return useQuery({
    queryKey: ["budget", budgetId],
    queryFn: () => getBudget(axiosPrivate, budgetId),
  });
};
