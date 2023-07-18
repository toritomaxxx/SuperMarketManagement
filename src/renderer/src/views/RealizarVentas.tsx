import { Grid } from "@mui/material";
import Header from "@renderer/components/Header";
import VentasInputs from "@renderer/components/ventasComponents/ventasInputs";
import TablaVentas from "@renderer/components/ventasComponents/tablaVentas";

export default function RealizarVentas() {
  return (
    <>
      <Header
        title="Ventas"
      />
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={4}
          xl={3}
          style={{
            padding: "20px",
          }}
        >
          <VentasInputs />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={8}
          xl={9}
          style={{
            padding: "20px",
          }}
        >
          <TablaVentas />
        </Grid>
      </Grid>
      

    </>
  );
}
