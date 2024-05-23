import PropTypes from "prop-types";

const PageLayout = ({ children }) => {
  return (
    <section className="container mx-auto px-5 py-3 grow">
      <div className="max-w-screen-lg mx-auto">{children}</div>
    </section>
  );
};

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
