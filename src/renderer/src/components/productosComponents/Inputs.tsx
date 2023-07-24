import { Button, Typography } from "@mui/material";
import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Context } from "@renderer/context/Context";
import { AlertRed } from "../AlertasVarias/alertaVarias";

export default function Inputs() {
  const { productsTable } = useContext(Context);
  const [alerta, setAlerta] = useState(false);
  const [values, setValues] = useState({
    nameProduct: "",
    codBar: "",
    price: "",
    cant: 0,
  });

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
          alert("Producto agregado");
          productsTable();
        } else {
          alert("Error al agregar producto");
        }
      })
      .catch(() => {
        alert("Producto existente");
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
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
          console.log(values);
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
