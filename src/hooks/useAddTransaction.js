import { useMutation } from "@tanstack/react-query";
import { addTransaction } from "../services/api";
import toast from "react-hot-toast";

export const useAddTransaction = (axiosPrivate, resetField) => {
  return useMutation({
    mutationKey: ["AddTransaction"],
    mutationFn: (data) => addTransaction(axiosPrivate, data),
    onSuccess: () => {
      toast.success("Transaction Added Successfully");
      resetField("amount");
      resetField("category");
      resetField("type");
      resetField("name");
      resetField("quantity");
      resetField("unit");
      resetField("date");
    },
    onError: (error) => toast.success(error),
  });
};
