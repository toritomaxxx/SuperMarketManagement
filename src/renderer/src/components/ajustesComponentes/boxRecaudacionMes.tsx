import { Typography } from "@mui/material";
import { Context } from "../../context/Context";
import { useContext, useEffect, useState } from "react";


export default function BoxRecaudacionMes() {
  const { reportsSales } = useContext(Context);

  const [recaudacion, setRecaudacion] = useState({});

  useEffect(() => {
    CargarGananciasPorMoneda();
  }, [reportsSales]);

  function CargarGananciasPorMoneda() {
    const newRecaudacion = {};
    for (const a of reportsSales) {
      const conseguirMes = a.fecha.split("/");
      if (conseguirMes[1] == new Date().getMonth() + 1) {
        if (!newRecaudacion[a.medioPago]) {
          newRecaudacion[a.medioPago] = 0;
        }
        newRecaudacion[a.medioPago] += Number(a.total);
        setRecaudacion(newRecaudacion);
      }
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "5px",
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        align="center"
        style={{
          backgroundColor: "#F5F5F5",
          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          padding: "10px",
          width: "100%",
        }}
      >
        Recaudación mensual por medio de pago
      </Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "10px",
          gap: "10px",

          overflowY: "auto",
        }}
      >
        {Object.keys(recaudacion).length !== 0 ? (
          Object.keys(recaudacion).map((key) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                padding: "10px",
                borderRadius: "5px",
                boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",

                width: "200px",
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                align="center"
                color={"primary"}
              >
                {key}
              </Typography>
              <Typography variant="h6" align="center">
                ${recaudacion[key]}
              </Typography>
            </div>
          ))
        ) : (
          <Typography variant="h6" align="center">
            No hay ventas en este mes
          </Typography>
        )}
      </div>
    </div>
  );
}
