import { FaXmark } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";

import SideItem from "./SideItem";
import { ButtonOutline, ButtonSolid } from "../shared/Button";

import useAuthContext from "../../hooks/useAuthContext";
import { logoutUser } from "../../services/api";

import PropTypes from "prop-types";

const Sidebar = ({ showMobileMenu, setShowMobileMenu }) => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const { refetch } = useQuery({
    queryKey: ["logout", user.userId],
    queryFn: logoutUser,
    enabled: false,
  });

  const handleLogout = () => {
    refetch();
    setUser({ isLoggedIn: false, userId: "", name: "", email: "", jwt: "" });
    setShowMobileMenu(false);
    navigate("/login");
  };

  return (
    <ul
      className={`sidebar sm:hidden flex flex-col items-center gap-5 z-10 w-1/2 fixed top-0 shadow duration-300 h-full bg-white 
      ${showMobileMenu ? "right-0" : "-right-1/2"}`}
    >
      <li
        className="mr-auto ml-4 mt-4 cursor-pointer"
        onClick={() => setShowMobileMenu(false)}
      >
        <FaXmark className="text-2xl text-green-700" />
      </li>

      {user.isLoggedIn && (
        <>
          <SideItem
            content="Dashboard"
            path="dashboard"
            setShowMobileMenu={setShowMobileMenu}
          />
          <SideItem
            content="Budgets"
            path="budgets"
            setShowMobileMenu={setShowMobileMenu}
          />
          <SideItem
            content="Analytics"
            path="analytics"
            setShowMobileMenu={setShowMobileMenu}
          />
          <SideItem
            content="Profile"
            path="profile"
            setShowMobileMenu={setShowMobileMenu}
          />
          <li>
            <ButtonOutline content="Log out" onClick={handleLogout} />
          </li>
        </>
      )}

      {!user.isLoggedIn && (
        <>
          <li className="w-full">
            <NavLink className="flex justify-center items-center" to="login">
              <div>
                <ButtonSolid content="Log in" />
              </div>
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink className="flex justify-center items-center" to="signup">
              <div>
                <ButtonOutline content="Sign up" />
              </div>
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

Sidebar.propTypes = {
  showMobileMenu: PropTypes.bool.isRequired,
  setShowMobileMenu: PropTypes.func.isRequired,
};

export default Sidebar;
