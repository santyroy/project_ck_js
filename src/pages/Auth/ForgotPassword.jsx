import { useForm } from "react-hook-form";
import { ButtonSolid } from "../../components/shared/Button";
import FormInput from "../../components/shared/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "../../components/shared/Message";
import PageLayout from "../../layouts/PageLayout";
import { forgotPasswordSchema } from "../../schemas/schema";
import { useForgotPassword } from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });

  const { mutate, isPending } = useForgotPassword();

  const onSubmitForgotPassword = (data) => mutate(data);

  return (
    <PageLayout>
      <div className="bg-white rounded shadow py-5 px-8">
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-green-800">
            Forgot Password
          </h1>
          <p className="text-sm">Enter Your Registered Email To Receive OTP</p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmitForgotPassword)}
        >
          <div>
            <FormInput
              id="email"
              label="Email"
              type="email"
              mandatory={true}
              register={register}
            />
            {errors.email && <ErrorMessage message={errors.email?.message} />}
          </div>

          <div>
            <ButtonSolid
              content={isPending ? "Sending OTP..." : "Send OTP"}
              disabled={isPending}
            />
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default ForgotPassword;
