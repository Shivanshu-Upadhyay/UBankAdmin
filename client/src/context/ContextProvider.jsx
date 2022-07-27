import React, { createContext, useContext, useState } from "react";
const StateContext = createContext();
function ContextProvider({ children }) {
  const [isLoginUser, setIsLoginUser] = useState(false);
  const [active, setActive] = React.useState(0);
  const [toggel, setToggel] = useState(false);
  return (
    <StateContext.Provider
      value={{
        isLoginUser,
        setIsLoginUser,
        active,
        setActive,
        toggel,
        setToggel,
        
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
export default ContextProvider;
export const useStateContext = () => useContext(StateContext);
