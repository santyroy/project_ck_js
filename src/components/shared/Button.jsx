import PropTypes from "prop-types";

export const ButtonSolid = ({ content, title, disabled = false, onClick }) => {
  return (
    <button
      className="bg-green-800 py-1 px-3 text-white font-semibold rounded hover:bg-green-900 w-full sm:w-auto shadow"
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {content}
    </button>
  );
};

ButtonSolid.propTypes = {
  content: objectOrStringPropType,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export const ButtonOutline = ({
  content,
  title,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className="bg-white py-1 px-2 text-green-800 font-semibold rounded border border-green-900 hover:bg-green-900 hover:text-white w-full sm:w-auto shadow"
      disabled={disabled}
      onClick={onClick}
      title={title}
    >
      {content}
    </button>
  );
};

ButtonOutline.propTypes = {
  content: objectOrStringPropType,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

function objectOrStringPropType(props, propName, componentName) {
  const propValue = props[propName];
  if (typeof propValue !== "object" && typeof propValue !== "string") {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName}. Expected either an object or a string.`
    );
  }
}
