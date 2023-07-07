import { createHashRouter } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Historial from "./views/Historial";
import AgregarProductos from "./views/AgregarProductos";
import RealizarVentas from "./views/RealizarVentas";

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
    },
    {
        path: "/productos",
        element:<AgregarProductos/>
    },
    {
        path:"/ventas",
        element:<RealizarVentas/>
    },
    {
        path:"/historial",
        element:<Historial/>
    }
]
)

   