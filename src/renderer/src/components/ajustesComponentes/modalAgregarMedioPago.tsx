import { useEffect, useState } from "react";
import { Paper, Typography, TextField, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Context } from "@renderer/context/Context";
import { useContext } from "react";
import { useSnackbar } from "notistack";

export default function modalAgregarMedioPago(props: any) {
  const { enqueueSnackbar } = useSnackbar();
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
      enqueueSnackbar("El campo no puede estar vacio", {
        variant: "error",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
      return;
    }
    if (
      mediosDePago.find(
        (e) => e.label.toLowerCase() === paymentMethod.label.toLowerCase()
      )
    ) {
      enqueueSnackbar("El medio de pago ya existe", {
        variant: "error",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });

      return;
    }

    window.electron.ipcRenderer
      .invoke("create-mediopago", paymentMethod)
      .then((res: any) => {
        if (res) {
          enqueueSnackbar("Medio de pago creado correctamente", {
            variant: "success", 
            autoHideDuration: 3000,
            preventDuplicate: true,
          });

          mediosDePagoTable();
          handleCloseAdd();
        }
      });
  }

  function editPaymentMethod() {
    if (paymentMethod.label === "") {
      enqueueSnackbar("El campo no puede estar vacio", {
        variant: "error",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
      return;
    }
    if (
      mediosDePago.find(
        (e) => e.label.toLowerCase() === paymentMethod.label.toLowerCase()
      )
    ) {
      enqueueSnackbar("El medio de pago ya existe", {
        variant: "error",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
      return;
    }

    window.electron.ipcRenderer
      .invoke("update-mediopago", paymentMethod)
      .then((res: any) => {
        if (res) {
          enqueueSnackbar("Medio de pago editado correctamente", {
            variant: "success",
            autoHideDuration: 3000,
            preventDuplicate: true,
          });
          mediosDePagoTable();
          handleCloseAdd();
          paymentMethod.label = "";
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
