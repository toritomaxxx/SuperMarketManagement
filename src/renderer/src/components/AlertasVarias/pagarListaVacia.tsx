import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function PagarListaVacia(props) {
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
      <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            No hay productos en la lista de compras
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Aceptar</Button>
      </DialogActions>
    </Dialog>
  );
}
