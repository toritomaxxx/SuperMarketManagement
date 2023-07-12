import { createContext, useEffect, useState } from "react";
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
  user: User | null;
  auth: boolean;
  products: any;
  productsTable: () => void;
};


export const Context = createContext({} as contextProps);

type ContextProps = {
  children: React.ReactNode;
};

export const ContextProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [products, setProducts] = useState(null);
  const login = (user: any) => {
    setUser(user);
    setAuth(true);
  };
  const logout = () => {
    setUser(null);
    setAuth(false);
  };

  useEffect(() => {
    if (!auth) return;
    productsTable();
  }, [auth]);

  const productsTable = () => {
    window.electron.ipcRenderer.invoke("get-products").then((res: any) => {
      console.log(res);
      setProducts(res);
    });
  };

  return (
    <Context.Provider value={{ login, user, logout, auth, products,productsTable }}>
      {children}
    </Context.Provider>
  );
};
