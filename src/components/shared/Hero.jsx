import PropTypes from "prop-types";

const Hero = ({
  title,
  description,
  image,
  imagePosition = "left",
  children,
}) => {
  if (imagePosition === "left") {
    return (
      <div className="flex flex-col-reverse justify-center items-center my-5 md:flex-row bg-white p-8 rounded-md shadow">
        <img className="max-w-sm sm:mr-10" src={image} alt="hero image" />
        <div className="text-center sm:text-left">
          <span className="text-2xl sm:text-4xl font-semibold text-green-700">
            {title[0]}
          </span>
          <br />
          <span className="text-2xl sm:text-4xl font-semibold text-yellow-500">
            {title[1]}
          </span>
          {description && <p className="mt-4">{description}</p>}
          {children && <div className="mt-14">{children}</div>}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center my-5 md:flex-row bg-white px-8 rounded-md shadow">
        <div className="text-center sm:text-left">
          <span className="text-xl sm:text-3xl font-semibold text-green-700">
            {title[0]}
          </span>
          <br />
          <span className="text-xl sm:text-3xl font-semibold text-yellow-500">
            {title[1]}
          </span>
          {description && <p className="mt-4">{description}</p>}
          {children && <div className="mt-14">{children}</div>}
        </div>
        <img className="max-w-sm sm:ml-10" src={image} alt="hero image" />
      </div>
    );
  }
};

Hero.propTypes = {
  title: PropTypes.array.isRequired,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  imagePosition: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Hero;
