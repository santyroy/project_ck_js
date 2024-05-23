import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import OneTimePassword from "./pages/Auth/OneTimePassword.jsx";
import Login from "./pages/Auth/Login.jsx";
import ForgotPassword from "./pages/Auth/ForgotPassword.jsx";
import ResetPassword from "./pages/Auth/ResetPassword.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Budgets from "./pages/Budgets/Budgets.jsx";
import Analytics from "./pages/Charts/Analytics.jsx";
import AddTransaction from "./pages/Transactions/AddTransaction.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import App from "./App.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

import "./index.css";
import BudgetDetails from "./pages/Budgets/BudgetDetails.jsx";
import Profile from "./pages/Profile/Profile.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "signup", element: <Signup /> },
      { path: "otp", element: <OneTimePassword /> },
      { path: "login", element: <Login /> },
      { path: "forgotPassword", element: <ForgotPassword /> },
      { path: "resetPassword", element: <ResetPassword /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "addTransaction", element: <AddTransaction /> },
          { path: "budgets", element: <Budgets /> },
          { path: "budgets/:budgetId", element: <BudgetDetails /> },
          { path: "analytics", element: <Analytics /> },
          { path: "profile", element: <Profile /> },
        ],
      },
      { path: "app", element: <App /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
