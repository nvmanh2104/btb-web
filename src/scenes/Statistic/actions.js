import { apiCall } from '../../util/apiCall';
import { API } from '../../constants/api';
import TYPES from '../../constants/actionTypes';







export const gettingStations = () => {
	return {
		type: TYPES.GETTING_STATIONS
	};
};
export const gettingStationsSuccess = (payload) => {
	return {
		type: TYPES.GET_STATIONS_SUCCESS,
		payload
	};
};
export const gettingStationsFailure = () => {
	return {
		type: TYPES.GET_STATIONS_FAILURE
	};
};

export const getStations = (params) => async (dispatch) => {
	const api = API.AWS.getStations();
	dispatch(gettingStations());	
	const { response, error } = await apiCall({ ...api, params  });
	if (!error && response.status === 200) {
		dispatch(gettingStationsSuccess(response));
	} else {
		dispatch(gettingStationsFailure());
	}
};


const gettingDataTables = () => {
    return (
        {
            type: TYPES.GETTING_DATATABLE
        }
    )
}
const getDataTablesSuccess = payload => {
    return ({
        type: TYPES.GET_DATATABLE_SUCCESS,
        payload
    })
}
const getDataTablesFailure = () => {
    return ({
        type: TYPES.GET_DATATABLE_FAILURE
    })
}

export const getDataTables = (params) => async dispatch => {
	const api = API.STATISTIC.getDataTables()
	dispatch(gettingDataTables())
    const { response, error } = await apiCall({ ...api,params})
    if (!error && response.status === 200){
        dispatch(getDataTablesSuccess(response))
    }else{
        dispatch(getDataTablesFailure())
    }    
}



const gettingExcelTables = () => {
    return (
        {
            type: TYPES.GETTING_EXCELTABLE
        }
    )
}

const getExcelTablesFailure = () => {
    return ({
        type: TYPES.GET_EXCELTABLE_FAILURE
    })
}

export const getExcelTables = (params) => async dispatch => {
	const api = API.STATISTIC.getExcelTables()
	dispatch(gettingExcelTables())
    const { response, error } = await apiCall({ ...api,params})

    if (!error && response.status === 200){
        // dispatch(getExcelTablesSuccess())
		window.open(response.data.message)
    }else{
        dispatch(getExcelTablesFailure())
    }    
}


const gettingYearExcelTables = () => {
    return (
        {
            type: TYPES.GETTING_YEAREXCELTABLE
        }
    )
}
const getYearExcelTablesSuccess = payload => {
    return ({
        type: TYPES.GET_YEAREXCELTABLE_SUCCESS,
        payload
    })
}
const getYearExcelTablesFailure = () => {
    return ({
        type: TYPES.GET_YEAREXCELTABLE_FAILURE
    })
}



export const getYearExcelTables = (params, meta) => async dispatch => {
	const api = API.STATISTIC.getYearExcelTables()
    dispatch(gettingYearExcelTables())
	const { response, error } = await apiCall({ ...api, params })
    if (!error && response.status === 200){
        window.open(response.data.message)
		
    }else{
        dispatch(getYearExcelTablesFailure())
    }    
  }
  