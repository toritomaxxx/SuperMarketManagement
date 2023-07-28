import Header from "@renderer/components/Header";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Context } from "@renderer/context/Context";
import { useContext, useEffect, useState } from "react";
import { Typography } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Ajustes() {
  const { user, userList, usersTable } = useContext(Context);

  function createData(name: string, lastName: string, email: string) {
    return { name, lastName, email };
  }

  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    return (
      <>
        <TableRow>
          <TableCell align="center">{row.name}</TableCell>
          <TableCell align="center">{row.lastName}</TableCell>
          <TableCell align="center">{row.email}</TableCell>
          {user?.email !== row.email ? (
            <TableCell align="center">
              <DeleteIcon
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  console.log("delete");
                }}
              />
            </TableCell>
          ) : null}
        </TableRow>
      </>
    );
  }

  useEffect(() => {
    usersTable();
  }, []);

  return (
    <>
      <Header title="Ajustes" />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            padding: "2rem",
            width: "80%",
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
            <Typography variant="h4">Datos del usuario</Typography>
            <Typography variant="h5">
              Usuario : {user?.name} {user?.lastName}
            </Typography>

            <Typography variant="h5">Email : {user?.email} </Typography>
            <Typography variant="h5">
              {user?.isAdmin ? " Administrador" : " Usuario"}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                cursor: "pointer",
              }}
            >
              <Typography variant="h5">Editar</Typography>
              <ModeEditOutlineIcon sx={{ fontSize: 40, marginLeft: "10px" }} />
            </Typography>
          </div>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            padding: "2rem",
            width: "80%",
            marginTop: "2rem",
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
            <Typography variant="h4" align="center" margin={"10px"}>
              Gestion de Usuarios
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Nombre</TableCell>
                    <TableCell align="center">Apellido</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center"></TableCell>
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
