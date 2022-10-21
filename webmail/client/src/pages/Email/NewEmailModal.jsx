import { Button, TextField, Dialog, DialogContent, DialogTitle, Zoom } from "@mui/material";

export function NewEmailModal({ email, onClose }) {
    return (
        <Dialog
            open={!!email}
            onClose={onClose}
            transitionDuration={250}
            fullScreen={true}
            TransitionComponent={Zoom}>
            <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
                <span>Email</span>
            </DialogTitle>
            <DialogContent>
                <div style={{ margin: '0 auto', marginTop: 10, maxWidth: 500, textAlign: 'center' }}>
                    <TextField fullWidth label="Para:" />
                </div>
                <div style={{ margin: '0 auto', marginTop: 10, maxWidth: 500, textAlign: 'center' }}>
                    <TextField fullWidth label="Assunto:" />
                </div>
                <div style={{ margin: '0 auto', marginTop: 10, maxWidth: 500, textAlign: 'center' }}>
                    <TextField multiline maxRows={10} fullWidth label="Corpo do Email:" />
                </div>
                <div style={{ margin: '0 auto', marginTop: 50, width: 500, display: '' }}>
                    <Button size="large"
                        onClick={() => onClose()} autoFocus>cancelar</Button>
                    <Button size="large"
                        color="primary"
                        onClick={() => onClose()}
                        variant="contained" autoFocus>enviar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}