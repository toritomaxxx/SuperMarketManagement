import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button } from "@mui/material";


export default function BuscadorPorFecha(props) {
  const { open, setOpen, nameBdd, result } = props;
  const [fechaI, setFechaI] = useState("");
  const [fechaF, setFechaF] = useState("");
  const fechaCampo = "fecha";

  function buscarPorFecha() {
    window.electron.ipcRenderer
      .invoke("buscar-por-rango-de-fecha", {
        fechaI,
        fechaF,
        nameBdd,
        fechaCampo,
      })
      .then((res) => {
        result(res);
      });
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
          >
            Buscar por fecha
          </Typography>
          <TextField
            id="date"
            label="Desde"
            type="date"
            value={fechaI}
            onChange={(e) => setFechaI(e.target.value)}
            sx={{ width: "100%", marginTop: "20px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            label="Hasta"
            type="date"
            value={fechaF}
            onChange={(e) => setFechaF(e.target.value)}
            sx={{ width: "100%", marginTop: "20px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            variant="contained"
            sx={{ width: "100%", marginTop: "20px" }}
            onClick={() => {
              buscarPorFecha();
              setOpen(false);
            }}
          >
            Buscar
          </Button>
        </Box>
      </>
    </Modal>
  );
}
