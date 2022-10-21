export const ActionTypes = {
    USER_CHANGED: 'USER_CHANGED',
    EMAIL_FILTER_CHANGED: 'EMAIL_FILTER_CHANGED'
}

export const userChanged = user => ({ type: ActionTypes.USER_CHANGED, payload: user })

export const emailFilterChanged = filter => ({ type: ActionTypes.EMAIL_FILTER_CHANGED, payload: filter })