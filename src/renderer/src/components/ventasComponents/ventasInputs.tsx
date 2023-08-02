import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Context } from "@renderer/context/Context";
import { useContext, useEffect, useRef } from "react";
import { useState } from "react";

export default function VentasInputs() {
  const { products, addNewProduct ,addNewAlerta} = useContext(Context);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const inputAutoFocus = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      inputAutoFocus.current?.focus();
    }, 100);
  }, [inputAutoFocus]);

  useEffect(() => {
    if (value === null) return;
    setInputValue("");
    setValue(null);
    console.log(value);
    console.log(inputValue);
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
          ref={inputAutoFocus}
        
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            console.log(event);
            setInputValue(newInputValue);
          }}
          onChange={(event: any, newValue: any) => {
            console.log(event);
            addNewProduct(newValue);
            setValue(newValue);
          }}
          onKeyDown={(event: any) => {
            console.log(event);

            if (event.key === "Enter") {
              if (inputValue === "") return;
              const product = products.find(
                (product) =>
                  product.nameProduct === inputValue ||
                  product.codBar === inputValue
              );
              if (product === undefined) {
                addNewAlerta({
                  text: "No se encontro el producto",
                  severity: "warning",
                });
                return;
              }
              addNewProduct(product);
              setValue(product);
              setInputValue("");
            }
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
              autoFocus
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
