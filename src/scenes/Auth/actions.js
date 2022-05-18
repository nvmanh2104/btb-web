import { apiCall }  from '../../util/apiCall'
import { API } from '../../constants/api'
import TYPES  from '../../constants/actionTypes'
import select from '../../util/select'

export const login = payload => async dispatch => {
    const api = API.AUTH.login()
    dispatch ({type: TYPES.LOGGING_IN})
    const { response, error } = await apiCall({ ...api, payload})
    if (!error && response.status ===200){
        if (response.data && response.data.data !== null){
            dispatch({
                type: TYPES.LOG_IN_SUCCESS,
                payload: response.data
            })
        }else{
            dispatch({type: TYPES.LOG_IN_FAILURE})
        }
    }else{
        dispatch({type: TYPES.LOG_IN_FAILURE})
    }
}

export const loginWithToken = payload => async dispatch => {
    const api = API.AUTH.loginWithToken()
    dispatch({ type: TYPES.LOGGING_IN })
    const { response, error } = await apiCall({ ...api, payload })
    if (!error && response.status === 200) {
      if (response.data && response.data.success === true) {
        dispatch({
          type: TYPES.LOG_IN_SUCCESS,
          payload: response.data
        })
      } else {
        dispatch({ type: TYPES.LOG_IN_FAILURE })
      }
    } else {
      dispatch({ type: TYPES.LOG_IN_FAILURE })
    }
  }

  export const loginWithTokenIfNeed = () => (dispatch, getState) => {
      const state = getState()
      const isFetching = select(state, 'authReducer', 'isFetching')
      const isAuthenticated = select(state, 'authReducer', 'isAuthenticated')
      const aaJwt = localStorage.getItem('aaJwt')
      if (!isFetching && !isAuthenticated && aaJwt){
          dispatch(loginWithToken({token: aaJwt}))
      }
  }