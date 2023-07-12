import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";


export default function TablaStock() {
  const { productsTable, products } = useContext(Context);



  const columns: GridColDef[] = [
    {
      field: "nameProduct",
      headerName: "Nombre",
      flex: 1,
      minWidth: 100,
    },
    {
      field: "codBar",
      headerName: "Codigo de barras",
      type: "number",
      align: "center",
      flex: 1,
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "cant",
      headerName: "Cantidad en stock",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 150,
    },
    {
      field: "price",
      headerName: "Precio",
      type: "number",
      align: "center",
      headerAlign: "center",

      minWidth: 80,
      flex: 1,
      renderCell: (params) => (
        <div>
          <Typography variant="body1" align="center">
            ${params.row.price}
          </Typography>
        </div>
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      align: "center",
      headerAlign: "center",
      flex: 1,
      minWidth: 80,
      renderCell: (params) => (
        <div>
          <IconButton color="primary" aria-label="Editar">
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="Borrar">
            <DeleteIcon
              onClick={() => {
                window.electron.ipcRenderer
                  .invoke("delete-product", { _id: params.row._id })
                  .then((res: any) => {
                    if (res) {
                      alert("Producto eliminado");
                      productsTable();
                    } else {
                      alert("Error al eliminar producto");
                    }
                  })
                  .catch(() => {
                    alert("Error al eliminar producto");
                  });
              }}
            />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div
      style={{
        height: "70vh",
        width: "90%",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Typography
          variant="h5"
          fontFamily={"Roboto"}
          style={{
            color: "#000",
            fontWeight: "bold",
            backgroundColor: "#fff",
            borderRadius: "10px",
            padding: "10px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            width: "100%",
            textAlign: "center",
          }}
        >
          Stock Actual
        </Typography>
      </div>

      <DataGrid
        rows={products ? products : ""}
        localeText={{
          noRowsLabel: "Actualmente no hay productos cargados",
        }}
        getRowId={(row) => row._id}
        columns={columns}
        density="compact"
        hideFooter
        style={{
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          padding: "10px",
        }}
      />
    </div>
  );
}
