import { instancePrivate } from "../services/api";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuthContext from "./useAuthContext";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { user } = useAuthContext();

  useEffect(() => {
    const requestInterceptor = instancePrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user.jwt}`;
        }
        return config;
      },
      async (error) => Promise.reject(error)
    );

    const responseInteceptor = instancePrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newJwt = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newJwt}`;
          return instancePrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      instancePrivate.interceptors.request.eject(requestInterceptor);
      instancePrivate.interceptors.response.eject(responseInteceptor);
    };
  }, [refresh, user]);

  return instancePrivate;
};

export default useAxiosPrivate;
