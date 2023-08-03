import { Button, FormControlLabel, Typography } from "@mui/material";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Context } from "@renderer/context/Context";
import Switch from "@mui/material/Switch";
import { useSnackbar } from "notistack";

export default function Inputs() {
  const {enqueueSnackbar} = useSnackbar();
  const { productsTable, user } = useContext(Context);

  const [state, setState] = useState(false);
  const [values, setValues] = useState({
    nameProduct: "",
    codBar: "",
    price: "",
    cant: 0,
  });
  const nombreCompleto = user?.name + " " + user?.lastName;

  function sinCodBar() {
    if (state){
      setValues({ ...values, codBar: values.codBar });
    }else{
      setValues({ ...values, codBar: "Sin codigo de barras" });
    }

  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      values.nameProduct === "" ||
      values.codBar === "" ||
      values.price === ""
    ) {
      enqueueSnackbar("Los campos no pueden estar vacios", {
        variant: "error",
        autoHideDuration: 3000,
        preventDuplicate: true,
      });
      return;
    }

    window.electron.ipcRenderer
      .invoke("create-product", values)
      .then((res: any) => {
        if (res) {
          enqueueSnackbar("Producto agregado", {
            variant: "success",
            autoHideDuration: 3000,
            preventDuplicate: true,
          });
          productsTable();
        }
      })
      .catch(() => {
        enqueueSnackbar("Error al agregar el producto", {
          variant: "error",
          autoHideDuration: 3000,
          preventDuplicate: true,
        });
      });
    window.electron.ipcRenderer
      .invoke("create-report", {
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        accion: "Nuevo",
        usuario: { nombreCompleto },
        producto: values.nameProduct,
        codBar: values.codBar,
        cantidad: values.cant,
        precio: values.price,
      })
      .then((res: any) => {
        console.log(res);
      })
      .catch(() => {
        console.log("error");
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        paddingTop: "20px",
      }}
    >
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "350px",
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          padding: "20px",
        }}
      >
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#000000",
          }}
        >
          Agregar producto nuevo
        </Typography>

        <TextField
          id="outlined-basic"
          onChange={(e) => {
            setValues({ ...values, nameProduct: e.target.value });
          }}
          label="Nombre del producto"
          variant="outlined"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            padding: "20px",
          }}
        >
          <Typography variant="h6">Tiene codigo de barras?</Typography>
          <FormControlLabel
            control={
              <Switch
                onChange={(e) => {
                  setState(e.target.checked);
                  sinCodBar();
                }}
              />
            }
            label="Habilitado"
          />
          {state && (
            <TextField
              id="outlined-basic"
              onChange={(e) => {
                setValues({ ...values, codBar: e.target.value });
              }}
              label="Codigo de barras"
              variant="outlined"
              style={{
                paddingBottom: "10px",
              }}
            />
          )}
        </div>
        <FormControl
          sx={{
            width: "230px",
            paddingBottom: "20px",
          }}
        >
          <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            onChange={(e) => {
              setValues({ ...values, price: e.target.value });
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
        <Button
          variant="contained"
          type="submit"
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            fontWeight: "bold",
            width: "200px",
            height: "50px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          }}
        >
          Agregar
        </Button>
      </Box>
    </div>
  );
}
