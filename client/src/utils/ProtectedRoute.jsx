import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUserContext from "./hooks/useUserContext";
import { jwtDecode } from "jwt-decode";
import updateToken from "./updateToken";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser } = useUserContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loggedUser) {
      // if User is not logged in
      // Check if user has a token and refresh token
      if (
        localStorage.getItem("authToken") &&
        localStorage.getItem("authRefreshToken")
      ) {
        // if user has a token and refresh token, check if token is expired
        const decodedToken = jwtDecode(localStorage.getItem("authToken"));
        if (decodedToken.exp * 1000 < Date.now()) {
          // if token is expired, update token
          updateToken();
        } else {
          // if token is not expired, set loggedUser to userId or "user"
          console.log(decodedToken.id);
          setLoggedUser(true);
        }
        setLoading(false);
      } else {
        // if user doesn't have a token and refresh token, set loading to false and direct to login page
        setLoading(false);
        navigate("/auth/login");
      }
    } else {
      // if User is logged in, set loading to false and later direct to the requested page
      setLoading(false);
      navigate("/auth/login");
    }
  }, [navigate, loggedUser]);
  
  if (!loading) return <Outlet />;
};

export default ProtectedRoute;
