import produce from 'immer'
import { combineReducers } from 'redux'
import TYPES from '../../constants/actionTypes'

const initialState = {
    currentPage: [''],
    openKey: [''],
}

const app = (state = initialState, action) => produce(state, draft => {
    switch (action.type){
        case TYPES.SET_PAGE:
            draft.currentPage = [action.payload]
            break
        case TYPES.SET_OPEN_KEY:
            draft.openKey = [action.payload]
            break
        default:
            return draft
    }
})

const titleState = { title: '' }
const titleReducer = (state = titleState, action) => produce(state, draft => {
    if (action.type === 'SET_PAGE_TITLE'){
        draft.title = action.value
    }
    return draft
})

export default combineReducers({ app, titleReducer })