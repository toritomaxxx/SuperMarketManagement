import { Button, Typography } from "@mui/material";
import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Context } from "@renderer/context/Context";
import { AlertRed, AlertBlue, AlertGreen } from "../AlertasVarias/alertaVarias";

export default function Inputs() {
  const { productsTable, user } = useContext(Context);
  const [alerta, setAlerta] = useState(false);
  const [alerta1, setAlerta1] = useState(false);
  const [alerta2, setAlerta2] = useState(false);
  const [values, setValues] = useState({
    nameProduct: "",
    codBar: "",
    price: "",
    cant: 0,
  });
  const nombreCompleto = user?.name + " " + user?.lastName;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      values.nameProduct === "" ||
      values.codBar === "" ||
      values.price === ""
    ) {
      setAlerta(true);
      return;
    }

    window.electron.ipcRenderer
      .invoke("create-product", values)
      .then((res: any) => {
        if (res) {
          setAlerta2(true);
          productsTable();
        }
      })
      .catch(() => {
        setAlerta1(true);
      });
    window.electron.ipcRenderer
      .invoke("create-report", {
        fecha: new Date().toLocaleDateString(),
        hora: new Date().toLocaleTimeString(),
        accion: "Se agrego un producto nuevo",
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
      <AlertRed
        open={alerta}
        setOpen={setAlerta}
        text="Rellene todos los campos"
      />
      <AlertBlue
        open={alerta1}
        setOpen={setAlerta1}
        text="Los datos cargados coinciden con un producto ya existente"
      />
      <AlertGreen
        open={alerta2}
        setOpen={setAlerta2}
        text="Producto agregado"
      />
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
          style={{
            paddingBottom: "20px",
          }}
        />
        <TextField
          id="outlined-basic"
          onChange={(e) => {
            setValues({ ...values, codBar: e.target.value });
          }}
          label="Codigo de barras"
          variant="outlined"
          style={{
            paddingBottom: "20px",
          }}
        />
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
