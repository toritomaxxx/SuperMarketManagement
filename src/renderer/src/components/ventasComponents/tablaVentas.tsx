import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Context } from "@renderer/context/Context";
import { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";

export default function TablaVentas() {
  const { listaCompras, addNewProduct, substractProduct } = useContext(Context);
  const sizeDefault = 13;
  const [tablaLlena, setTablaLlena] = useState(sizeDefault);

  const totalListaCompra = () => {
    let total = 0;
    listaCompras.forEach((product: any) => {
      total += product.price * product.cant;
    });
    return total;
  };

  useEffect(() => {
    if (listaCompras.length < sizeDefault) {
      setTablaLlena(sizeDefault - listaCompras.length);
    } else {
      setTablaLlena(0);
    }
  }, [listaCompras]);
  return (
    <Box
      sx={{
        display: "flex",

        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          height: "70vh",
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          flexDirection: "column",
          display: "flex",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
        }}
      >
        <TableContainer component={Paper}>
          <Table>
            <TableHead
              sx={{
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
              }}
            >
              <TableRow>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Producto</TableCell>
                <TableCell align="center">Codigo de barras</TableCell>
                <TableCell align="center">Precio unidad</TableCell>
                <TableCell align="center">Precio total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody
              sx={{
                "& > :not(style)": {
                  borderBottom: "none",
                },
              }}
            >
              {listaCompras.map((product: any) => (
                <TableRow key={product.nameProduct}>
                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        substractProduct(product);
                      }}
                      style={{
                        fontSize: "40px",
                        fontWeight: "bold",
                        height: "40px",
                        width: "40px",
                        minWidth: "40px",
                        borderRadius: "50%",
                        padding: "0px",
                        margin: "0px",
                        lineHeight: "0px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      -
                    </Button>
                    {product.cant}
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => {
                        addNewProduct(product);
                      }}
                      style={{
                        fontSize: "40px",
                        fontWeight: "bold",
                        height: "40px",
                        width: "40px",
                        minWidth: "40px",
                        borderRadius: "50%",
                        padding: "0px",
                        margin: "0px",
                        lineHeight: "0px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      +
                    </Button>
                  </TableCell>
                  <TableCell align="center">{product.nameProduct}</TableCell>
                  <TableCell align="center">{product.codBar}</TableCell>
                  <TableCell align="center">${product.price}</TableCell>
                  <TableCell align="center">
                    ${product.cant * product.price}
                  </TableCell>
                </TableRow>
              ))}
              {tablaLlena > 0 &&
                [...Array(tablaLlena)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f5f5f5",
            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",

              padding: "10px",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" fontWeight={"bold"}>
              Total:{" "}
            </Typography>
            <Typography variant="h4"> ${totalListaCompra()}</Typography>
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              alignItems: "center",
              backgroundColor: "#f5f5f5",
            }}
          >
            <Button
              variant="contained"
              color="error"
              sx={{
                marginLeft: "10px",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{
                marginLeft: "10px",
                padding: "10px",
                fontSize: "20px",
              }}
            >
              Pagar
            </Button>
          </Box>
        </div>
      </Paper>
    </Box>
  );
}
