import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function CancelarCompra(props) {
  const { listaCompras, substractProduct } = useContext(Context);
  const { handleClose, setOpen, open } = props;

  const BorrarCompra = () => {
    setOpen(false);
    listaCompras.forEach((product: any) => {
      product.cant = 1;
      substractProduct(product);
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Cancelar la compra?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Esta seguro que desea cancelar la compra?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={BorrarCompra} autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
