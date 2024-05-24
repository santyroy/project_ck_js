import axios from "axios";
import conf from "../conf/conf";

const BASE_URL = conf.baseURL;

export const instance = axios.create({ baseURL: BASE_URL });

export const instancePrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Auth endpoints
export const signupUser = (data) => {
  return instance.post("/auth/register", data);
};

export const verifyOTP = (data) => {
  return instance.post("/auth/verifyOtp", data);
};

export const resendOTP = (data) => {
  return instance.post("/auth/resendOtp", data);
};

export const loginUser = (data) => {
  return instance.post("/auth/login", data, { withCredentials: true });
};

export const forgotPassword = (data) => {
  return instance.post("/auth/forgotPassword", data);
};

export const resetPassword = (data) => {
  return instance.post("/auth/resetPassword", data);
};

export const logoutUser = () => {
  return instance.get("/auth/logout", { withCredentials: true });
};

// Budget endpoints
export const getBudget = (axiosPrivate, budgetId) => {
  return axiosPrivate.get(`/budgets/${budgetId}`);
};

export const addBudget = (axiosPrivate, data) => {
  return axiosPrivate.post("/budgets", data.newBudget);
};

export const updateBudget = (axiosPrivate, data, budgetId) => {
  return axiosPrivate.put(`/budgets/${budgetId}`, data.updateBudget);
};

export const getAllBudgetsByUser = (
  axiosPrivate,
  userId,
  includeMembers = false,
  page = 0,
  size = 5
) => {
  return axiosPrivate.get(
    `/budgets/users/${userId}?page=${page}&size=${size}&members=${includeMembers}`
  );
};

export const deleteBudgetById = (axiosPrivate, budgetId) => {
  return axiosPrivate.delete(`/budgets/${budgetId}`);
};

// User endpoints
export const updateUser = (axiosPrivate, userId, data) => {
  return axiosPrivate.put(`/users/${userId}`, data);
};

// Transaction endpoints
export const addTransaction = (axiosPrivate, data) => {
  return axiosPrivate.post("/transactions", data);
};

export const findTransactionsByUser = (
  axiosPrivate,
  userId,
  page = 0,
  size = 5
) => {
  return axiosPrivate.get(
    `/transactions/users/${userId}?page=${page}&size=${size}`
  );
};

export const findTotalIncomeAndExpenseByUser = (axiosPrivate, userId) => {
  return axiosPrivate.get(`/transactions/total/users/${userId}`);
};

export const findTotalIncomeAndExpenseByBudget = (axiosPrivate, budgetId) => {
  return axiosPrivate.get(`/transactions/total/budgets/${budgetId}`);
};

export const findTransactionSummaryByBudget = (axiosPrivate, budgetId) => {
  return axiosPrivate.get(`/transactions/summary/budgets/${budgetId}`);
};

export const findTransactionsByBudget = (
  axiosPrivate,
  budgetId,
  page = 0,
  size = 5
) => {
  return axiosPrivate.get(
    `/transactions/budgets/${budgetId}?page=${page}&size=${size}`
  );
};

export const deleteTransactionById = (axiosPrivate, id) => {
  return axiosPrivate.delete(`/transactions/${id}`);
};
