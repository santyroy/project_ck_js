import { NavLink } from "react-router-dom";

const Brand = () => {
  return (
    <li className="mr-auto">
      <NavLink className="h-16 flex items-center" to="/">
        <span className="text-2xl sm:text-3xl font-bold text-green-800">
          Coin
        </span>
        <span className="text-2xl sm:text-3xl font-bold text-yellow-500">
          Keeper
        </span>
      </NavLink>
    </li>
  );
};

export default Brand;
