import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function Inputs() {
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
          label="Nombre del producto"
          variant="outlined"
          style={{
            paddingBottom: "20px",
          }}
        />
        <TextField
          id="outlined-basic"
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
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>

        <Button
          variant="contained"
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
