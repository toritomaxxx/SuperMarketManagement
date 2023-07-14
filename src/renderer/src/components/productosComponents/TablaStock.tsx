import { Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Context } from "../../context/Context";
import { useContext, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function TablaStock() {
  const { productsTable, products } = useContext(Context);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

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
          <IconButton
            color="primary"
            aria-label="Editar"
            onClick={() => {
              setOpen(!open);
              setSelectedProduct(params.row);
            }}
          >
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

      <Drawer
        anchor={"bottom"}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        ModalProps={{
          style: {
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.5)",
          },
        }}
        SlideProps={{
          direction: "up",
          timeout: 500,
          appear: true,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            fontFamily={"Roboto"}
            fontWeight={"bold"}
            align="center"
            sx={{
              mt: 2,
              mb: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            Actualizar producto
          </Typography>

          <Box component="form">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <TextField
                  label="Nombre"
                  id="outlined-required"
                  variant="outlined"
                  defaultValue={selectedProduct?.nameProduct}
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      nameProduct: e.target.value,
                    });
                  }}
                />
                <TextField
                  id="outlined-required"
                  label="Codigo de barras"
                  variant="outlined"
                  defaultValue={selectedProduct?.codBar}
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      codBar: e.target.value,
                    }); 
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  gap: "10px",
                }}
              >
                <TextField
                  id="outlined-required"
                  label="Cantidad"
                  variant="outlined"
                  defaultValue={selectedProduct?.cant}
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      cant: e.target.value,
                    });
                  }
                  }
                />
                <TextField
                  id="outlined-required"
                  label="Precio"
                  variant="outlined"
                  defaultValue={selectedProduct?.price}
                  onChange={(e) => {
                    setSelectedProduct({
                      ...selectedProduct,
                      price: e.target.value,
                    });
                  }}

                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                padding: "10px",
              }}
            >
              <Button 
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={() => {
                  window.electron.ipcRenderer
                    .invoke("update-product", {
                      _id: selectedProduct?._id,
                      nameProduct:selectedProduct?.nameProduct,
                      codBar: selectedProduct?.codBar,
                      cant: selectedProduct?.cant,
                      price: selectedProduct?.price,
                    })
                    .then((res: any) => {
                      if (res) {
                        alert("Producto actualizado");
                        productsTable();
                      } else {
                        alert("Error al actualizar producto");
                      }
                    })
                    .catch(() => {
                      alert("Error al actualizar producto");
                    });
                }
                }
              >
                Guardar
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
                onClick={() => {
                  setOpen(false);
                }}

              >
                Cancelar
              </Button>
            </div>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
}
