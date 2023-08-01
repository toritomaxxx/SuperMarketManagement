import {  IconButton,  Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import  { useContext } from "react";
import { Context } from "@renderer/context/Context";

export default function BoxUserData(props: any) {
  const { handleOpen } = props;
  const { user } = useContext(Context);

  return (
    <Paper
      elevation={3}
      sx={{
        display: "flex",
        width: "50%",
        flexDirection: "column",
        borderRadius: "1rem",
        gap: "1rem",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight={"bold"}
          style={{
            backgroundColor: "#2E3B55",
            color: "white",
            borderTopLeftRadius: "1rem",
            borderTopRightRadius: "1rem",
            padding: "5px",
          }}
        >
          Datos del usuario
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            padding: "1rem",

          }}
        >
          <Typography variant="h6">
            Nombre : {user?.name} {user?.lastName}
          </Typography>

          <Typography variant="h6">Email : {user?.email} </Typography>
          <Typography variant="h6" color={"red"}>
            {user?.isAdmin ? " Administrador" : " Usuario"}
          </Typography>
        </div>
        <IconButton
          style={{ alignSelf: "flex-end", margin: "10px" }}
          onClick={() => {
            handleOpen();
          }}
        >
          <ModeEditOutlineIcon
            style={{
              fontSize: "2rem",
            }}
          />
        </IconButton>
      </div>
    </Paper>
  );
}
