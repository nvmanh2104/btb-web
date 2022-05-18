import TYPES from '../../constants/actionTypes'
//import { apiCall } from '../../util/apiCall'
//import { API } from '../../constants/api'
import SIDERS from '../AdminSideBar/sidebar-config'
//import { enablePatches } from 'immer'

export const getTitle = path => {
    for (let i=0; i<SIDERS.length; i++){
        const item = SIDERS[i]
        if (item.key === path){
            return {
                type: 'SET_PAGE_TITLE',
                value: item.title            
            }
        }
        if (item.children){
            for (let y=0; y<item.children.length; y++){
                const child =  item.children[y]
                if (child.key === path){
                    return{
                        type: 'SET_PAGE_TITLE',
                        value: child.title
                    }
                }
            }
        }
    }
    return{
        type: 'SET_PAGE_TITLE',
        value: ''
    }
}

export const setPage = payload => {
    return {
        type: TYPES.SET_PAGE,
        payload
    }
}

export const setOpenKey = payload => {
    return{
        type: TYPES.SET_OPEN_KEY,
        payload
    }
}
export const logOut = () => {
    return {
        type: TYPES.LOG_OUT
    }
}