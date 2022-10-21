import { Button, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import {
    Delete as DeleteIcon,
    MarkAsUnread as MarkUnreadIcon,
    Add as PlusIcon
} from '@mui/icons-material'

import { grey } from '@mui/material/colors'

import { emailService } from '../../services'
import {
    EmailListContainer,
    EmailListTitle,
    EmailListItemContainer,
    EmailListFooter
} from './styles'

import { getFilterStateTranslated, toDateString, ellipsisText } from '../../utils'

import { NewEmailModal } from './NewEmailModal'

export function EmailList() {

    const [emails, setEmails] = useState([])
    const [viewingEmail, setViewingEmail] = useState(false)
    const [newEmail, setNewEmail] = useState({})

    const filter = useSelector(state => state.appState.filter)

    useEffect(() => {
        emailService.getAll()
            .then(res => setEmails(res))
            .catch(err => console.log(err))
    }, [])

    return (
        <EmailListContainer>

            <div style={{ padding: 20 }}>
                <Button variant="contained"
                    startIcon={<PlusIcon />}
                    onClick={() => setNewEmail({})}>Novo Email</Button>
            </div>
            <Divider />
            <EmailListTitle>{getFilterStateTranslated(filter)}</EmailListTitle>
            {emails.length ? <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {emails.map((e, i) =>
                    <EmailListItemContainer key={i}>
                        <ListItem disablePadding
                            secondaryAction={
                                <div>
                                    <IconButton>
                                        <DeleteIcon color='disabled' />
                                    </IconButton>
                                    <IconButton>
                                        <MarkUnreadIcon color='disabled' />
                                    </IconButton>
                                    <span style={{ fontSize: 12, color: grey[400] }}>{toDateString(e.attributes.date)}</span>
                                </div>
                            }>
                            <ListItemButton role={undefined} onClick={() => { setViewingEmail(true) }} dense>
                                <ListItemText primary={
                                    <Typography color="textPrimary">{e.from.text}</Typography>
                                } />
                                <ListItemText primary={
                                    <Typography color="textSecondary">{e.subject}</Typography>
                                } />
                                <ListItemText primary={
                                    <Typography color="GrayText">{ellipsisText(e.text, 30)}</Typography>
                                } />
                            </ListItemButton>
                        </ListItem>
                    </EmailListItemContainer>
                )}
            </List> : <ListItemText primary={
                <Typography color="textSecondary">Sem registros.</Typography>
            } />}
            <EmailListFooter>Terms · Privacy · Program Policies </EmailListFooter>
            <NewEmailModal email={newEmail} onClose={() => setNewEmail(null)} />
        </EmailListContainer>
    )
}