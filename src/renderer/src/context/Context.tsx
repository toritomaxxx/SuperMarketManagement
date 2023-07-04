import { createContext, useState } from "react";
import React from "react";

export const Context = createContext({});
type ContextProps = {
  children: React.ReactNode;
};

export const ContextProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState(null);
  const login = (user: any) => {
    setUser(user);
  };
  const logout = () => {
    setUser(null);
  };

  return (
    <Context.Provider value={{ login, user, logout }}>
      {children}
    </Context.Provider>
  );
};
