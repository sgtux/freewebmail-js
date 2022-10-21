import { Button, TextField, Dialog, DialogContent, DialogTitle, Zoom } from "@mui/material";

export function ViewEmailModal({ show, onClose }) {

    return (
        <Dialog
            open={show}
            onClose={onClose}
            transitionDuration={250}
            fullScreen={true}
            TransitionComponent={Zoom}>
            <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
                <span>Email</span>
            </DialogTitle>
            <DialogContent>
                <div style={{ margin: '0 auto', marginTop: 10, maxWidth: 500, textAlign: 'center' }}>
                    <TextField label="Para:" />
                </div>
            </DialogContent>
            <div style={{ marginBottom: 20, marginRight: 20, textAlign: 'end' }}>
                <Button size="large"
                    onClick={() => onClose()} autoFocus>cancelar</Button>
                <Button size="large"
                    color="primary"
                    onClick={() => onClose()}
                    variant="contained" autoFocus>enviar</Button>
            </div>
        </Dialog>
    )
}