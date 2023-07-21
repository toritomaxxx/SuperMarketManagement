import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Context } from "@renderer/context/Context";
import { useContext, useEffect } from "react";
import { useState } from "react";

export default function VentasInputs() {
  const { products, addNewProduct } = useContext(Context);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (inputValue === "") return;
    setInputValue("");
    setValue(null);
  }, [value, inputValue]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: "100%",
          height: "100%",
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <Autocomplete
          options={products}
          value={value}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          onChange={(event: any, newValue: any) => {
            addNewProduct(newValue);
            setValue(newValue);
          }}
          getOptionLabel={(product: any) =>
            product.nameProduct + " (" + product.codBar + ")"
          }
          renderOption={(props, product) => (
            <Box
              component="li"
              sx={{
                "& > img": {
                  mr: 2,
                  flexShrink: 0,
                },
              }}
              {...props}
            >
              {product.nameProduct}
              {" ("}
              {product.codBar}
              {")"}
            </Box>
          )}
          sx={{
            margin: "10px",
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ingrese el codigo de barras o nombre del producto"
              InputProps={{
                ...params.InputProps,
                autoComplete: "new-password", // disable autocomplete and autofill
              }}
            />
          )}
        />
      </Paper>
    </Box>
  );
}
