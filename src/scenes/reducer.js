import { combineReducers } from 'redux';
import authReducer from './Auth/reducer'
import appReducer from './Header/reducer';
import awsReducer from './AWS/reducer';
// import statisticReducer from './Statistic/reducer';
export default combineReducers({
    authReducer,
    appReducer,
    awsReducer,
    // statisticReducer

})

