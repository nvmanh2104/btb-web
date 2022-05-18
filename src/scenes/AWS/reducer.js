import { combineReducers } from "redux";
import produce from "immer";
import TYPES from "../../constants/actionTypes";

const listStations = {
  items: [],
  page: 1,
  page_size: 1,
  total: 0,
  isFetching: false,
  didInvalidate: true,
  updateAt: 0,
};

const stations = (state = listStations, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TYPES.GETTING_STATIONS:
        draft.isFetching = true;
        break;
      case TYPES.GET_STATIONS_SUCCESS:
        draft.items = action.payload.data.items;
        // draft.page = action.payload.page;
        // draft.pageSize = action.payload.page_size;
        // draft.total = action.payload.total;

        draft.isFetching = false;
        draft.didInvalidate = false;
        break;
      case TYPES.GET_STATIONS_FAILURE:
        draft.isFetching = false;
        draft.didInvalidate = true;
        break;
      default:
        return draft;
    }
  });

const list10mDatasState = {
  items: [],
  isFetching: false,
  didInvalidate: true,
  updateAt: 0,
};

const list10mDatas = (state = list10mDatasState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TYPES.GETTING_10MDATAS:
        draft.isFetching = true;
        break;
      case TYPES.GET_10MDATAS_SUCCESS:
        draft.items = action.payload.data.items;
        draft.isFetching = false;
        draft.didInvalidate = false;
        break;
      case TYPES.GET_10MDATAS_FAILURE:
        draft.isFetching = false;
        draft.didInvalidate = true;
        break;
      default:
        return draft;
    }
  });

const list1hDatasState = {
  items: [],
  isFetching: false,
  didInvalidate: true,
  updateAt: 0,
};

const list1hDatas = (state = list1hDatasState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TYPES.GETTING_1HDATAS:
        draft.isFetching = true;
        break;
      case TYPES.GET_1HDATAS_SUCCESS:
        draft.items = action.payload.data.items;
        draft.isFetching = false;
        draft.didInvalidate = false;
        break;
      case TYPES.GET_1HDATAS_FAILURE:
        draft.isFetching = false;
        draft.didInvalidate = true;
        break;
      default:
        return draft;
    }
  });
const list10mDatasDetailState = {
  items: [],
  isFetching: false,
  didInvalidate: true,
  updateAt: 0,
};

const list10mDatasDetail = (state = list10mDatasDetailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TYPES.GETTING_10MSTATIONDATA:
        draft.isFetching = true;
        break;
      case TYPES.GET_10MSTATIONDATA_SUCCESS:
        draft.items = action.payload.data.items;
        draft.isFetching = false;
        draft.didInvalidate = false;
        break;
      case TYPES.GET_10MSTATIONDATA_FAILURE:
        draft.isFetching = false;
        draft.didInvalidate = true;
        break;
      case TYPES.GETTING_10MSTATIONWATER:
        draft.isFetching = true;
        break;
      case TYPES.GET_10MSTATIONWATER_SUCCESS:
        draft.items = action.payload.data.items;
        draft.isFetching = false;
        draft.didInvalidate = false;
        break;
      case TYPES.GET_10MSTATIONWATER_FAILURE:
        draft.isFetching = false;
        draft.didInvalidate = true;
        break;

      default:
        return draft;
    }
  });
const list1hDatasDetailState = {
  items: [],
  isFetching: false,
  didInvalidate: true,
  updateAt: 0,
};

const list1hDatasDetail = (state = list1hDatasDetailState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TYPES.GETTING_1HSTATIONDATA:
        draft.isFetching = true;
        break;
      case TYPES.GET_1HSTATIONDATA_SUCCESS:
        draft.items = action.payload.data.items;
        draft.isFetching = false;
        draft.didInvalidate = false;
        break;
      case TYPES.GET_1HSTATIONDATA_FAILURE:
        draft.isFetching = false;
        draft.didInvalidate = true;
        break;
		case TYPES.GETTING_1HSTATIONWATER:
        draft.isFetching = true;
        break;
      case TYPES.GET_1HSTATIONWATER_SUCCESS:
        draft.items = action.payload.data.items;
        draft.isFetching = false;
        draft.didInvalidate = false;
        break;
      case TYPES.GET_1HSTATIONWATER_FAILURE:
        draft.isFetching = false;
        draft.didInvalidate = true;
        break;
      default:
        return draft;
    }
  });

const dataTablesState = {
  items: [],
  isFetching: false,
  didInvalidate: true,
  updateAt: 0,
};

const dataTables = (state = dataTablesState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TYPES.GETTING_DATATABLE:
        draft.isFetching = true;
        break;
      case TYPES.GET_DATATABLE_SUCCESS:
        draft.items = action.payload.data.items;
        draft.isFetching = false;
        draft.didInvalidate = false;
        break;
      case TYPES.GET_DATATABLE_FAILURE:
        draft.isFetching = false;
        draft.didInvalidate = true;
        break;
      default:
        return draft;
    }
  });

const waterDataTablesState = {
  items: [],
  isFetching: false,
  didInvalidate: true,
  updateAt: 0,
};

const waterDataTables = (state = waterDataTablesState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TYPES.GETTING_WATERDATATABLE:
        draft.isFetching = true;
        break;
      case TYPES.GET_WATERDATATABLE_SUCCESS:
        draft.items = action.payload.data.items;
        draft.isFetching = false;
        draft.didInvalidate = false;
        break;
      case TYPES.GET_WATERDATATABLE_FAILURE:
        draft.isFetching = false;
        draft.didInvalidate = true;
        break;
      default:
        return draft;
    }
  });

const listStationGroup = {
  items: [],
  page: 1,
  page_size: 1,
  total: 0,
  isFetching: false,
  didInvalidate: true,
  updateAt: 0,
};

const stationGroup = (state = listStationGroup, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case TYPES.GETTING_GROUPSTATION:
        draft.isFetching = true;
        break;
      case TYPES.GET_GROUPSTATION_SUCCESS:
        draft.items = action.payload.data.items;
        // draft.page = action.payload.page;
        // draft.pageSize = action.payload.page_size;
        // draft.total = action.payload.total;

        draft.isFetching = false;
        draft.didInvalidate = false;
        break;
      case TYPES.GET_GROUPSTATION_FAILURE:
        draft.isFetching = false;
        draft.didInvalidate = true;
        break;
      default:
        return draft;
    }
  });

// const list10mWaterDetailState = {
// 	items: [],
// 	isFetching: false,
// 	didInvalidate: true,
// 	updateAt: 0
// }

// const list10mWaterDetail = (state = list10mWaterDetailState, action) => produce(state, draft => {

// 	switch (action.type) {

// })

export default combineReducers({
  stations,
  list10mDatas,
  list1hDatas,
  list10mDatasDetail,
  list1hDatasDetail,
  dataTables,
  stationGroup,
  waterDataTables,
  
});
