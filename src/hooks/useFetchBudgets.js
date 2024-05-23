import { keepPreviousData, useQuery } from "@tanstack/react-query";
import useAuthContext from "./useAuthContext";
import { getAllBudgetsByUser } from "../services/api";

export const useFetchBudgets = (axiosPrivate, page, includeMembers) => {
  const { user } = useAuthContext();

  return useQuery({
    queryKey: ["budgets", user.userId, page, includeMembers],
    queryFn: () =>
      getAllBudgetsByUser(axiosPrivate, user.userId, includeMembers, page),
    placeholderData: keepPreviousData,
    staleTime: 10000,
  });
};
