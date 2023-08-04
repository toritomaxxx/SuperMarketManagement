import Header from "@renderer/components/Header";
import Grid from "@mui/material/Grid";
import TablaProducts from "@renderer/components/historialComponentes/tablaProducts";
import TablaVentas from "@renderer/components/historialComponentes/tablaVentas";
import BoxRecaudacionMes from "@renderer/components/historialComponentes/boxRecaudacionMes";

export default function Historial() {
  return (
    <>
      <Header title="Historial" />
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          style={{
            padding: "20px",
          }}
        >
          <TablaProducts />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          xl={6}
          style={{
            padding: "20px",
          }}
        >
          <TablaVentas />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          style={{
            padding: "0px 20px 10px 20px",
          }}
        >
          <BoxRecaudacionMes />
        </Grid>
      </Grid>
    </>
  );
}
