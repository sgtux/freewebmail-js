import { FilterStates } from './constants'

export { StorageKeys, FilterStates } from './constants'

export const getFilterStateTranslated = filter => {
    switch (filter) {
        case FilterStates.INBOX:
            return 'Entrada'
        case FilterStates.IMPORTANT:
            return 'Importante'
        case FilterStates.SENT:
            return 'Enviado'
        case FilterStates.TRASH:
            return 'Lixo'
        default:
            return ''
    }
}

export const toDateString = input => {
    if (!input)
        return input
    const date = new Date(input)
    let day = date.getDate()
    day = day > 9 ? day : `0${day}`
    let month = date.getMonth() + 1
    month = month > 9 ? month : `0${month}`
    return `${day}/${month}/${date.getFullYear()}`
}

export const ellipsisText = (text, length) => {
    if (!text || text.length <= length)
        return text
    return `${text.substring(0, length)}...`
}