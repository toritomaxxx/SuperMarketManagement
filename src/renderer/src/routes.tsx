import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home";
import Historial from "./views/Historial";
import AgregarProductos from "./views/AgregarProductos";
import RealizarVentas from "./views/RealizarVentas";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
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
    <BrowserRouter>
      <Routes>
        {hasUsers ? (
          <Route path="/" element={<Navigate to="/login" />} />
        ) : (
          <Route path="/" element={<Navigate to="/register" />} />
        )}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/productos" element={<AgregarProductos />} />
        <Route path="/ventas" element={<RealizarVentas />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </BrowserRouter>
  );
}
