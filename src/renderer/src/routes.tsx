import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Historial from "./views/Historial";
import AgregarProductos from "./views/AgregarProductos";
import RealizarVentas from "./views/RealizarVentas";
import Ajustes from "./views/Ajustes";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import { Context } from "./context/Context";
import { useContext, useEffect, useState } from "react";

export default function Routers() {
  const { revisarUsers } = useContext(Context);

  const [hasUsers, setHasUsers] = useState(true);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    revisarUsers().then((res) => {
      setSearch(true);
      setHasUsers(res);
    });
  }, []);

  if (!search) return null;

  return (
    <HashRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productos" element={<AgregarProductos />} />
        <Route path="/ventas" element={<RealizarVentas />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/ajustes" element={<Ajustes />} />
      </Routes>
    </HashRouter>
  );
}
