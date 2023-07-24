import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

export const AlertRed = (props) => {
  const { open, setOpen, text } = props;

  return (
    <Box
      sx={{
        width: "95%",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        margin: "auto",
      }}
    >
      <Collapse in={open}>
        <Alert
          severity="error"
          variant="filled"
          style={{
            margin: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            zIndex: 1000,
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {text}
        </Alert>
      </Collapse>
    </Box>
  );
};

export const AlertGreen = (props) => {
  const { open, setOpen, text } = props;

  return (
    <Box
      sx={{
        width: "95%",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        margin: "auto",
      }}
    >
      <Collapse in={open}>
        <Alert
          severity="success"
          variant="filled"
          style={{
            margin: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            zIndex: 1000,
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {text}
        </Alert>
      </Collapse>
    </Box>
  );
};

export const AlertYellow = (props) => {
  const { open, setOpen, text } = props;

  return (
    <Box
      sx={{
        width: "95%",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        margin: "auto",
      }}
    >
      <Collapse in={open}>
        <Alert
          severity="warning"
          variant="filled"
          style={{
            margin: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            zIndex: 1000,
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {text}
        </Alert>
      </Collapse>
    </Box>
  );
};

export const AlertBlue = (props) => {
  const { open, setOpen, text } = props;

  return (
    <Box
      sx={{
        width: "95%",
        position: "absolute",
        top: "0",
        left: "0",
        right: "0",
        margin: "auto",
      }}
    >
      <Collapse in={open}>
        <Alert
          severity="info"
          variant="filled"
          style={{
            margin: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            zIndex: 1000,
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {text}
        </Alert>
      </Collapse>
    </Box>
  );
};
