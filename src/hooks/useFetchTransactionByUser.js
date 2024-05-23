import { useQuery } from "@tanstack/react-query";
import { findTransactionsByUser } from "../services/api";

export const useFetchTransactionByUser = (axiosPrivate, userId, page, size) => {
  return useQuery({
    queryKey: ["transactionsByUser", userId, page],
    queryFn: () => findTransactionsByUser(axiosPrivate, userId, page, size),
    staleTime: 5000,
  });
};
