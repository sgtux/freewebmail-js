import { useEffect, useState } from 'react'
import { Checkbox, Button, Dialog, DialogContent, DialogTitle, Zoom } from "@mui/material";


export function ViewEmailModal({ viewEmail, onClose }) {

    const [asHtml, setAsHtml] = useState(false)

    useEffect(() => {
        if (viewEmail) {
            setAsHtml(!!viewEmail.textAsHtml)
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
                        From: <span>{viewEmail.from.text}</span>
                    </div>
                    <div style={{ margin: '0 auto', marginTop: 10, maxWidth: 500, textAlign: 'center' }}>
                        To: <span>{viewEmail.to.text}</span>
                    </div>
                    <div style={{ margin: '0 auto', marginTop: 10, maxWidth: 500, textAlign: 'center' }}>
                        Subject: <span>{viewEmail.subject}</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        As Html: <Checkbox checked={asHtml} onChange={e => setAsHtml(e.target.checked)} />
                    </div>
                    <div style={{ margin: '0 auto', marginTop: 10, maxWidth: 800, textAlign: 'center' }}>
                        <fieldset>
                            <legend>Body</legend>
                            {asHtml ?
                                <span dangerouslySetInnerHTML={{ __html: viewEmail.textAsHtml }}></span>
                                : <span>{viewEmail.textAsHtml}</span>
                            }
                        </fieldset>
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