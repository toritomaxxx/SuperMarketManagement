import { Paper, Typography } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { useContext } from "react";
import { Context } from "@renderer/context/Context";
import { useSnackbar } from "notistack";

export default function BoxMediosPago(props: any) {
  const { mediosDePagoTable, user } = useContext(Context);
  const {enqueueSnackbar} = useSnackbar();
  const { handleOpenAdd, mediosDePago, handleOpenAdd1, setEdit } = props;

  function deletePaymentMethod(id: string) {
    window.electron.ipcRenderer
      .invoke("delete-mediopago", {
        _id: id,
      })
      .then(() => {
        mediosDePagoTable();
        enqueueSnackbar("Medio de pago eliminado", {
          variant: "success",
          autoHideDuration: 3000,
          preventDuplicate: true,
        });
      })

      .catch(() => {
        enqueueSnackbar("Error al eliminar medio de pago", {
          variant: "error",
          autoHideDuration: 3000,
          preventDuplicate: true,
        });
      });
  }

  return (
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
            paddingRight: "1rem",
            justifyItems: "center",
            alignItems: "center",
            height: "3.5rem",
          }}
        >
          Medios de Pago
          {user?.isAdmin && (
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
          )}
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
            {mediosDePago.map((medioDePago: any) => (
              <TableRow key={medioDePago._id}>
                <TableCell size="small" style={{ fontSize: "1rem" }}>
                  <Typography variant="h6" fontWeight={"bold"}>
                    {medioDePago.label}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {medioDePago.label !== "Efectivo" && user?.isAdmin && (
                    <div>
                      <IconButton
                        color="primary"
                        aria-label="Editar"
                        onClick={() => {
                          handleOpenAdd1();
                          setEdit(medioDePago);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="Borrar"
                        onClick={() => {
                          deletePaymentMethod(medioDePago._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
