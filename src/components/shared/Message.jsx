import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

import PropTypes from "prop-types";

export const SuccessMessage = ({ message }) => {
  return (
    <div className="flex items-center bg-green-100 px-2 py-1 rounded my-2">
      <FaCircleCheck className="text-green-800 mr-2" />
      <span className="text-green-800 font-semibold text-sm">{message}</span>
    </div>
  );
};

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center bg-red-100 px-2 py-1 rounded my-2 w-fit">
      <FaCircleXmark className="text-red-500 mr-2" />
      <span className="text-red-700 font-semibold text-sm">{message}</span>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
