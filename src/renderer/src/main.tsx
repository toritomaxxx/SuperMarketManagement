import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "./context/Context";
import { SnackbarProvider } from "notistack";
import { MaterialDesignContent } from "notistack";
import styled from "@emotion/styled";
import Routers from "./routes";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#2D7738",
    fontFamily: "Roboto",
  },
  "&.notistack-MuiContent-error": {
    backgroundColor: "#970C0C",
    fontFamily: "Roboto",
  },
  "&.notistack-MuiContent-warning": {
    backgroundColor: "#FFC107",
    fontFamily: "Roboto",
  },
  "&.notistack-MuiContent-info": {
    backgroundColor: "#2196F3",
    fontFamily: "Roboto",
  },
}));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
          warning: StyledMaterialDesignContent,
          info: StyledMaterialDesignContent,
        }}
      >
        <Routers />
      </SnackbarProvider>
    </ContextProvider>
  </React.StrictMode>
);
