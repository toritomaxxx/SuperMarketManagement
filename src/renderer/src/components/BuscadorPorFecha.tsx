
import Box from '@mui/material/Box';
import Modal from "@mui/material/Modal";
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';


export default function BuscadorPorFecha(props) {
    const {open, handleClose} = props;
    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{

                    width: 500,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}
                >
                {console.log("hola")}
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Buscar por fecha
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField
                        id="date"
                        label="Fecha"
                        type="date"
                        defaultValue="2021-10-01"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Typography>
            </Box>
        </Modal>



    )
}