import Header from "@renderer/components/Header";
import Box from "@mui/material/Box";
import { Context } from "@renderer/context/Context";
import { useContext, useEffect } from "react";
import BoxUserData from "@renderer/components/ajustesComponentes/boxUserData";
import ModalModificarUsuario from "@renderer/components/ajustesComponentes/modalModificarUsuario";
import ModalAgregarMedioPago from "@renderer/components/ajustesComponentes/modalAgregarMedioPago";
import BoxMediosPago from "@renderer/components/ajustesComponentes/boxMediosPago";
import TablaUsuarios from "@renderer/components/ajustesComponentes/tablaUsuarios";
import { useState } from "react";
import {
  AlertBlue,
  AlertRed,
  AlertGreen,
  AlertYellow,
} from "@renderer/components/AlertasVarias/alertaVarias";
import { Modal } from "@mui/material";

export default function Ajustes() {
  const { user, userList, usersTable, mediosDePago, mediosDePagoTable } =
    useContext(Context);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [edit, setEdit] = useState({});

  const [openAdd, setOpenAdd] = useState(false);
  const [openAdd1, setOpenAdd1] = useState(false);
  const handleCloseAdd1 = () => setOpenAdd1(false);
  const handleOpenAdd1 = () => setOpenAdd1(true);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const [alert, setAlert] = useState(false);
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);


  useEffect(() => {
    usersTable();
  }, []);

  return (
    <>
      <AlertYellow
        open={alert}
        setOpen={setAlert}
        text="Por favor complete todos los campos"
      />
      <AlertRed
        open={alert1}
        setOpen={setAlert1}
        text="Las contraseñas no coinciden"
      />
      <AlertGreen
        open={alert2}
        setOpen={setAlert2}
        text="Usuario modificado correctamente"
      />

      <Header title="Ajustes" />
      <ModalModificarUsuario
        open={open}
        handleClose={handleClose}
        user={user}
        userList={userList}
        usersTable={usersTable}
        setAlert={setAlert}
        setAlert1={setAlert1}
        setAlert2={setAlert2}
      />
      <ModalAgregarMedioPago
        openAdd={openAdd}
        handleCloseAdd={handleCloseAdd}
        titulo="Agregar medio de pago"
      />
      <ModalAgregarMedioPago
        openAdd={openAdd1}
        handleCloseAdd={handleCloseAdd1}
        edit={edit}
        titulo="Modificar medio de pago"
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
            width: "100%",
          }}
        >
          <BoxUserData handleOpen={handleOpen} />
          <BoxMediosPago
            handleOpenAdd={handleOpenAdd}
            mediosDePago={mediosDePago}
            handleOpenAdd1={handleOpenAdd1}
            setEdit={setEdit}
          />
        </div>
        <TablaUsuarios userList={userList} usersTable={usersTable} />
      </Box>
    </>
  );
}
