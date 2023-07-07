import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Context } from "../context/Context";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function Header(props) {
  const { title } = props;
  const { user, logout } = useContext(Context);
  const navigate = useNavigate();
  const nombreCompleto = user?.name + " " + user?.lastName;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "10vh",
      }}
    >
      <AppBar
        position="relative"
        style={{
          backgroundColor: "#2E3B55",
        }}
      >
        <Toolbar
          variant="dense"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            size="large"
            onClick={() => {
              navigate("/home");
            }}
            color="inherit"
          >
            <ArrowBackIosNewIcon
              style={{
                fontSize: 30,
              }}
            />
            <Typography
              style={{
                fontSize: 20,
                marginLeft: 20,
                fontWeight: "bold",
              }}
            >
              {title}
            </Typography>
          </IconButton>

          <IconButton edge="start" color="inherit" aria-label="menu">
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{ fontSize: 40 }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>{nombreCompleto}</MenuItem>
                <MenuItem onClick={handleLogout}>Cerrar sesíon</MenuItem>
              </Menu>
            </div>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
