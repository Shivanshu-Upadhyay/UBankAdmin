import React, { createContext, useContext, useState } from "react";
const StateContext = createContext();
function ContextProvider({ children }) {
  const [isLoginUser, setIsLoginUser] = useState(localStorage.getItem('admin'));
  const [active, setActive] = React.useState(0);
  const [toggel, setToggel] = useState(false);
  const [role, setRole] = useState(localStorage.getItem('role'))
  return (
    <StateContext.Provider
      value={{
        isLoginUser,
        setIsLoginUser,
        active,
        setActive,
        toggel,
        setToggel,role, setRole
        
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
export default ContextProvider;
export const useStateContext = () => useContext(StateContext);
