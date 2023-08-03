import { useState } from "react";
import {
  Modal,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useContext } from "react";
import { Context } from "@renderer/context/Context";
import { useSnackbar } from "notistack";

export default function ModalModificarUsuario(props: any) {
  const {
    open,
    handleClose,
    user,
    usersTable,
  } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userUpdate, setUserUpdate] = useState({
    name: user?.name,
    lastName: user?.lastName,
    email: user?.email,
    password: user?.password,
    confirmPassword: user?.confirmPassword,
    isAdmin: user?.isAdmin,
    _id: user?._id,
  });

  function updateUser() {
    if (
      userUpdate.name === "" ||
      userUpdate.lastName === "" ||
      userUpdate.email === "" ||
      userUpdate.password === "" ||
      userUpdate.confirmPassword === ""
    ) {
      enqueueSnackbar("Los campos no pueden estar vacios", {
        variant: "error",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
    } else if (userUpdate.password !== userUpdate.confirmPassword) {
      enqueueSnackbar("Las contraseñas no coinciden", {
        variant: "error",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
    } else {
      window.electron.ipcRenderer
        .invoke("update-user", {
          name: userUpdate?.name,
          lastName: userUpdate?.lastName,
          email: userUpdate?.email,
          password: userUpdate?.password,
          confirmPassword: userUpdate?.confirmPassword,
          isAdmin: userUpdate?.isAdmin,
          _id: userUpdate?._id,
        })
        .then(() => {
          usersTable();
          login(userUpdate);
          handleClose();
          enqueueSnackbar("Usuario modificado correctamente", {
            variant: "success",
            autoHideDuration: 3000,
            preventDuplicate: true,
          });
        });
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
            gap: "1rem",
          }}
        >
          <Typography variant="h4" align="center">
            Modificar Usuario
          </Typography>
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <TextField
              id="outlined-basic"
              label="Nombre"
              type="text"
              variant="outlined"
              style={{ width: "100%" }}
              defaultValue={user?.name}
              value={userUpdate?.name}
              onChange={(e) =>
                setUserUpdate({ ...userUpdate, name: e.target.value })
              }
            />
            <TextField
              id="outlined-basic"
              label="Apellido"
              variant="outlined"
              type="text"
              style={{ width: "100%" }}
              defaultValue={user?.lastName}
              value={userUpdate?.lastName}
              onChange={(e) =>
                setUserUpdate({ ...userUpdate, lastName: e.target.value })
              }
            />
          </div>

          <TextField
            id="outlined-basic"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            defaultValue={user?.email}
            onChange={(e) =>
              setUserUpdate({ ...userUpdate, email: e.target.value })
            }
          />
          <div
            style={{
              display: "flex",
              width: "100%",
              gap: "1rem",
            }}
          >
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                defaultValue={user?.password}
                onChange={(e) =>
                  setUserUpdate({
                    ...userUpdate,
                    password: e.target.value,
                  })
                }
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                defaultValue={user?.password}
                onChange={(e) =>
                  setUserUpdate({
                    ...userUpdate,
                    confirmPassword: e.target.value,
                  })
                }
                id="outlined-adornment-password"
                type={showConfirmPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowConfirmPassword(!showConfirmPassword);
                      }}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          </div>
          <Typography variant="h5" align="center">
            {user?.isAdmin ? "Administrador" : "Usuario"}
          </Typography>
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
                handleClose();
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              fullWidth
              color="success"
              onClick={() => {
                updateUser();
              }}
            >
              Modificar
            </Button>
          </div>
        </div>
      </Paper>
    </Modal>
  );
}
