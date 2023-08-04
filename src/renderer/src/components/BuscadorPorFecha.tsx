import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { Button } from "@mui/material";

export default function BuscadorPorFecha(props) {
  const { open, setOpen } = props;
  const [fechaD, setFechaD] = useState("");

  const [fechaH, setFechaH] = useState(""
  );

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
            value={fechaD}
            onChange={(e) => setFechaD(e.target.value)}

            sx={{ width: "100%", marginTop: "20px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="date"
            label="Hasta"
            type="date"
            value={fechaH}
            onChange={(e) => setFechaH(e.target.value)}


            sx={{ width: "100%", marginTop: "20px" }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Button
            variant="contained"
            sx={{ width: "100%", marginTop: "20px" }}
            onClick={() => {
              console.log(fechaD, fechaH);
            }}
          >
            Buscar
          </Button>
        </Box>
      </>
    </Modal>
  );
}
