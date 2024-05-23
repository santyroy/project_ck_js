import { useNavigate } from "react-router-dom";
import { instance, logoutUser } from "../services/api";
import useAuthContext from "./useAuthContext";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const useRefreshToken = () => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();

  const { refetch } = useQuery({
    queryKey: ["logout", user.userId],
    queryFn: () => logoutUser(),
    enabled: false,
  });

  const refresh = async () => {
    try {
      const response = await instance.get("/auth/refresh", {
        withCredentials: true,
      });
      setUser((prev) => {
        // console.log(JSON.stringify(prev));
        // console.log(response.data?.data);
        return { ...prev, jwt: response.data?.data };
      });
      return response.data?.data;
    } catch (err) {
      // Refresh endpoint gives an error, please logout and re-login
      toast.error("Unauthorized: Please login");
      refetch();
      setUser({ isLoggedIn: false, userId: "", name: "", email: "", jwt: "" });
      navigate("/login");
    }
  };

  return refresh;
};

export default useRefreshToken;
