import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Context } from "@renderer/context/Context";
import { useContext, useEffect, useState } from "react";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatCurrency } from "@renderer/utils/functions";

function createData(
  fecha: string,
  hora: string,
  usuario: any,
  total: number,
  medioPago: string,
  productos: any[]
) {
  return {
    fecha,
    hora,
    usuario,
    total,
    medioPago,
    productos,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row" align="center">
          {row.fecha}
        </TableCell>
        <TableCell align="center">{row.hora}</TableCell>
        <TableCell align="center">{row.usuario}</TableCell>
        <TableCell align="center">$ {row.total}</TableCell>
        <TableCell align="center">{row.medioPago}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table
                size="small"
                aria-label="purchases"
                style={{
                  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                  borderRadius: "5px",
                }}
              >
                <TableHead>
                  <TableRow
                    style={{
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    <TableCell>Producto</TableCell>
                    <TableCell align="right">Cantidad</TableCell>
                    <TableCell align="right">Precio Unidad</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.productos.map((historyRow) => (
                    <TableRow key={historyRow._id}>
                      <TableCell
                        component="th"
                        style={{
                          flex: 1,
                        }}
                      >
                        {historyRow.nameProduct.substring(0, 30)}
                      </TableCell>
                      <TableCell align="right">{historyRow.cant}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(Number(historyRow.price))}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(historyRow.cant * historyRow.price)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default function TablaVentas() {
  const { reportsSales, reportsTableSales } = useContext(Context);

  useEffect(() => {
    reportsTableSales();
  }, []);

  return (
    <Box
      style={{
        padding: "20px",
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
      }}
    >
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
        Historial de ventas
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
              <TableCell
                style={{
                  width: "0px",
                }}
              />
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Hora</TableCell>
              <TableCell align="center">Usuario</TableCell>
              <TableCell align="center">Monto</TableCell>
              <TableCell align="center">Medio de Pago</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportsSales.map((row) => (
              <Row key={row._id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
