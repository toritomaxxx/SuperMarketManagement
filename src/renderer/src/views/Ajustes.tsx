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
  AlertRed,
  AlertGreen,
  AlertYellow,
  AlertBlue,
} from "@renderer/components/AlertasVarias/alertaVarias";

export default function Ajustes() {
  const { user, userList, usersTable, mediosDePago } = useContext(Context);
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
  const [alert3, setAlert3] = useState(false);
  const [alert4, setAlert4] = useState(false);
  const [alert5, setAlert5] = useState(false);
  const [alert6, setAlert6] = useState(false);
  const [alert7, setAlert7] = useState(false);

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
      <AlertGreen
        open={alert3}
        setOpen={setAlert3}
        text="Medio de pago cargado correctamente"
      />
      <AlertBlue
        open={alert4}
        setOpen={setAlert4}
        text="Ya existe un medio de pago con ese nombre"
      />
      <AlertGreen
        open={alert5}
        setOpen={setAlert5}
        text="Medio de pago editado correctamente"
      />
      <AlertGreen
        open={alert6}
        setOpen={setAlert6}
        text="Medio de pago eliminado correctamente"
      />
      <AlertGreen
        open={alert7}
        setOpen={setAlert7}
        text="Usuario eliminado correctamente"
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
        setAlert={setAlert}
        setAlert3={setAlert3}
        setAlert4={setAlert4}
        setAlert5={setAlert5}
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
      
          height: "94vh",
          justifyContent:"center"


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
            setAlert6={setAlert6}
            
          />
        </div>

        {user?.isAdmin && (
          <TablaUsuarios userList={userList} usersTable={usersTable} 
          setAlert7={setAlert7}
          />
        )}
      </Box>
    </>
  );
}
