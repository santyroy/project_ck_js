import { useEffect, useState } from "react";
import { ButtonOutline } from "../shared/Button";
import { useMutation } from "@tanstack/react-query";
import { resendOTP } from "../../services/api";

import PropTypes from "prop-types";
import { FaRotate } from "react-icons/fa6";
import { ErrorMessage, SuccessMessage } from "../shared/Message";

const RESEND_OTP_INTERVAL = 30000; // 30 seconds

const ResendOTP = ({ userId }) => {
  const [showResendOTPBtn, setShowResendOTPBtn] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_OTP_INTERVAL / 1000);

  useEffect(() => {
    const timeout = setTimeout(
      () => setShowResendOTPBtn(true),
      RESEND_OTP_INTERVAL
    );
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (seconds === 0) {
      setShowResendOTPBtn(true);
      return;
    }
    const countDown = setInterval(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearInterval(countDown);
  }, [seconds]);

  const resendOTPMutation = useMutation({ mutationFn: resendOTP });

  return (
    <div className="bg-gray-200 p-2 mt-4 rounded flex gap-2 items-center">
      <h1 className="text-sm mb-1">
        Resend OTP in <strong>{seconds}</strong> seconds.
      </h1>
      <div>
        {showResendOTPBtn && (
          <ButtonOutline
            content={<FaRotate />}
            title="Resend OTP"
            onClick={() => {
              resendOTPMutation.mutate({ userId: userId });
              setSeconds(RESEND_OTP_INTERVAL / 1000);
              setShowResendOTPBtn(false);
            }}
          />
        )}
      </div>

      {!showResendOTPBtn && resendOTPMutation.isSuccess && (
        <SuccessMessage message="OTP sent successfully" />
      )}

      {!showResendOTPBtn && resendOTPMutation.isError && (
        <ErrorMessage message="Error sending OTP" />
      )}
    </div>
  );
};

ResendOTP.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default ResendOTP;
