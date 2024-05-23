import { useLocation } from "react-router-dom";
import FormInput from "../../components/shared/FormInput";
import { ButtonSolid } from "../../components/shared/Button";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "../../components/shared/Message";
import { yupResolver } from "@hookform/resolvers/yup";
import PageLayout from "../../layouts/PageLayout";
import { resetPasswordSchema } from "../../schemas/schema";
import { useResetPassword } from "../../hooks/useResetPassword";

const ResetPassword = () => {
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(resetPasswordSchema) });

  const { mutate } = useResetPassword();

  const onSubmitResetPassword = (data) => {
    const { email, otp, password } = data;
    mutate({ email, otp, password });
  };

  return (
    <PageLayout>
      <div className="bg-white rounded shadow py-5 px-8">
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-green-800">
            Create New Password
          </h1>
          <p className="text-sm">
            Create New Password To Login To Your Account
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmitResetPassword)}
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              label="Email"
              type="email"
              value={location.state.email}
              readOnly
              className="border-2 border-green-700 focus:outline-none focus:border-green-500 rounded px-3 py-2"
              {...register("email")}
            />
          </div>

          <div>
            <FormInput
              id="otp"
              label="OTP"
              type="text"
              mandatory={true}
              register={register}
            />
            {errors.otp && <ErrorMessage message={errors.otp.message} />}
          </div>

          <div>
            <FormInput
              id="password"
              label="Password"
              type="password"
              mandatory={true}
              register={register}
            />
            {errors.password && (
              <ErrorMessage message={errors.password?.message} />
            )}
          </div>

          <div>
            <FormInput
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              mandatory={true}
              register={register}
            />
            {errors.confirmPassword && (
              <ErrorMessage message={errors.confirmPassword?.message} />
            )}
          </div>

          <div>
            <ButtonSolid content={"Submit"} />
          </div>
        </form>
      </div>
    </PageLayout>
  );
};

export default ResetPassword;
