import {
    createContext,
} from "react";

export const Context = createContext({});
type ContextProps = {
    children: React.ReactNode;
};
export const ContextProvider =({children}: ContextProps)=>{
    return(
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    );
};