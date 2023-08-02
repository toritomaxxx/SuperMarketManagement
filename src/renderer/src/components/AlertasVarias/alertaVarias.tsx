import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";


export const AlertComponent = (props) => {
  const { text, onCloseAlert, severity } = props;
  const [open, setOpen] = useState(true);
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    console.log(event);
    if (reason === "clickaway") {
      return;
    }
    onCloseAlert();
    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {text}
      </Alert>
    </Snackbar>
  );
};

