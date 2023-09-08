import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Context } from "@renderer/context/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSnackbar } from "notistack";

export default function ModalAdmin(props) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { login } = useContext(Context);

  const { open, setOpen } = props;
  const [codigo, setCodigo] = useState("");
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e: any) => {
    if (codigo === "") {
      enqueueSnackbar("Los campos no pueden estar vacío", {
        variant: "error",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
      return;
    }

    e.preventDefault();
    window.electron.ipcRenderer
      .invoke("loginAdm", {
        password: codigo,
      })
      .then((res: any) => {
        if (res) {
          login(res);
          navigate("/register");
        }
      })
      .catch(() => {

        setCodigo("");
      });
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <>


          <Fade in={open}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "400px",
                bgcolor: "background.paper",
                boxShadow: "0 0 10px rgba(0,0,0,0.5)",
                borderRadius: "1rem",
                padding: "40px",
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
                sx={{
                  textAlign: "center",
                  marginBottom: "20px",
                }}
              >
                Ingrese el codigo de administrador
              </Typography>
              <TextField
                id="outlined-basic"
                label="Codigo"
                variant="outlined"
                type="password"
                value={codigo}
                onChange={(e) => {
                  setCodigo(e.target.value);
                }}
                sx={{
                  width: "100%",
                }}
              />
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  marginTop: "20px",
                }}
                onClick={handleSubmit}
              >
                Ingresar
              </Button>
            </Box>
          </Fade>
        </>
      </Modal>
    </div>
  );
}
