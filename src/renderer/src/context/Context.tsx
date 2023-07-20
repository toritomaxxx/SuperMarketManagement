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
  listaCompras: any;
  setListaCompras: any;
  addNewProduct: (product: any) => void;
  substractProduct: (product: any) => void;
  editProduct:(product:any,newCant:number) => void;
  setProducts:any;
};

export const Context = createContext({} as contextProps);

type ContextProps = {
  children: React.ReactNode;
};

export const ContextProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState(null);
  const [auth, setAuth] = useState(false);
  const [listaCompras, setListaCompras] = useState<any[]>([]);
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

  const addNewProduct = (product: any) => {
    const encontro =
      listaCompras.filter(
        (productLista: any) => productLista.codBar === product.codBar
      ).length > 0;
    if (encontro) {
      const newLista = listaCompras.map((productLista: any) => {
        if (productLista.codBar === product.codBar) {
          productLista.cant += 1;
        }
        return productLista;
      });
      setListaCompras(newLista);
    } else {
      setListaCompras((prev: any) => [...prev, { ...product, cant: 1 }]);
    }
  };

  const substractProduct = (product: any) => {
    const newLista = listaCompras.map((productLista: any) => {
      if (productLista.codBar === product.codBar) {
        productLista.cant -= 1;
      }

      return productLista;
    });
    newLista
      .filter((productLista: any) => productLista.cant <= 0)
      .map((productLista: any) => {
        const index = newLista.indexOf(productLista);
        newLista.splice(index, 1);
      });

    setListaCompras(newLista);
  };
  const editProduct = (product: any, newCant: number) => {
    const newLista = listaCompras.map((e) => {
      if (e.codBar === product.codBar) {
        e.cant = newCant;
      }
      return e;
    });
    setListaCompras(newLista);
  };

  return (
    <Context.Provider
      value={{
        login,
        user,
        logout,
        auth,
        products,
        productsTable,
        setListaCompras,
        listaCompras,
        addNewProduct,
        substractProduct,
        editProduct,
        setProducts
      }}
    >
      {children}
    </Context.Provider>
  );
};
