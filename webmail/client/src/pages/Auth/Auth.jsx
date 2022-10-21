import { TextField, Typography, Button } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Container } from './styles'
import { userChanged } from '../../store/actions'

export function Auth() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
    }, [email, password])

    function login() {
        if ((email === 'alice@webhacking.lab' || email === 'bob@webhacking.lab') && password === '123')
            dispatch(userChanged({ email, password }))
        else
            setErrorMessage('Email/senha inválido.')
    }

    return (
        <Container>
            <div style={{ textAlign: 'center', fontSize: 40 }}>
                <EmailIcon color="primary" fontSize="large" />
                <Typography color="GrayText" variant="h4" gutterBottom component="div">
                    WEB MAIL
                </Typography>
            </div>
            <TextField required value={email} onChange={e => setEmail(e.target.value)} label="Email" variant="outlined" />
            <br /><br />
            <TextField required type="password" value={password} onChange={e => setPassword(e.target.value)} label="Senha" variant="outlined" />
            <br /><br />
            <Button disabled={!email || !password} onClick={() => login()} variant="contained">Entrar</Button>
            <Typography style={{ marginTop: 10 }} color="red">{errorMessage}</Typography>
        </Container>
    )
}