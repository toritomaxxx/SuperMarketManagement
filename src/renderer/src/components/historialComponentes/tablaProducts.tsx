import { IconButton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Context } from "@renderer/context/Context";
import { useContext, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import BuscadorPorFecha from "./../BuscadorPorFecha";
import { useState } from "react";

function createData(
  fecha: string,
  hora: string,
  usuario: any,
  accion: string,
  producto: any
) {
  return {
    fecha,
    hora,
    usuario,
    accion,
    producto,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  return (
    <>
      <TableRow>
        <TableCell align="center">{row.fecha}</TableCell>
        <TableCell align="center">{row.hora}</TableCell>
        <TableCell align="center">{row.usuario.nombreCompleto}</TableCell>
        <TableCell align="center">{row.accion}</TableCell>
        <TableCell align="center">{row.producto.substring(0, 30)}</TableCell>
      </TableRow>
    </>
  );
}

export default function TablaProducts() {
  const { reportsProducts, reportsTableProducts } = useContext(Context);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    reportsTableProducts();
  }, []);

  return (
    <Box
      style={{
        padding: "20px",
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
      }}
    >
      <BuscadorPorFecha open={open} setOpen={setOpen} />
      <Typography
        variant="h5"
        fontWeight="bold"
        align="center"
        style={{
          backgroundColor: "#F5F5F5",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        Historial de Productos
        <IconButton
          aria-label="refresh"
          onClick={() => setOpen(true)}
          style={{
            float: "right",
          }}
        >
          <SearchIcon
            style={{
              color: "#000000",
              fontSize: "30px",
              marginTop: "-5px",
            }}
          />
        </IconButton>
      </Typography>

      <TableContainer
        component={Paper}
        style={{
          height: "calc(75vh - 200px)",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          padding: "2px",
        }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow
              style={{
                backgroundColor: "#F5F5F5",
              }}
            >
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Hora</TableCell>
              <TableCell align="center">Usuario</TableCell>
              <TableCell align="center">Accion</TableCell>
              <TableCell align="center">Producto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportsProducts.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
