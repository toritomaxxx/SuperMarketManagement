import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import FormControlLabel from "@mui/material/FormControlLabel";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import { useSnackbar } from "notistack";

export default function RegisterInputs() {
  const { enqueueSnackbar } = useSnackbar();
  const [hasUsers, setHasUsers] = useState(true);
  const [search, setSearch] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: hasUsers ? true : false,
  });

  const handleSubmit = (e: any) => {
    if (user.password !== user.confirmPassword) {
      enqueueSnackbar("Las contraseñas no coinciden", {
        variant: "error",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });

      return;
    }
    if (
      user.name === "" ||
      user.lastName === "" ||
      user.email === "" ||
      user.password === "" ||
      user.confirmPassword === ""
    ) {
      enqueueSnackbar("Los campos no pueden estar vacios", {
        variant: "error",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });

      return;
    }
    window.electron.ipcRenderer
      .invoke("register", user)
      .then((res: any) => {
        if (res) {
          enqueueSnackbar("Usuario registrado", {
            variant: "success",
            autoHideDuration: 3000,
            preventDuplicate: true,
          });


          navigate("/login");
        } else {
          enqueueSnackbar("Error al registrar el usuario", {
            variant: "error",
            autoHideDuration: 3000,
            preventDuplicate: true,
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
        enqueueSnackbar("Error al registrar el usuario", {
          variant: "error",
          autoHideDuration: 3000,
          preventDuplicate: true,
      })
      });
  };

  const { revisarUsers } = useContext(Context);

  useEffect(() => {
    revisarUsers().then((res) => {
      setSearch(true);
      setHasUsers(res);
    });
  }, []);

  if (!search) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          gap: "1rem",
          padding: "1rem",
          borderRadius: "1rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.5)",
          width: "500px",
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <CardContent>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              {hasUsers && (
                <NavLink
                  to="/login"
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "1rem",
                    textDecoration: "none",
                    color: "gray",
                    fontSize: "1rem",
                    fontFamily: "Roboto",
                  }}
                >
                  <KeyboardArrowLeftIcon
                    sx={{
                      fontSize: "2rem",
                    }}
                  />
                  Volver
                </NavLink>
              )}
              <Typography
                color="text.secondary"
                gutterBottom
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  fontSize: "3rem",
                }}
              >
                Crear Cuenta
              </Typography>

              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <TextField
                  label="Nombre"
                  type="text"
                  value={user.name}
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                  sx={{
                    width: "48%",
                  }}
                />
                <TextField
                  label="Apellido"
                  type="text"
                  value={user.lastName}
                  onChange={(e) => {
                    setUser({ ...user, lastName: e.target.value });
                  }}
                  sx={{
                    width: "48%",
                  }}
                />
                <TextField
                  label="Email"
                  type="email"
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  sx={{
                    width: "100%",
                  }}
                />

                <TextField
                  label="Contraseña"
                  type="password"
                  value={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  sx={{
                    width: "48%",
                  }}
                />
                <TextField
                  label="Confirmar Contraseña"
                  type="password"
                  value={user.confirmPassword}
                  onChange={(e) => {
                    setUser({ ...user, confirmPassword: e.target.value });
                  }}
                  sx={{
                    width: "48%",
                  }}
                />

                <FormControlLabel
                  value="start"
                  labelPlacement="start"
                  label="Es Administrador?"
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                  control={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography>No</Typography>
                      <Switch
                        type="checkbox"
                        checked={user.isAdmin}
                        value={user.isAdmin}
                        disabled={!hasUsers}
                        onChange={(e) => {
                          setUser({ ...user, isAdmin: e.target.checked });
                        }}
                      />
                      <Typography>Si</Typography>
                    </div>
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  width: "100%",
                }}
              >
                Crear Cuenta
              </Button>
            </Grid>
          </CardActions>
        </form>
      </Card>
    </div>
  );
}
