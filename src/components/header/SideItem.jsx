import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SideItem = ({ content, path }) => {
  return (
    <li className="w-full">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "flex justify-center items-center font-bold text-green-800"
            : "flex justify-center items-center hover:text-green-800"
        }
        to={path}
      >
        {content}
      </NavLink>
    </li>
  );
};

SideItem.propTypes = {
  content: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default SideItem;
