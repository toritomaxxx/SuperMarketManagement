import { createContext, useState } from "react";
import React from "react";
type User = {
  name: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
};
type contextProps = {
  login: (user: any) => void;
  logout: () => void;
  user: User | null ;
  auth: boolean;
};

export const Context = createContext({} as contextProps);

type ContextProps = {
  children: React.ReactNode;
};

export const ContextProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const login = (user: any) => {
    setUser(user);
    setAuth(true);
  };
  const logout = () => {
    setUser(null);
    setAuth(false);
  };

  return (
    <Context.Provider value={{ login, user, logout, auth }}>
      {children}
    </Context.Provider>
  );
};
