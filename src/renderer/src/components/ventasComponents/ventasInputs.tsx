import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Context } from "@renderer/context/Context";
import { useContext } from "react";


export default function VentasInputs() {
  const { products,addNewProduct } = useContext(Context);



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
          disablePortal
          id="combo-box-demo"
          options={products}
          onChange={(event: any, newValue: any) => {
            // setListaCompras((prev: any) => [...prev, newValue]);
            addNewProduct(newValue);
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
