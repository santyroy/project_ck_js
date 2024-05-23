import PageLayout from "../../layouts/PageLayout";
import FormInput from "../../components/shared/FormInput";
import { ButtonSolid } from "../../components/shared/Button";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorMessage } from "../../components/shared/Message";
import { useLogin } from "../../hooks/useLogin";
import { loginSchema } from "../../schemas/schema";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const { mutate, isPending } = useLogin();

  const onSubmitLoginUser = (data) => mutate(data);

  return (
    <PageLayout>
      <div className="bg-white rounded shadow py-5 px-8">
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-green-800">Welcome Back</h1>
          <p className="text-sm">Login Your Account With Coin Keeper</p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmitLoginUser)}
        >
          <div>
            <FormInput
              id="email"
              label="Email"
              type="email"
              mandatory={true}
              autoFocus={true}
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

          <Link className="text-green-800 font-semibold" to="/forgotPassword">
            Forgot Password?
          </Link>

          <div>
            <ButtonSolid
              content={isPending ? "Logging in..." : "Log in"}
              disabled={isPending}
            />
          </div>
        </form>

        <div>
          <p className="my-5">
            <span className="mr-1">Don&apos;t Have An Account?</span>
            <Link to="/signup" className="text-green-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default Login;
