import Header from "@renderer/components/Header";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Context } from "@renderer/context/Context";
import { useContext, useEffect } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";



export default function Ajustes() {
  const { user, userList, usersTable, mediosDePago, mediosDePagoTable } =
    useContext(Context);
  const [paymentMethod, setPaymentMethod] = useState({
    value: "",
    label: "",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);

  const [userUpdate, setUserUpdate] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: user?.isAdmin,
    _id: user?._id,
  });

  function createData(
    name: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
    isAdmin: boolean,
    _id: string
  ) {
    return { name, lastName, email, _id, isAdmin, password, confirmPassword };
  }

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    return (
      <>
        <TableRow>
          <TableCell align="center">{row.name}</TableCell>
          <TableCell align="center">{row.lastName}</TableCell>
          <TableCell align="center">
            {row.isAdmin ? "Administrador" : "Usuario"}
          </TableCell>
          <TableCell align="center">{row.email}</TableCell>
          {user?.email !== row.email ? (
            <TableCell align="center">
              <IconButton
                aria-label="delete"
                size="large"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  console.log(row._id);
                  window.electron.ipcRenderer
                    .invoke("delete-user", {
                      _id: row._id,
                    })
                    .then(() => {
                      usersTable();
                      console.log("Usuario eliminado");
                    });
                }}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          ) : (
            <TableCell align="center">
              <IconButton
                aria-label="delete"
                size="large"
                sx={{ cursor: "default" }}
              >
                <PersonIcon />
              </IconButton>
            </TableCell>
          )}
        </TableRow>
      </>
    );
  }

  useEffect(() => {
    usersTable();
    mediosDePagoTable();
  }, []);

  return (
    <>
      <Header title="Ajustes" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            padding: "30px",
            flexDirection: "column",
            borderRadius: "1rem",
            gap: "1rem",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              width: "100%",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography variant="h4">Modificar Usuario</Typography>
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "1rem",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                defaultValue={user?.name}
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, name: e.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                label="Apellido"
                variant="outlined"
                defaultValue={user?.lastName}
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, lastName: e.target.value })
                }
              />
            </div>

            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              fullWidth
              defaultValue={user?.email}
              onChange={(e) =>
                setUserUpdate({ ...userUpdate, email: e.target.value })
              }
            />
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "1rem",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Contraseña"
                variant="outlined"
                value={userUpdate.password}
                onChange={(e) =>
                  setUserUpdate({ ...userUpdate, password: e.target.value })
                }
              />
              <TextField
                id="outlined-basic"
                label="Confirmar Contraseña"
                variant="outlined"
                value={userUpdate.confirmPassword}
                onChange={(e) =>
                  setUserUpdate({
                    ...userUpdate,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>
            <Typography variant="h5">
              {user?.isAdmin ? "Administrador" : "Usuario"}
            </Typography>
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                fullWidth
                color="error"
                onClick={() => {
                  console.log("Modificar usuario");
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="success"
                onClick={() => {
                  console.log("Modificar usuario");
                  window.electron.ipcRenderer
                    .invoke("update-user", {
                      name: userUpdate.name,
                      lastName: userUpdate.lastName,
                      email: userUpdate.email,
                      password: userUpdate.password,
                      confirmPassword: userUpdate.confirmPassword,
                      isAdmin: userUpdate.isAdmin,
                      _id: userUpdate._id,
                    })
                    .then(() => {
                      usersTable();
                      console.log("Usuario modificado");
                    });
                }}
              >
                Modificar
              </Button>
            </div>
          </div>
        </Paper>
      </Modal>
      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            padding: "30px",
            flexDirection: "column",
            borderRadius: "1rem",
            gap: "1rem",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              width: "100%",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Typography variant="h4">Agregar Medio de Pago</Typography>
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "1rem",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Medio de Pago"
                variant="outlined"
                defaultValue={paymentMethod.label}
                onChange={(e) =>
                  setPaymentMethod({ ...paymentMethod, label: e.target.value })
                }
              />
            </div>

            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                fullWidth
                color="error"
                onClick={() => {
                  console.log("Agregar Medio de Pago");
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="success"
                onClick={() => {
                  window.electron.ipcRenderer
                    .invoke("create-mediopago", {
                      label: paymentMethod.label,
                    })
                    .then(() => {
                      paymentMethodsTable();
                      console.log("Medio de Pago agregado");
                    });
                  handleCloseAdd();
                }}
              >
                Agregar
              </Button>
            </div>
          </div>
        </Paper>
      </Modal>

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
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              width: "50%",
              flexDirection: "column",
              borderRadius: "1rem",
              gap: "1rem",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                align="center"
                fontWeight={"bold"}
                style={{
                  backgroundColor: "#2E3B55",
                  color: "white",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                  padding: "5px",
                }}
              >
                Datos del usuario
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: "1rem",
                  paddingTop: "1rem",
                }}
              >
                <Typography variant="h6">
                  Nombre : {user?.name} {user?.lastName}
                </Typography>

                <Typography variant="h6">Email : {user?.email} </Typography>
                <Typography variant="h6">
                  {user?.isAdmin ? " Administrador" : " Usuario"}
                </Typography>
              </div>
              <IconButton
                style={{ alignSelf: "flex-end", margin: "10px" }}
                onClick={() => {
                  handleOpen();
                }}
              >
                <ModeEditOutlineIcon
                  style={{
                    fontSize: "2rem",
                  }}
                />
              </IconButton>
            </div>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              width: "50%",
              flexDirection: "column",
              borderRadius: "1rem",
              gap: "1rem",
              boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Typography
                variant="h5"
                align="center"
                fontWeight={"bold"}
                style={{
                  backgroundColor: "#2E3B55",
                  color: "white",
                  borderTopLeftRadius: "1rem",
                  borderTopRightRadius: "1rem",
                  padding: "5px",
                  display: "flex",
                  justifyContent: "space-between",
                  paddingLeft: "1rem",

                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                Medios de Pago
                <IconButton
                  onClick={() => {
                    handleOpenAdd();
                  }}
                >
                  <AddBoxIcon
                    style={{
                      fontSize: "2rem",
                      alignSelf: "center",

                      color: "white",
                    }}
                  />
                </IconButton>
              </Typography>
            </div>
            <TableContainer
              component={Paper}
              sx={{
                height: "200px",
                borderRadius: "1rem",
              }}
            >
              <Table size="small">
                <TableBody>
                  {console.log(mediosDePago)}
                  {mediosDePago.map((medioDePago) => (
                    <TableRow key={medioDePago._id}>
                      <TableCell size="small" style={{ fontSize: "1.2rem" }}>
                        {medioDePago.label}
                      </TableCell>
                      <TableCell align="right">
                        <div>
                          <IconButton
                            color="primary"
                            aria-label="Editar"
                            onClick={() => {
                
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            aria-label="Borrar"
                            onClick={() => {
                             
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>

        <Paper
          elevation={3}
          sx={{
            display: "flex",
            paddingBottom: "1rem",
            width: "100%",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              style={{
                fontSize: "1.5rem",
                backgroundColor: "#2E3B55",
                color: "white",
                borderRadius: "10px 10px 0px 0px",
                padding: "8px",
                fontWeight: "bold",
              }}
            >
              Gestion de Usuarios
            </Typography>
            <TableContainer
              sx={{
                height: "50vh",
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "1.2rem",
                      }}
                    >
                      Nombre
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "1.2rem",
                      }}
                    >
                      Apellido
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "1.2rem",
                      }}
                    >
                      Rol
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "1.2rem",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "1.2rem",
                      }}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList?.map((row) => (
                    <Row key={row._id} row={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Paper>
      </Box>
    </>
  );
}
