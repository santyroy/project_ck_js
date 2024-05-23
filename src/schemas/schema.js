import * as yup from "yup";

export const signupSchema = yup
  .object({
    name: yup.string().required("Name is mandatory"),
    email: yup
      .string()
      .required("Email is mandatory")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      ),
    password: yup
      .string()
      .required("Password is mandatory")
      .min(8, "Min. 8 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is mandatory")
      .oneOf([yup.ref("password")], "Password mismatch"),
  })
  .required();

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is mandatory")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      ),
    password: yup.string().required("Password is mandatory"),
  })
  .required();

export const resetPasswordSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is mandatory")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      ),
    otp: yup
      .number()
      .required("OTP is mandatory")
      .typeError("OTP must be a number")
      .positive("OTP must be positive")
      .min(100000, "OTP must be 6 characters")
      .max(999999, "OTP must be 6 characters"),
    password: yup
      .string()
      .required("Password is mandatory")
      .min(8, "Min. 8 characters"),
    confirmPassword: yup
      .string()
      .required("Confirm Password is mandatory")
      .oneOf([yup.ref("password")], "Password mismatch"),
  })
  .required();

export const otpSchema = yup
  .object({
    otp: yup
      .number()
      .required("OTP is mandatory")
      .typeError("OTP must be a number")
      .positive("OTP must be positive")
      .min(100000, "OTP must be 6 characters")
      .max(999999, "OTP must be 6 characters"),
  })
  .required();

export const forgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is mandatory")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      ),
  })
  .required();

export const transactionSchema = yup
  .object({
    amount: yup
      .number()
      .required("Amount is mandatory")
      .typeError("Amount should be number")
      .positive(),
    category: yup.string().required("Category is mandatory"),
    type: yup.string().required("Type of transaction is mandatory"),
  })
  .required();

export const addUpdateBudgetSchema = yup
  .object({
    name: yup.string().required("Budget Name is mandatory"),
    type: yup.string(),
    goal: yup
      .number()
      .typeError("Goal must be a number")
      .transform((_, val) => (val !== "" ? Number(val) : 0)),
    memberEmails: yup.string(),
  })
  .required();

export const updateProfileSchema = yup
  .object()
  .shape({
    name: yup.string().required("Name is mandatory"),
  })
  .required();
