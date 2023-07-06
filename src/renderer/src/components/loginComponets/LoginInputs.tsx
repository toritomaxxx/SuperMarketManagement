import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context";
import { useContext } from "react";

export default function LoginInputs() {
  const { login } = useContext(Context);
  const [mostrarContraseña, setMostrarContraseña] = useState(false);
  const [user, setUser] = useState({
    email: "admin@admin",
    password: "1234",
  });
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (user.email === "" || user.password === "") {
      alert("Por favor llene todos los campos");
      return;
    }
    window.electron.ipcRenderer
      .invoke("login", user)
      .then((res: any) => {
        if (res) {
          login(res);

          navigate("/home");
        } else {
          alert("Error al iniciar sesion");
        }
      })
      .catch(() => {
        alert("Usuario no existente");
      });
  };

  const MostrarContraseña = () => {
    setMostrarContraseña(!mostrarContraseña);
  };

  useEffect(() => {
    console.log(mostrarContraseña);
  }, [mostrarContraseña]);
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
          widthMin: "500px",
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
              <Typography
                color="text.secondary"
                gutterBottom
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  fontSize: "3rem",
                }}
              >
                Acceder
              </Typography>
              <TextField
                label="Direccion de email"
                type="email"
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
                sx={{
                  width: "100%",
                }}
              />
              <TextField
                label="Contraseña"
                type={mostrarContraseña ? "text" : "password"}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                sx={{
                  width: "100%",
                }}
              />
            </Grid>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Typography color="text.secondary" gutterBottom>
                Mostar contraseña
              </Typography>
              <Checkbox
                checked={mostrarContraseña}
                onChange={MostrarContraseña}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </CardContent>
          <CardActions>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              gap={2}
            >
              <Button variant="contained" type="submit">
                Acceder
              </Button>
              <NavLink
                to="/register"
                style={{
                  textDecoration: "none",
                  outline: "none",
                  color: "gray",
                  fontSize: "1rem",
                  fontFamily: "Roboto",
                  maskMode: "none",
                }}
              >
                ¿No tienes cuenta? Registrate
              </NavLink>
            </Grid>
          </CardActions>
        </form>
      </Card>
    </div>
  );
}
