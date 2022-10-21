import styled from 'styled-components'
import { grey } from '@mui/material/colors'

export const EmailListContainer = styled.div`
    margin-left: 220px;
    margin-right: 20px;
    border: grey 1px solid;
    border-radius: 8px;
    margin-top: 20px;
`

export const EmailListTitle = styled.h2`
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    text-align: left;
    padding: 10px;
    color: ${grey[300]};
`

export const EmailListItemContainer = styled.div`
    border-bottom: solid #ccc 1px;
    border-top: solid #ccc 1px;
`

export const EmailListFooter = styled.div`
    text-align: center;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    padding: 20px;
    font-size: 12px;
    color: ${grey[400]};
`