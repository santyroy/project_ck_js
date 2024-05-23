import { useForm } from "react-hook-form";
import FormInput from "../../components/shared/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { ButtonSolid } from "../../components/shared/Button";
import { useLocation } from "react-router-dom";
import ResendOTP from "../../components/otp/ResendOTP";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../../components/shared/Message";
import PageLayout from "../../layouts/PageLayout";
import { otpSchema } from "../../schemas/schema";
import { useOneTimePassword } from "../../hooks/useOneTimePassword";

const OneTimePassword = () => {
  const location = useLocation();
  const [maskedEmail, setMaskedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(otpSchema) });

  const { mutate, isPending } = useOneTimePassword();

  const onSubmitVerifyOTP = (data) => {
    mutate({ ...data, userId: location.state?.userId });
  };

  useEffect(() => {
    const email = location.state?.email;
    if (email === undefined) return;
    const tokens = email.split("@");
    setMaskedEmail(
      `${tokens[0].substring(0, 2)}******${tokens[0].substring(
        tokens[0].length - 2
      )}@${tokens[1]}`
    );
  }, [location.state?.email]);

  return (
    <PageLayout>
      <div className="bg-white rounded shadow py-5 px-8">
        <div className="mb-5">
          <h1 className="text-xl font-semibold text-green-800">
            Verify It&apos;s You
          </h1>
          <p className="text-sm">
            We have sent OTP to (<i>{maskedEmail}</i>)
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmitVerifyOTP)}
        >
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
            <ButtonSolid content={isPending ? "Verifying..." : "Submit"} />
          </div>
        </form>

        <ResendOTP userId={location.state?.userId} />
      </div>
    </PageLayout>
  );
};

export default OneTimePassword;
