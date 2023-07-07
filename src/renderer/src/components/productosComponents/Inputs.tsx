import { Button, Grid, Typography } from "@mui/material";
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
        alignItems: "center",
        width: "100vw",
        height: "90vh",
      }}
    >
      <Box
        component="form"
        style={{
          backgroundColor: "#f5f5f5",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "350px",
          height: "400px",
          gap: "20px",
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
          Agregar productos
        </Typography>

        <TextField
          id="outlined-basic"
          label="Nombre del producto"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Codigo de barras"
          variant="outlined"
        />

        <FormControl
          sx={{
            width: "230px",
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
