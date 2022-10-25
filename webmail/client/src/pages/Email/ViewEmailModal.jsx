import { useEffect } from 'react'
import { Button, TextField, Dialog, DialogContent, DialogTitle, Zoom } from "@mui/material";


export function ViewEmailModal({ viewEmail, onClose }) {

    useEffect(() => {
        if (viewEmail) {
            console.log(viewEmail)
        }
    }, [viewEmail])

    return (
        <Dialog
            open={!!viewEmail}
            onClose={onClose}
            transitionDuration={250}
            fullScreen={true}
            TransitionComponent={Zoom}>
            {viewEmail && <div>
                <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center' }}>
                    <span>Email</span>
                </DialogTitle>
                <DialogContent>
                    <div style={{ margin: '0 auto', marginTop: 10, maxWidth: 500, textAlign: 'center' }}>
                        From: <span>{ viewEmail.from.text }</span>
                    </div>
                    <div style={{ margin: '0 auto', marginTop: 10, maxWidth: 500, textAlign: 'center' }}>
                        To: <span>{ viewEmail.to.text }</span>
                    </div>
                    <div style={{ margin: '0 auto', marginTop: 10, maxWidth: 500, textAlign: 'center' }}>
                        Subject: <span>{ viewEmail.subject }</span>
                    </div>
                    <br />
                    <br />
                    <div style={{ margin: '0 auto', marginTop: 10, maxWidth: 500, textAlign: 'center' }}>
                        Body: <span dangerouslySetInnerHTML={{__html: viewEmail.text }}></span>
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
            </div>
            }
        </Dialog>
    )
}