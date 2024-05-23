import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaBars } from "react-icons/fa6";

import Brand from "./Brand";
import NavItem from "./NavItem";
import { ButtonOutline, ButtonSolid } from "../shared/Button";

import useAuthContext from "../../hooks/useAuthContext";
import { logoutUser } from "../../services/api";

import PropTypes from "prop-types";

const Navbar = ({ showMobileMenu, setShowMobileMenu }) => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const { refetch } = useQuery({
    queryKey: ["logout", user.userId],
    queryFn: () => logoutUser(),
    enabled: false,
  });

  const handleLogout = () => {
    refetch();
    setUser({ isLoggedIn: false, userId: "", name: "", email: "", jwt: "" });
    navigate("/login");
  };

  return (
    <ul className="w-full h-16 flex flex-row items-center gap-5">
      <Brand />

      {user.isLoggedIn && (
        <>
          <NavItem content="Dashboard" path="dashboard" />
          <NavItem content="Budgets" path="budgets" />
          <NavItem content="Analytics" path="analytics" />
          <NavItem content="Profile" path="profile" />
          <li className="hidden sm:block">
            <ButtonOutline content="Log out" onClick={handleLogout} />
          </li>
        </>
      )}

      {!user.isLoggedIn && (
        <>
          <li className="hidden sm:block">
            <NavLink to="/login">
              <ButtonSolid content="Log in" />
            </NavLink>
          </li>
          <li className="hidden sm:block">
            <NavLink to="/signup">
              <ButtonOutline content="Sign up" />
            </NavLink>
          </li>
        </>
      )}

      <li
        className="sm:hidden cursor-pointer"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <FaBars className="text-2xl text-green-700" />
      </li>
    </ul>
  );
};

Navbar.propTypes = {
  showMobileMenu: PropTypes.bool.isRequired,
  setShowMobileMenu: PropTypes.func.isRequired,
};

export default Navbar;
