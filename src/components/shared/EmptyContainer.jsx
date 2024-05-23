import PropTypes from "prop-types";

const EmptyContainer = ({ heading, description }) => {
  return (
    <div className="min-h-32 flex flex-col justify-center items-center py-6">
      <h1 className="text-2xl font-semibold">{heading} 😔</h1>
      <i>{description}</i>
    </div>
  );
};

EmptyContainer.propTypes = {
  heading: PropTypes.string,
  description: PropTypes.string,
};

export default EmptyContainer;
