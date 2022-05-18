

// import { combineReducers } from 'redux';
// import produce from 'immer';
// import TYPES from '../../constants/actionTypes';


// // const dataTablesState = {
// // 	items: [],
// // 	isFetching: false,
// // 	didInvalidate: true,
// // 	updateAt: 0
// // }

// // const dataTables = (state = dataTablesState, action) => produce(state, draft => {

// // 	switch (action.type) {
// // 		case TYPES.GETTING_DATATABLE:
// // 			draft.isFetching = true
// // 			break
// // 		case TYPES.GET_DATATABLE_SUCCESS:
// // 			draft.items = action.payload.data.items
// // 			draft.isFetching = false
// // 			draft.didInvalidate = false
// // 			break
// // 		case TYPES.GET_DATATABLE_FAILURE:
// // 			draft.isFetching = false
// // 			draft.didInvalidate = true
// // 			break
// // 		default:
// // 			return draft
// // 	}
// // })


// export default combineReducers();