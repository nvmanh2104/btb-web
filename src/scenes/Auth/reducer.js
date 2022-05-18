import produce from 'immer'
import TYPES from '../../constants/actionTypes'

const initialState = {
  isFetching: false,
  didInvalidate: true,
  isAuthenticated: false,
  error: false,
  user: {},
  forwardLocation: {},
}

const authReducer = (state = initialState, action) => produce(state, draft => {
  switch (action.type) {
  case TYPES.LOGGING_IN: {
    draft.isAuthenticated = false
    draft.isFetching = true
    draft.error = false
    break
  }

  case TYPES.LOG_IN_SUCCESS: {
    const { access_token, success } = action.payload
    if (!success) {
      draft.isAuthenticated = false
      draft.isFetching = false
      draft.error = true
    } else {
      localStorage.setItem('aiJwt', 'Bearer ' + access_token)
      draft.isAuthenticated = true
      draft.isFetching = false
      //draft.user = data.user ? data.user : data
      draft.error = false
    }
    break
  }

  case TYPES.LOG_IN_FAILURE: {
    draft.isAuthenticated = false
    draft.isFetching = false
    draft.error = true
    break
  }

  case TYPES.LOG_OUT:
    localStorage.clear()
    return initialState

  default:
    return draft
  }
})

export default authReducer
