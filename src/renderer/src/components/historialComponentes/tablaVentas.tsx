import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Context } from "@renderer/context/Context";
import { useContext, useEffect } from "react";

const customCell = (params: any) => {
  return (
    <div
      style={{
        height: 600 + 400 * params.value.length,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {params.value.map((item: any) => (
        <Typography variant="body2" color="text.secondary" margin={1}>
          {item.nameProduct}
        </Typography>
      ))}
      ,
    </div>
  );
};

const columns: GridColDef[] = [
  { field: "fecha", headerName: "Fecha", width: 100 },
  { field: "hora", headerName: "Hora", width: 100 },
  { field: "usuario", headerName: "Usuario", width: 70 },

  {
    field: "productos",
    headerName: "Producto",
    minWidth: 200,
    align: "center",
    flex: 1,
    renderCell: customCell,
  },
  {
    field: "total",
    headerName: "Monto",
    width: 70,
    renderCell: (params) => (
      <Typography variant="body2" color="text.secondary">
        ${params.value}
      </Typography>
    ),
  },
  { field: "medioPago", headerName: "Medio de Pago", width: 500 },
];

export default function TablaVentas() {
  const { reportsSales, reportsTableSales } = useContext(Context);
  console.log(reportsSales);

  useEffect(() => {
    reportsTableSales();
  }, []);

  return (
    <Box
      style={{
        padding: "20px",
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
        borderRadius: "5px",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        align="center"
        style={{
          backgroundColor: "#F5F5F5",

          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          borderRadius: "5px",
        }}
      >
        Historial de ventas
      </Typography>
      <DataGrid
        rows={reportsSales ? reportsSales : []}
        columns={columns}
        getRowId={(row) => row._id}
        rowHeight={
          reportsSales ? 600 + 400 * reportsSales[0].productos.length : 0
        }
        hideFooter
        style={{
          marginTop: "4px",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          height: "calc(100vh - 200px)",
          padding: "2px",
        }}
      />
    </Box>
  );
}
