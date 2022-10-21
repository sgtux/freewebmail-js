import { useState } from 'react'
import { Button, TextField, Dialog, DialogContent, DialogTitle, Zoom } from '@mui/material'

import { emailService } from '../../services/email.service'

export function NewEmailModal({ email, onClose }) {

    const [to, setTo] = useState('')
    const [subject, setSubject] = useState('')
    const [text, setText] = useState('')

    function sendEmail() {
        emailService.send(to, subject, text)
            .then(() => onClose())
            .catch(err => console.log(err))
    }

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
                    <TextField fullWidth label="Para:" value={to} onChange={e => setTo(e.target.value)} />
                </div>
                <div style={{ margin: '0 auto', marginTop: 10, maxWidth: 500, textAlign: 'center' }}>
                    <TextField fullWidth label="Assunto:" value={subject} onChange={e => setSubject(e.target.value)} />
                </div>
                <div style={{ margin: '0 auto', marginTop: 10, maxWidth: 500, textAlign: 'center' }}>
                    <TextField multiline maxRows={10} fullWidth label="Corpo do Email:" value={text} onChange={e => setText(e.target.value)} />
                </div>
                <div style={{ margin: '0 auto', marginTop: 50, width: 500, display: '' }}>
                    <Button size="large"
                        onClick={() => onClose()} autoFocus>cancelar</Button>
                    <Button size="large"
                        color="primary"
                        onClick={() => sendEmail()}
                        variant="contained" autoFocus>enviar</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}