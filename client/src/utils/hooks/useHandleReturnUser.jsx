import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { updateToken } from "../index";

const useHandleReturnUser = () => {
  const [loggedUser, setLoggedUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleReturningUser = async () => {
    if (localStorage.getItem("authToken")) {
      const decodedToken = jwtDecode(localStorage.getItem("authToken"));
      if (decodedToken.exp * 1000 < Date.now()) await updateToken();
      setLoggedUser(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    handleReturningUser();
  }, []);

  return { loading, loggedUser, setLoggedUser };
};

export default useHandleReturnUser;
