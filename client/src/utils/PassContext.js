import React from "react";

const PassContext = React.createContext({
  loggedUser: false,
  setLoggedUser: () => {},
});

export default PassContext;
