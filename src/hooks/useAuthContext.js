import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used with a UserContext");
  }
  return context;
}
