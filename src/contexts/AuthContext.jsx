import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext(undefined);

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    isLoggedIn: false,
    userId: "",
    name: "",
    email: "",
    picture: "",
    jwt: "",
    roles: [],
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
