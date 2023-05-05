import { TextField, Typography, Button } from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Container } from './styles'
import { userChanged } from '../../store/actions'

import { accountService, storageService } from '../../services'

export function Auth() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        if (username.includes('@'))
            setErrorMessage('Just username, not email.')
        else
            setErrorMessage('')
    }, [username])

    async function login() {

        try {
            const result = await accountService.login(username, password)
            const { token } = result
            storageService.setToken(token)
            const data = await accountService.getData()
            dispatch(userChanged(data))
        } catch (err) {
            if (typeof (err.toJSON) === 'function' && err.toJSON().status === 401)
                setErrorMessage('Usuário ou senha inválidos.')
            else
                setErrorMessage('Erro desconhecido.')
        }
    }

    return (
        <Container>
            <div style={{ textAlign: 'center', fontSize: 40 }}>
                <EmailIcon color="primary" fontSize="large" />
                <Typography color="GrayText" variant="h4" gutterBottom component="div">
                    WEB MAIL
                </Typography>
            </div>
            <TextField required value={username} onChange={e => setUsername(e.target.value)} label="Usuário" variant="outlined" />
            <br /><br />
            <TextField required type="password" value={password} onChange={e => setPassword(e.target.value)} label="Senha" variant="outlined" />
            <br /><br />
            <Button disabled={!username || !password} onClick={() => login()} variant="contained">Entrar</Button>
            <Typography style={{ marginTop: 10 }} color="red">{errorMessage}</Typography>
        </Container>
    )
}