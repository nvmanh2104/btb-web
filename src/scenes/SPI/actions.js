import { apiCall } from '../../util/apiCall';
import { API } from '../../constants/api';
import TYPES from '../../constants/actionTypes';




const calculatingSPI = () => {
	return {
		type: TYPES.CALCULATING_SPI
	};
};
const calculateSPISuccess = () => {
	return {
		type: TYPES.CALCULATE_SPI_SUCCESS
	};
};
const calculateSPIFailure = () => {
	return {
		type: TYPES.CALCULATE_SPI_FAILURE
	};
};

export const calculateSPI = (payload, meta) => async (dispatch) => {
	const api = API.SPI.calculateSPI();
	dispatch(calculatingSPI());
    // var obj = payload.file.get('file')
    debugger
	const { response } = await apiCall({ ...api, payload });
	if (response.data.success === true) {
		dispatch(calculateSPISuccess());
		if (meta && meta.onSuccess) {
			meta.onSuccess();
		}
	} else {
		dispatch(calculateSPIFailure());
		if (meta && meta.onError) {
			meta.onError();
		}
	}
};
