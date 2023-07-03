import { createHashRouter } from "react-router-dom";
import Login from "./views/Login.tsx";
import Register from "./views/Register.tsx";
import Home from "./views/Home.tsx";

export const router = createHashRouter([
    {
        path: "/",
        element: <Login/>,
    },
    {
        path: "/register",
        element: <Register/>,

    },
    {
        path: "/home",
        element: <Home/>,
    }
]
)

   