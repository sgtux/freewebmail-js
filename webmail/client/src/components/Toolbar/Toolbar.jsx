import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { userChanged } from '../../store/actions'
import { DarkThemeColors } from '../../utils/constants'

export function Toolbar() {

    const user = useSelector(state => state.appState.user)

    const dispatch = useDispatch()

    function logout() {
        dispatch(userChanged(null))
    }

    return (
        <div style={{ backgroundColor: DarkThemeColors.BACKGROUND, textAlign: 'end', height: 34, borderBottom: 'solid 1px #ccc', paddingTop: 10, paddingRight: 20 }}>
            <span style={{ color: DarkThemeColors.CHARS }}>{user.email}</span>
            <Button onClick={() => logout()}>Sair</Button>
        </div>
    )
}