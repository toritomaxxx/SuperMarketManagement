import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton, Table, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ModalModificarUsuario from "@renderer/components/ajustesComponentes/modalModificarUsuario";

import { Context } from "@renderer/context/Context";
import { useContext } from "react";
import { useState } from "react";

export default function TablaUsuarios(props: any) {
  const { userList, usersTable, setAlert7 } = props;
  const [userAct, setUserAct] = useState<any>(null)
  const { user } = useContext(Context);

  const [open, setOpen] = useState(false);

  const handleOpen = (id) => {
    constFindUser(id);
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const constFindUser = (id: string) => {
    window.electron.ipcRenderer
      .invoke("find-user", { _id: id })
      .then((res: any) => {
        setUserAct(res);
      });
  };


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

          {

            user?.email !== row.email ?
              (
                <TableCell align="center">
                  <IconButton
                    style={{ alignSelf: "flex-end", margin: "10px" }}
                    onClick={() => {
                      handleOpen(row._id);
                    }}>
                    <ModeEditOutlineIcon style={{ fontSize: "2rem" }} />
                  </IconButton>
                  {/* <IconButton
                aria-label="delete"
                size="large"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  window.electron.ipcRenderer
                    .invoke("delete-user", {
                      _id: row._id,
                    })
                    .then(() => {
                      usersTable();
                      setAlert7(true);
                    });
                }}
              >
                <DeleteIcon />
              </IconButton> */}
                </TableCell>
              ) : (
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    size="large"
                    sx={{
                      cursor: "none"
                    }}
                  >
                    <PersonIcon />
                  </IconButton>
                </TableCell>
              )}
        </TableRow>
      </>
    );
  }

  return (
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
      <ModalModificarUsuario
        open={open}
        handleClose={handleClose}
        user={userAct}
        userList={userList}
        usersTable={usersTable}
      />
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
            <TableBody
            >
              {userList?.map((row: any) => (
                <Row key={row._id} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
}
