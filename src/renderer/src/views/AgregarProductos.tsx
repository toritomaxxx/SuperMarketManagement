import Grid from "@mui/material/Grid";
import Header from "@renderer/components/Header";
import Inputs from "@renderer/components/productosComponents/Inputs";
import TablaStock from "@renderer/components/productosComponents/TablaStock";
export default function AgregarProductos() {
  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        height: "100vh",
        width: "100vw",


      }}
    >
      <Header title="Agregar productos" />
      <Grid  container>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={4}
          xl={3}
          style={{
            padding: "20px",
          }}
        >
          <Inputs />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={7}
          lg={8}
          xl={9}
          style={{
            padding: "20px",
          }}
        >
          <TablaStock />
        </Grid>
      </Grid>
    </div>
  );
}
