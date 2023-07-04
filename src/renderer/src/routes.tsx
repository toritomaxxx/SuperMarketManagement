import { createHashRouter } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";

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

   