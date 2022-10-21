import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { grey } from '@mui/material/colors'

import {
    Drawer,
    List,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@mui/material'

import EmailIcon from '@mui/icons-material/Email'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import ImportantIcon from '@mui/icons-material/LabelImportant'
import TrashIcon from '@mui/icons-material/Delete'
import SendIcon from '@mui/icons-material/Send'

import { emailFilterChanged } from '../../store/actions'

import { FilterStates } from '../../utils'

const buttonColor = grey[800]

export function AppDrawer() {

    const filter = useSelector(state => state.appState.filter)

    const dispatch = useDispatch()

    return (
        <Drawer
            sx={{
                width: 200,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 200,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left">
            <div style={{ paddingTop: 4, height: 40, borderBottom: '1px grey solid' }}>
                <EmailIcon color="primary" fontSize="large" />
            </div>
            <List>
                <ListItem button
                    onClick={() => dispatch(emailFilterChanged(FilterStates.INBOX))}
                    style={filter === FilterStates.INBOX ? { backgroundColor: buttonColor } : {}}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Entrada" />
                </ListItem>
                <ListItem button
                    onClick={() => dispatch(emailFilterChanged(FilterStates.IMPORTANT))}
                    style={filter === FilterStates.IMPORTANT ? { backgroundColor: buttonColor } : {}}>
                    <ListItemIcon>
                        <ImportantIcon />
                    </ListItemIcon>
                    <ListItemText primary="Importante" />
                </ListItem>
                <ListItem button
                    onClick={() => dispatch(emailFilterChanged(FilterStates.SENT))}
                    style={filter === FilterStates.SENT ? { backgroundColor: buttonColor } : {}}>
                    <ListItemIcon>
                        <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Enviado" />
                </ListItem>
                <ListItem button
                    onClick={() => dispatch(emailFilterChanged(FilterStates.TRASH))}
                    style={filter === FilterStates.TRASH ? { backgroundColor: buttonColor } : {}}>
                    <ListItemIcon>
                        <TrashIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lixo" />
                </ListItem>
            </List>
            <Divider />
            <span style={{ fontSize: 14, marginTop: 10 }}>@{new Date().getFullYear()}</span>
        </Drawer>
    )
}