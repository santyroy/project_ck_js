import FormInput from "../../components/shared/FormInput";
import { ButtonSolid } from "../../components/shared/Button";
import { FaCircleInfo, FaXmark } from "react-icons/fa6";
import { ErrorMessage } from "../../components/shared/Message";

import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthContext from "../../hooks/useAuthContext";
import { useAddBudget } from "../../hooks/useAddBudget";
import { useUpdateBudget } from "../../hooks/useUpdateBudget";
import { addUpdateBudgetSchema } from "../../schemas/schema";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const BudgetModal = ({ setShowModal, budget, isEdit = false }) => {
  const { user } = useAuthContext();
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addUpdateBudgetSchema),
    defaultValues: async () => {
      if (budget) {
        const { members } = budget;
        let temp = "";
        members.forEach((member, index) => {
          if (index == members.length - 1) {
            temp = temp + member.email;
          } else {
            temp = temp + member.email + ",";
          }
        });
        return { ...budget, memberEmails: temp };
      }
    },
  });

  const { mutate: addBudgetMutation, isPending: addBudgetPending } =
    useAddBudget(axiosPrivate, setShowModal);

  const { mutate: updateBudgetMutation, isPending: updateBudgetPending } =
    useUpdateBudget(axiosPrivate, setShowModal, budget?.budgetId);

  const onSubmitAddBudget = (data) => {
    let newBudget = { ...data };
    const memberEmails = data.memberEmails;
    let filteredEmails = [];
    if (memberEmails !== "") {
      filteredEmails = memberEmails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email !== "");
    }
    newBudget = {
      ...newBudget,
      memberEmails: filteredEmails,
      userId: user.userId,
    };
    addBudgetMutation({ newBudget, jwt: user.jwt });
  };

  const onSubmitUpdateBudget = (data) => {
    const { name, type, goal, memberEmails, userId } = data;

    let filteredEmails = [];
    if (memberEmails !== "") {
      filteredEmails = memberEmails
        .split(",")
        .map((email) => email.trim())
        .filter((email) => email !== "");
    }

    const updateBudget = {
      name,
      type,
      goal,
      memberEmails: filteredEmails,
      userId,
    };

    updateBudgetMutation({ updateBudget, jwt: user.jwt });
  };

  const onSubmit = (data) => {
    if (!isEdit) {
      onSubmitAddBudget(data);
    } else {
      onSubmitUpdateBudget(data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center px-5">
      <div className="bg-white p-7 flex flex-col gap-3 rounded">
        <div className="flex">
          <div className="grow">
            <h1 className="text-xl font-semibold text-green-800">{`${
              budget ? "Edit" : "Add"
            } Budget`}</h1>
            <p className="text-sm">
              {`${
                budget
                  ? "Please Edit your existing budget"
                  : "Please Create a Budget in order to start with your transactions"
              }`}
            </p>
          </div>
          <div>
            <button onClick={() => setShowModal(false)}>
              <FaXmark className="text-2xl text-green-700" />
            </button>
          </div>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormInput
              id="name"
              label="Name"
              mandatory={true}
              register={register}
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
          </div>

          <div>
            <FormInput id="type" label="Type" type="text" register={register} />
            {errors.type && <ErrorMessage message={errors.type.message} />}
          </div>

          <div>
            <FormInput
              id="goal"
              label="Goal"
              type="number"
              register={register}
            />
            {errors.goal && <ErrorMessage message={errors.goal.message} />}
          </div>

          <div>
            <FormInput
              id="memberEmails"
              label="Member Emails"
              type="text"
              register={register}
            />

            <span className="text-sm text-gray-700 flex items-center gap-1">
              <FaCircleInfo
                className="text-green-700"
                title="Eg.: John@email.com, Doe@email.com, Jim@email.com"
              />
              <i>
                Please enter user emails for creating group budget &#40;comma
                separated&#41;
              </i>
            </span>

            {errors.members && (
              <ErrorMessage message={errors.members.message} />
            )}
          </div>
          <div className="mt-2">
            <ButtonSolid
              disabled={addBudgetPending}
              content={
                isEdit
                  ? updateBudgetPending
                    ? "Updating..."
                    : "Update Budget"
                  : addBudgetPending
                  ? "Adding..."
                  : "Add Budget"
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

BudgetModal.propTypes = {
  setShowModal: PropTypes.func.isRequired,
  budget: PropTypes.object,
  isEdit: PropTypes.bool,
};

export default BudgetModal;
