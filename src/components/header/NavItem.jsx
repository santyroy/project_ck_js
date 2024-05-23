import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavItem = ({ content, path }) => {
  return (
    <li className="hidden sm:block">
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "h-16 flex items-center font-bold text-green-800"
            : "h-16 flex items-center hover:text-green-800"
        }
        to={path}
      >
        {content}
      </NavLink>
    </li>
  );
};

NavItem.propTypes = {
  content: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};
export default NavItem;
