import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Context } from "@renderer/context/Context";
import { useContext } from "react";
import Button from "@mui/material/Button";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import CancelarCompra from "../AlertasVarias/cancelarCompra";
import ModalPagar from "./ModalPagar";
import PagarListaVacia from "../AlertasVarias/pagarListaVacia";

export default function TablaVentas() {
  const [openAlertCancel, setOpen] = useState(false);
  const [openM, setOpenM] = useState(false);
  const [openP, setOpenP] = useState(false);

  const handleOpenM = () => setOpenM(true);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseP = () => {
    setOpenP(false);
  };

  const { listaCompras, substractProduct, editProduct } = useContext(Context);

  const totalListaCompra = () => {
    let total = 0;
    listaCompras.forEach((product: any) => {
      total += product.price * product.cant;
    });

    return total;
  };

  const columns: GridColDef[] = [
    {
      field: "cant",
      headerName: "Cantidad",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div>
          <TextField
            variant="outlined"
            size="small"
            type="number"
            
            value={params.row.cant}
            onChange={(e) => {
              editProduct(params.row, Number(e.target.value));
              if (Number(e.target.value) < 0) {
                editProduct(params.row, 0);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "m" || e.key === "M") {
                editProduct(params.row, Number(params.row.cant) + 1);
              }

              if (e.key === "n" || e.key === "N") {
                editProduct(params.row, params.row.cant - 1);
                if (params.row.cant < 0) {
                  editProduct(params.row, 0);
                }
              }
            }}
          />
        </div>
      ),
    },

    {
      field: "nameProduct",
      headerName: "Producto",
      minWidth: 200,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "codBar",
      headerName: "Codigo de barras",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Precio Unidad",
      minWidth: 110,
      headerAlign: "center",
      align: "center",
      flex: 1,

      renderCell: (params) => (
        <Typography variant="body1" align="center" m={2}>
          ${params.row.price}
        </Typography>
      ),
    },
    {
      field: "priceT",
      headerName: "Precio total",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      flex: 1,
      renderCell: (params) => (
        <Typography variant="body1" align="center" m={2}>
          ${params.row.price * params.row.cant}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 100,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <DeleteOutlineIcon
          onClick={() => {
            params.row.cant = 1;
            substractProduct(params.row);
          }}
          sx={{
            color: "error.main",
            fontSize: "30px",
          }}
        />
      ),
    },
  ];

  return (
    <Box>
      <Paper
        elevation={3}
        sx={{
          height: "70vh",
          justifyContent: "space-between",
          flexDirection: "column",
          display: "flex",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            
          }}
        >
          <DataGrid
            getRowId={(row) => row.codBar}
            rows={listaCompras ? listaCompras : ""}
            columns={columns}
            style={{
              height: "100%",
              width: "100%",
            }}
            hideFooter
            localeText={{
              noRowsLabel: "Actualmente no hay productos cargados",
            }}
          />
        </Box>
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
              onClick={() => {
                if (listaCompras.length === 0) {
                  setOpenP(true);
                } else {
                  handleClickOpen();
                }
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
              onClick={() => {
                if (listaCompras.length === 0) {
                  setOpenP(true);
                } else {
                  handleOpenM();
                }
              }}
            >
              Pagar
            </Button>
          </Box>
        </div>
      </Paper>
      <CancelarCompra
        open={openAlertCancel}
        setOpen={setOpen}
        handleClose={handleClose}
      />

      <PagarListaVacia
        open={openP}
        setOpen={setOpenP}
        handleClose={handleCloseP}
      />
      <ModalPagar
        open={openM}
        setOpen={setOpenM}
        handleOpenM={handleOpenM}
        valorTotal={totalListaCompra()}
      />
    </Box>
  );
}
