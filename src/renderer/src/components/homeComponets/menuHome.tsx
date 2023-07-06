import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(20),
  textAlign: "center",
  backgroundColor: "#F5F5F5",
  borderRadius: "10px",
  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
  "&:hover": {       
    backgroundColor: "#E8E8E8",
     },
  cursor: "pointer",
}));

export default function DirectionStack() {
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
        spacing={{ xs: 8 }}
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
        <Item
          onClick={() => {
            console.log("click");
          }}
        >
          Item 1
        </Item>
        <Item>Item 2</Item>
        <Item>Long content</Item>
      </Stack>
    </Box>
  );
}
