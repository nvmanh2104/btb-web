import { apiCall } from '../../util/apiCall';
import { API } from '../../constants/api';
import TYPES from '../../constants/actionTypes';




// const calculatingSPI = () => {
// 	return {
// 		type: TYPES.CALCULATING_SPI
// 	};
// };
// const calculateSPISuccess = (payload) => {
// 	return {
// 		payload,
// 		type: TYPES.CALCULATE_SPI_SUCCESS
// 	};
// };
// const calculateSPIFailure = () => {
// 	return {
// 		type: TYPES.CALCULATE_SPI_FAILURE
// 	};
// };

export const calculateWeekSCWB = (payload,params,meta) => async (dispatch) => {
	const api = API.SCWB.calculateWeekSCWB();
	// dispatch(calculatingSPI());
    // // var obj = payload.file.get('file')
    // debugger
	const { response } = await apiCall({ ...api, payload ,params});
	
	if (response.data.success === true) {
		// dispatch(calculateSPISuccess(response.data));
		if (meta && meta.onSuccess) {
			meta.onSuccess(response.data);
		}
	} else {
		// dispatch(calculateSPIFailure());
		if (meta && meta.onError) {
			meta.onError();
		}
	}
};
export const calculateMonthSCWB = (payload,params,meta) => async (dispatch) => {
	const api = API.SCWB.calculateMonthSCWB();
	// dispatch(calculatingSPI());
    // // var obj = payload.file.get('file')
    // debugger
	const { response } = await apiCall({ ...api, payload ,params});
	
	if (response.data.success === true) {
		// dispatch(calculateSPISuccess(response.data));
		if (meta && meta.onSuccess) {
			meta.onSuccess(response.data);
		}
	} else {
		// dispatch(calculateSPIFailure());
		if (meta && meta.onError) {
			meta.onError();
		}
	}
};
