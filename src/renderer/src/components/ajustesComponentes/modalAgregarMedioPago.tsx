import { useEffect, useState } from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Context } from "@renderer/context/Context";
import { useContext } from "react";

export default function modalAgregarMedioPago(props: any) {
  const { openAdd, handleCloseAdd, titulo, edit } = props;
  const { mediosDePago, mediosDePagoTable } = useContext(Context);
  const [paymentMethod, setPaymentMethod] = useState({
    value: "",
    label: "",
  });
  useEffect(() => {
    if (edit) {
      setPaymentMethod(edit);
    }
  }, [edit]);

  function addPaymentMethod() {
    if (paymentMethod.label === "") {
      alert("Por favor complete todos los campos");
      return;
    }
    if (
      mediosDePago.find(
        (e) => e.label.toLowerCase() === paymentMethod.label.toLowerCase()
      )
    ) {
      alert("Ya existe un medio de pago con ese nombre");
      return;
    }

    window.electron.ipcRenderer
      .invoke("create-mediopago", paymentMethod)
      .then((res: any) => {
        if (res) {
          alert("Medio de pago creado correctamente");
          mediosDePagoTable();
          handleCloseAdd();
        } else {
          alert("Error al crear medio de pago");
        }
      });
  }

  function editPaymentMethod() {
    if (paymentMethod.label === "") {
      alert("Por favor complete todos los campos");
      return;
    }
    if (
      mediosDePago.find(
        (e) => e.label.toLowerCase() === paymentMethod.label.toLowerCase()
      )
    ) {
      alert("Ya existe un medio de pago con ese nombre");
      return;
    }

    window.electron.ipcRenderer
      .invoke("update-mediopago", paymentMethod)
      .then((res: any) => {
        if (res) {
          alert("Medio de pago editado correctamente");
          mediosDePagoTable();
          handleCloseAdd();
        } else {
          alert("Error al editar medio de pago");
        }
      });
  }

  return (
    <Modal
      open={openAdd}
      onClose={handleCloseAdd}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          padding: "30px",
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

            width: "100%",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Typography variant="h4">{titulo}</Typography>
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "1rem",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Medio de Pago"
              variant="outlined"
              fullWidth
              defaultValue={paymentMethod.label}
              value={paymentMethod.label}
              onChange={(e) =>
                setPaymentMethod({
                  ...paymentMethod,
                  label: e.target.value,
                  value: e.target.value,
                })
              }
            />
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "1rem",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              fullWidth
              color="error"
              onClick={() => {
                handleCloseAdd();
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              fullWidth
              color="success"
              onClick={() => {
                if (edit) {
                  editPaymentMethod();
                } else {
                  addPaymentMethod();
                }
              }}
            >
              Agregar
            </Button>
          </div>
        </div>
      </Paper>
    </Modal>
  );
}
