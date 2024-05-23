import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { ButtonSolid } from "../../components/shared/Button";
import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import ResendOTP from "../../components/otp/ResendOTP";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ErrorMessage } from "../../components/shared/Message";
import PageLayout from "../../layouts/PageLayout";

const schema = yup
  .object({
    otpDigit1: yup
      .number()
      .required("OTP is mandatory")
      .typeError("OTP must be a number")
      .positive("OTP must be positive")
      .min(0)
      .max(9),
    otpDigit2: yup
      .number()
      .required("OTP is mandatory")
      .typeError("OTP must be a number")
      .positive("OTP must be positive")
      .min(0)
      .max(9),
    otpDigit3: yup
      .number()
      .required("OTP is mandatory")
      .typeError("OTP must be a number")
      .positive("OTP must be positive")
      .min(0)
      .max(9),
    otpDigit4: yup
      .number()
      .required("OTP is mandatory")
      .typeError("OTP must be a number")
      .positive("OTP must be positive")
      .min(0)
      .max(9),
    otpDigit5: yup
      .number()
      .required("OTP is mandatory")
      .typeError("OTP must be a number")
      .positive("OTP must be positive")
      .min(0)
      .max(9),
    otpDigit6: yup
      .number()
      .required("OTP is mandatory")
      .typeError("OTP must be a number")
      .positive("OTP must be positive")
      .min(0)
      .max(9),
  })
  .required();

const OneTimePasswordV2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [maskedEmail, setMaskedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const verifyMutation = useMutation({
    mutationFn: verifyOTP,
    onSuccess: () => navigate("/login", { replace: true }),
  });

  const onSubmitVerifyOTP = (data) => {
    console.log(data);
    const otp =
      data["otpDigit1"] +
      "" +
      data["otpDigit2"] +
      "" +
      data["otpDigit3"] +
      "" +
      data["otpDigit4"] +
      "" +
      data["otpDigit5"] +
      "" +
      data["otpDigit6"];
    verifyMutation.mutate({
      otp: parseInt(otp),
      userId: location.state?.userId,
    });
  };

  useEffect(() => {
    const email = location.state?.email;
    const tokens = email.split("@");
    setMaskedEmail(
      `${tokens[0].substring(0, 2)}******${tokens[0].substring(
        tokens[0].length - 2
      )}@${tokens[1]}`
    );
  }, [location.state?.email]);

  return (
    <PageLayout>
      <div className="mb-5">
        <h1 className="text-xl font-semibold text-green-800">
          Verify It&apos;s You
        </h1>
        <p className="text-sm">
          We have sent OTP to (<i>{maskedEmail}</i>)
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmitVerifyOTP)}>
        <div className="flex justify-between mb-5">
          <OTPInput register={register} field="otpDigit1" />
          <OTPInput register={register} field="otpDigit2" />
          <OTPInput register={register} field="otpDigit3" />
          <OTPInput register={register} field="otpDigit4" />
          <OTPInput register={register} field="otpDigit5" />
          <OTPInput register={register} field="otpDigit6" />
        </div>

        {errors.otpDigit1 && (
          <ErrorMessage message={errors.otpDigit1.message} />
        )}
        {errors.otpDigit2 && (
          <ErrorMessage message={errors.otpDigit2.message} />
        )}
        {errors.otpDigit3 && (
          <ErrorMessage message={errors.otpDigit3.message} />
        )}
        {errors.otpDigit4 && (
          <ErrorMessage message={errors.otpDigit4.message} />
        )}
        {errors.otpDigit5 && (
          <ErrorMessage message={errors.otpDigit5.message} />
        )}
        {errors.otpDigit6 && (
          <ErrorMessage message={errors.otpDigit6.message} />
        )}

        <div>
          <ButtonSolid
            content={verifyMutation.isPending ? "Verifying..." : "Verify"}
          />
        </div>
      </form>

      {verifyMutation.isError && (
        <ErrorMessage message={verifyMutation.error.response?.data?.message} />
      )}

      <ResendOTP userId={location.state?.userId} />
    </PageLayout>
  );
};

const OTPInput = ({ register, field }) => {
  return (
    <input
      type="text"
      minLength={1}
      maxLength={1}
      className="w-7 border-2 border-green-700 focus:outline-none focus:border-green-500 rounded p-2"
      {...register(field)}
    />
  );
};

OTPInput.propTypes = {
  register: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
};

export default OneTimePasswordV2;
