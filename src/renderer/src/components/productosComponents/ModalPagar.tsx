import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import Modal from "@mui/material/Modal";


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
  const { open, setOpen, valorTotal } = props;
  const [optionSelected, setOptionSelected] = useState({ value: "" });
  const [vuelto, setVuelto] = useState(0);

  const handleCloseM = () => setOpen(false);
  const MediosPagoLista = [
    { label: "Efectivo", value: "Efectivo" },
    { label: "Tarjeta", value: "Tarjeta" },
    { label: "Mercado Pago", value: "Mercado Pago" },
    { label: "Uala", value: "Uala" },
  ];



  return (
    <div>
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
              onClick={handleCloseM}
            >
              Pagar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
