import { apiCall } from '../../util/apiCall';
import { API } from '../../constants/api';
import TYPES from '../../constants/actionTypes';





export const calculateWeekARI = (payload,params,meta) => async (dispatch) => {
	const api = API.ARI.calculateWeekARI();
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
export const calculateMonthARI = (payload,params,meta) => async (dispatch) => {
	const api = API.ARI.calculateMonthARI();
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
