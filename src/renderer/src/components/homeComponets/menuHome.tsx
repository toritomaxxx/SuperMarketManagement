import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HistoryIcon from "@mui/icons-material/History";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(8),
  textAlign: "center",
  backgroundColor: "#F5F5F5",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  "&:hover": {
    backgroundColor: "#E8E8E8",
  },
  cursor: "pointer",
}));

const WrapItem = ({ Icon, title, onClick }) => {
  return (
    <Item onClick={onClick}>
      <Icon
        style={{
          fontSize: 200,
        }}
        />
      <Typography
        variant="h5"
        fontWeight="bold"
        >
        {title}
      </Typography>
    </Item>
  );
};

export default function DirectionStack() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={{ xs: 12 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
        sx={{
          width: "100vw",
          height: "90vh",
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <WrapItem
          title="Agregar productos"
          Icon={AddBusinessIcon}
          onClick={() => navigate("/productos")}
        />
        <WrapItem
          title="Realizar ventas"
          Icon={AddShoppingCartIcon}
          onClick={() => navigate("/ventas")}
        />
        <WrapItem
          title="Ver Historial"
          Icon={HistoryIcon}
          onClick={() => navigate("/historial")}
        />
      </Stack>
    </Box>
  );
}
