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



const getting10mDatas = () => {
    return (
        {
            type: TYPES.GETTING_10MDATAS
        }
    )
}
const get10mDatasSuccess = payload => {
    return ({
        type: TYPES.GET_10MDATAS_SUCCESS,
        payload
    })
}
const get10mDatasFailure = () => {
    return ({
        type: TYPES.GET_10MDATAS_FAILURE
    })
}

export const get10mDatas = (params) => async dispatch => {
	const api = API.AWS.get10mDatas()
	dispatch(getting10mDatas())
    const { response, error } = await apiCall({ ...api,params})

    if (!error && response.status === 200){
        dispatch(get10mDatasSuccess(response))
    }else{
        dispatch(get10mDatasFailure())
    }    
}






const getting10mStationDatas = () => {
    return (
        {
            type: TYPES.GETTING_10MSTATIONDATA
        }
    )
}
const get10mStationDatasSuccess = payload => {
    return ({
        type: TYPES.GET_10MSTATIONDATA_SUCCESS,
        payload
    })
}
const get10mStationDataFailure = () => {
    return ({
        type: TYPES.GET_10MSTATIONDATA_FAILURE
    })
}

export const get10mStationDatas = (params) => async dispatch => {
	const api = API.AWS.get10mDatas()
	dispatch(getting10mStationDatas())
    const { response, error } = await apiCall({ ...api,params})
    if (!error && response.status === 200){
        dispatch(get10mStationDatasSuccess(response))
    }else{
        dispatch(get10mStationDataFailure())
    }    
}


const getting1hStationDatas = () => {
    return (
        {
            type: TYPES.GETTING_1HSTATIONDATA
        }
    )
}
const get1hStationDatasSuccess = payload => {
    return ({
        type: TYPES.GET_1HSTATIONDATA_SUCCESS,
        payload
    })
}
const get1hStationDataFailure = () => {
    return ({
        type: TYPES.GET_1HSTATIONDATA_FAILURE
    })
}

export const get1hStationDatas = (params) => async dispatch => {
	const api = API.AWS.get1hDatas()
	dispatch(getting1hStationDatas())
    const { response, error } = await apiCall({ ...api,params})
    if (!error && response.status === 200){
        dispatch(get1hStationDatasSuccess(response))
    }else{
        dispatch(get1hStationDataFailure())
    }    
}





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



export const gettingStationGroup = () => {
	return {
		type: TYPES.GETTING_GROUPSTATION
	};
};
export const gettingStationGroupSuccess = (payload) => {
	return {
		type: TYPES.GET_GROUPSTATION_SUCCESS,
		payload
	};
};
export const gettingStationGroupFailure = () => {
	return {
		type: TYPES.GET_GROUPSTATION_FAILURE
	};
};

export const getStationGroup = (params) => async (dispatch) => {
	const api = API.AWS.getStationGroup();
	dispatch(gettingStationGroup());	
	const { response, error } = await apiCall({ ...api, params  });
	if (!error && response.status === 200) {
		dispatch(gettingStationGroupSuccess(response));
	} else {
		dispatch(gettingStationGroupFailure());
	}
};



const gettingWaterDataTables = () => {
    return (
        {
            type: TYPES.GETTING_WATERDATATABLE
        }
    )
}
const getWaterDataTablesSuccess = payload => {
    return ({
        type: TYPES.GET_WATERDATATABLE_SUCCESS,
        payload
    })
}
const getWaterDataTablesFailure = () => {
    return ({
        type: TYPES.GET_WATERDATATABLE_FAILURE
    })
}

export const getWaterDataTables = (params) => async dispatch => {
	const api = API.STATISTIC_WATER.getDataTables()
	dispatch(gettingWaterDataTables())
    const { response, error } = await apiCall({ ...api,params})
    if (!error && response.status === 200){
        dispatch(getWaterDataTablesSuccess(response))
    }else{
        dispatch(getWaterDataTablesFailure())
    }    
}

const getting10mStationWaters = () => {
    return (
        {
            type: TYPES.GETTING_10MSTATIONWATER
        }
    )
}
const get10mStationWaterSuccess = payload => {
    return ({
        type: TYPES.GET_10MSTATIONWATER_SUCCESS,
        payload
    })
}
const get10mStationWaterFailure = () => {
    return ({
        type: TYPES.GET_10MSTATIONWATER_FAILURE
    })
}

export const get10mStationWaters = (params) => async dispatch => {
	const api = API.AWS.get10mWaters()
	dispatch(getting10mStationWaters())
    const { response, error } = await apiCall({ ...api,params})
    if (!error && response.status === 200){
        dispatch(get10mStationWaterSuccess(response))
    }else{
        dispatch(get10mStationWaterFailure())
    }    
}


const getting1hStationWaters = () => {
    return (
        {
            type: TYPES.GETTING_1HSTATIONWATER
        }
    )
}


const get1hStationWaterSuccess = payload => {
    return ({
        type: TYPES.GET_1HSTATIONWATER_SUCCESS,
        payload
    })
}
const get1hStationWaterFailure = () => {
    return ({
        type: TYPES.GET_1HSTATIONWATER_FAILURE
    })
}

export const get1hStationWaters = (params) => async dispatch => {
	const api = API.AWS.get1hWaters()
	dispatch(getting1hStationWaters())
    const { response, error } = await apiCall({ ...api,params})
    if (!error && response.status === 200){
        dispatch(get1hStationWaterSuccess(response))
    }else{
        dispatch(get1hStationWaterFailure())
    }    
}
