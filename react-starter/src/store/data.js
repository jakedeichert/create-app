import immer from 'immer';
import { actionErr } from 'utils/storeHelpers';
import * as exampleService from 'services/example';

const key = 'data';
const RECEIVE_DATA = 'RECEIVE_DATA';
const RECEIVE_DATA_ERR = 'RECEIVE_DATA_ERR';

const initialState = {
  byId: {
    '1': {
      id: 1,
      value: 'default value',
    },
  },
};

export default function data(state = initialState, action) {
  return immer(state, draft => {
    switch (action.type) {
      case RECEIVE_DATA: {
        const { data } = action;
        draft.byId = data;
        break;
      }
    }
  });
}

export const selectors = {};

selectors.get = (state, id) => state[key].byId[id];
selectors.getAll = state => state[key].byId;
selectors.getAllValues = state => Object.values(selectors.getAll(state));

export const actions = {};

actions.loadData = id => {
  return async dispatch => {
    const results = await exampleService
      .get(id)
      .catch(actionErr(RECEIVE_DATA_ERR));
    dispatch(recieveData(results));
  };
};

const recieveData = data => ({
  type: RECEIVE_DATA,
  data,
});
