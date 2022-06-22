import { apiCall } from '../../util/apiCall';
import { API } from '../../constants/api';
import TYPES from '../../constants/actionTypes';





export const calculateDayTHI = (payload,params,meta) => async (dispatch) => {
	const api = API.THI.calculateDayTHI();
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
