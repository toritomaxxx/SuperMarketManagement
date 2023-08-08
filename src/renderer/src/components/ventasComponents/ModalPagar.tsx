import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Context } from "@renderer/context/Context";
import { useContext } from "react";
import { useSnackbar } from "notistack";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function ModalPagar(props) {
  const { enqueueSnackbar } = useSnackbar();
  const { listaCompras, substractProduct, products, user, mediosDePago } =
    useContext(Context);
  const { open, setOpen, valorTotal } = props;
  const [optionSelected, setOptionSelected] = useState({ value: "" });
  const [vuelto, setVuelto] = useState(0);
  const [efectivo, setEfectivo] = useState("");

  const handleCloseM = () => {
    setOpen(false);
  };

  function BajarStock() {
    listaCompras.forEach((product: any) => {
      const index = products.findIndex((p: any) => p.codBar === product.codBar);
      const newProducts = [...products];
      if (newProducts[index].cant <= 0) {
        enqueueSnackbar("No hay stock de " + product.nameProduct, {
          variant: "error",
          autoHideDuration: 3000,
          preventDuplicate: true,
        });
      }
      newProducts[index].cant = newProducts[index].cant - product.cant;
      window.electron.ipcRenderer.invoke("update-product", newProducts[index]);
    });
  }

  function CargarVenta() {
    const fechaCompleta = new Date().toISOString();
    const fecha = fechaCompleta.split("T")[0];
    const hora = fechaCompleta.split("T")[1].split(".")[0];
    if (optionSelected.value === "") {
      enqueueSnackbar("Por favor seleccione un medio de pago", {
        variant: "error",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });

      return;
    } else if (optionSelected.value === "Efectivo" && efectivo === "") {
      enqueueSnackbar("Por favor ingrese el efectivo", {
        variant: "error",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
    } else {
      window.electron.ipcRenderer
        .invoke("create-sale", {
          fecha: fecha,
          hora: hora,
          usuario: user?.name + " " + user?.lastName,
          productos: listaCompras,
          total: valorTotal,
          medioPago: optionSelected.value,
          vuelto: optionSelected.value === "Efectivo" ? vuelto : 0,
        })
        .then((res: any) => {
          if (res) {
            enqueueSnackbar("Venta realizada con exito", {
              variant: "success",
              autoHideDuration: 3000,
              preventDuplicate: true,
            });
          }
        });

      BajarStock();
      listaCompras.forEach((product: any) => {
        product.cant = 1;
        substractProduct(product);
      });

      setOptionSelected({ value: "" });
      handleCloseM();
    }
    setEfectivo("");
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => {
          handleCloseM();
          setOptionSelected({ value: "" });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <Box sx={style} borderRadius={2}>
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h2"
              align="center"
              p={3}
              fontWeight={"bold"}
            >
              Pagar
            </Typography>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={mediosDePago}
              renderInput={(params) => (
                <TextField {...params} label="Medios de pago" />
              )}
              // @ts-ignore
              onChange={(event: any, newValue: any) => {
                if (newValue === null) {
                  setOptionSelected({ value: "" });
                } else {
                  setOptionSelected(newValue);
                }
              }}
            />
            {optionSelected.value === "Efectivo" ? (
              <Box
                sx={{
                  marginTop: "30px",
                  borderRadius: "10px",
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                }}
              >
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  align="center"
                  p={3}
                >
                  Con cuanto va a pagar?
                </Typography>
                <TextField
                  id="outlined-basic"
                  label="Efectivo"
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    setEfectivo(e.target.value);
                    setVuelto(Number(e.target.value) - valorTotal);
                  }}
                />

                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  align="center"
                  p={3}
                >
                  Su vuelto es de:
                </Typography>
                <Typography id="modal-modal-title" variant="h4" align="center">
                  ${vuelto}
                </Typography>
              </Box>
            ) : null}
            <Box
              sx={{
                marginTop: "30px",
              }}
            >
              <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => {
                  CargarVenta();
                  
                }}
              >
                Pagar
              </Button>
            </Box>
          </Box>
        </>
      </Modal>
    </div>
  );
}
