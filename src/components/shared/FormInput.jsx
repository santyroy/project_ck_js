import PropTypes from "prop-types";

const FormInput = ({
  label = "",
  type = "text",
  id,
  autoFocus = false,
  mandatory = false,
  register = () => {},
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className={
          mandatory
            ? `after:content-['*'] after:ml-0.5 after:text-red-500`
            : undefined
        }
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        autoFocus={autoFocus}
        className="border-2 border-gray-200 focus:outline-none focus:border-green-700 rounded px-3 py-2"
        {...register(id)}
      />
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool,
  mandatory: PropTypes.bool,
  register: PropTypes.func,
};

export default FormInput;
