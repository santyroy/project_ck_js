import FormInput from "../../components/shared/FormInput";
import { ButtonSolid } from "../../components/shared/Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "../../components/shared/Message";
import PageLayout from "../../layouts/PageLayout";
import { useSignup } from "../../hooks/useSignup";
import { signupSchema } from "../../schemas/schema";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signupSchema) });

  const { mutate, isPending } = useSignup();

  const onSubmitSignupUser = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <PageLayout>
      <div className="bg-white rounded shadow py-5 px-8">
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-green-800">
            Getting Started
          </h1>
          <p className="text-sm">Create Your Account With Coin Keeper</p>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmitSignupUser)}
        >
          <div>
            <FormInput
              id="name"
              label="Name"
              type="text"
              autoFocus={true}
              mandatory={true}
              register={register}
            />
            {errors.name && <ErrorMessage message={errors.name?.message} />}
          </div>

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
            <ButtonSolid
              content={isPending ? "Signing up..." : "Sign up"}
              disabled={isPending}
            />
          </div>
        </form>

        <div>
          <p className="my-5">
            <span className="mr-1">Already Have Account?</span>
            <Link to="/login" className="text-green-700">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Signup;
