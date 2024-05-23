import useAuthContext from "../../hooks/useAuthContext";
import { useForm } from "react-hook-form";
import FormInput from "../../components/shared/FormInput";
import { ButtonSolid } from "../../components/shared/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "../../components/shared/Message";
import { useLocation } from "react-router-dom";
import PageLayout from "../../layouts/PageLayout";
import { transactionSchema } from "../../schemas/schema";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { categories } from "../../utils/Constants";

const AddTransaction = () => {
  const { user } = useAuthContext();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({ resolver: yupResolver(transactionSchema) });

  const { mutate, isPending } = useAddTransaction(axiosPrivate, resetField);

  const onSubmit = (data) => {
    let transaction = {
      ...data,
      budgetId: location.state.budgetId,
      userId: user.userId,
    };
    mutate(transaction);
  };

  return (
    <PageLayout>
      <div className="bg-white p-8 shadow">
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-green-800">
            Add Transaction
          </h1>
          <p className="text-sm">Please Enter Your Income/Expense</p>
        </div>

        <form
          className="mt-2 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="budgetId"
                className="after:content-['*'] after:ml-0.5 after:text-red-500 mr-2"
              >
                Budget Name:
              </label>
              <div id="budgetId" className="shadow bg-yellow-100">
                <p className="px-2 py-1 rounded-sm">
                  <span className="text-gray-700 font-semibold uppercase">
                    {location.state.name}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="after:content-['*'] after:ml-0.5 after:text-red-500 mb-1">
              Please select a transaction type
            </p>
            <fieldset className="flex gap-5">
              <div className="flex flex-grow items-center ps-4 border rounded border-green-800 bg-green-100 shadow">
                <input
                  id="bordered-radio-1"
                  type="radio"
                  name="bordered-radio"
                  value="CREDIT"
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 accent-green-600"
                  {...register("type")}
                />
                <label
                  htmlFor="bordered-radio-1"
                  className="w-full py-4 ms-2 text-sm font-medium text-green-800"
                >
                  Income
                </label>
              </div>
              <div className="flex flex-grow items-center ps-4 border rounded border-red-800 bg-red-100 shadow">
                <input
                  id="bordered-radio-2"
                  type="radio"
                  name="bordered-radio"
                  value="DEBIT"
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 accent-red-600"
                  {...register("type")}
                />
                <label
                  htmlFor="bordered-radio-2"
                  className="w-full py-4 ms-2 text-sm font-medium text-red-800"
                >
                  Expense
                </label>
              </div>
            </fieldset>
            {errors.type && <ErrorMessage message={errors.type?.message} />}
          </div>
          <div>
            <FormInput
              id="amount"
              label="Amount"
              type="number"
              mandatory={true}
              register={register}
            />
            {errors.amount && <ErrorMessage message={errors.amount?.message} />}
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="category"
              className="after:content-['*'] after:ml-0.5 after:text-red-500 mr-2"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              className="border border-gray-300 rounded py-1 px-2 bg-white text-gray-700 leading-tight focus:outline-none focus:border-2 focus:border-green-700"
              {...register("category")}
            >
              <option value=""></option>
              {categories.map((category, index) => (
                <option key={index} value={category.toUpperCase()}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <ErrorMessage message={errors.category?.message} />
            )}
          </div>

          <div>
            <ButtonSolid
              content={`${isPending ? "Submitting..." : "Submit"}`}
              disabled={isPending}
            />
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default AddTransaction;
