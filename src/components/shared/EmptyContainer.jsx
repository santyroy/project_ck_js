import PropTypes from "prop-types";

const EmptyContainer = ({ heading, description }) => {
  return (
    <div className="min-h-32 flex flex-col justify-center items-center p-6 text-center">
      <h1 className="text-2xl font-semibold">{heading} 😔</h1>
      <p>
        <i>{description}</i>
      </p>
    </div>
  );
};

EmptyContainer.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
};

export default EmptyContainer;
