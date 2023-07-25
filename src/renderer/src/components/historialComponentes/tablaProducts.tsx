import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function TablaProducts() {
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
        fontFamily={"Roboto"}
        align="center"
        style={{
          backgroundColor: "#F5F5F5",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          borderRadius: "5px",
        }}
      >
        Historial de productos
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        density="compact"
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
