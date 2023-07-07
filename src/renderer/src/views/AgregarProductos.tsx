import { Grid } from "@mui/material";
import Header from "@renderer/components/Header";
import Inputs from "@renderer/components/productosComponents/Inputs";
import TablaStock from "@renderer/components/productosComponents/TablaStock";
export default function AgregarProductos() {
  return (
    <>
      <Header title="Agregar productos" />
      <Grid

        
        


      >
        <Grid item xs={4}
        


        >
          <Inputs />
        </Grid>
        <Grid item xs={8}>
          <TablaStock />
        </Grid>
      </Grid>
    </>
  );
}
