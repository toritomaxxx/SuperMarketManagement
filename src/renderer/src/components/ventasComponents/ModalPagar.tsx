import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Context } from "@renderer/context/Context";
import { useContext } from "react";
import { AlertBlue, AlertGreen } from "../AlertasVarias/alertaVarias";

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
  const { listaCompras, substractProduct, products,user } = useContext(Context);
  const { open, setOpen, valorTotal } = props;
  const [optionSelected, setOptionSelected] = useState({ value: "" });
  const [vuelto, setVuelto] = useState(0);
  const [efectivo, setEfectivo] = useState("");
  const [alerta, setAlerta] = useState(false);
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);
  const [alert3, setAlert3] = useState(false);

  const handleCloseM = () => {
    setOpen(false);
  };
  const MediosPagoLista = [
    { label: "Efectivo", value: "Efectivo" },
    { label: "Tarjeta", value: "Tarjeta" },
    { label: "Mercado Pago", value: "Mercado Pago" },
    { label: "Uala", value: "Uala" },
  ];

  function BajarStock() {
    listaCompras.forEach((product: any) => {
      const index = products.findIndex((p: any) => p.codBar === product.codBar);
      const newProducts = [...products];
      if (newProducts[index].cant === 0) {
        setAlerta(true);
      }
      newProducts[index].cant = newProducts[index].cant - product.cant;
      window.electron.ipcRenderer.invoke("update-product", newProducts[index]);
    });
  }

  function CargarVenta() {
    if (optionSelected.value === "") {
      setAlert1(true);
      return;
    } else if (optionSelected.value === "Efectivo" && efectivo === "") {
      setAlert2(true);
    } else {
      window.electron.ipcRenderer
        .invoke("create-sale", {
          fecha: new Date().toLocaleDateString(),
          hora: new Date().toLocaleTimeString(),
          usuario: user?.name+" "+user?.lastName,
          productos: listaCompras,
          total: valorTotal,
          medioPago: optionSelected.value,
          vuelto: optionSelected.value === "Efectivo" ? vuelto : 0,
        })
        .then((res: any) => {
          if (res) {
            setAlert3(true);
          }
        });

      BajarStock();
      listaCompras.forEach((product: any) => {
        product.cant = 1;
        substractProduct(product);
      });

      handleCloseM();
    }
  }

  return (
    <div>
      <AlertGreen
        open={alert3}
        setOpen={setAlert3}
        text={"Venta cargada correctamente"}
      />
      <Modal
        open={open}
        onClose={() => {
          handleCloseM();
          setOptionSelected({ value: "" });
          setVuelto(0);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <AlertBlue
            open={alerta}
            setOpen={setAlerta}
            text={"Actualizar stock de " + products.nameProduct}
          />
          <AlertBlue
            open={alert1}
            setOpen={setAlert1}
            text={"Seleccione un medio de pago"}
          />
          <AlertBlue
            open={alert2}
            setOpen={setAlert2}
            text={"Ingrese el efectivo con el que va a pagar"}
          />
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
              options={MediosPagoLista}
              renderInput={(params) => (
                <TextField {...params} label="Medios de pago" />
              )}
              onChange={(event: any, newValue: any) => {
                console.log(event)
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
