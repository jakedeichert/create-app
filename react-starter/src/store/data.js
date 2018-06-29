import { createSelector } from 'reselect';
import { actionErr } from 'utils/storeHelpers';
import * as userApi from 'api/user';

const key = 'data';
const RECEIVE_DATA = 'RECEIVE_DATA';

export const initialState = {
  byId: {
    '1': {
      id: 1,
      value: 'default value',
    },
  },
};

export const reducer = (draft, action) => {
  switch (action.type) {
    case RECEIVE_DATA: {
      const { data } = action;
      draft.byId = data;
      break;
    }
  }
};

// NOTE: reselect only caches the last call, not previous calls. If multiple
// components call a selector with different props (eg. getting 2 specific items)
// then reselect isn't as useful unless you generate selectors per component:
// https://github.com/reactjs/reselect#sharing-selectors-with-props-across-multiple-component-instances
export const selectors = {};

selectors.get = (state, id) => state[key].byId[id];
selectors.getAll = state => state[key].byId;
selectors.getAllValues = createSelector(selectors.getAll, all => {
  return Object.values(all);
});

export const actions = {};

actions.loadData = id => async dispatch => {
  try {
    const results = await userApi.get(id);
    dispatch(recieveData(results));
  } catch (err) {
    actionErr(dispatch, RECEIVE_DATA, err);
  }
};

const recieveData = data => ({
  type: RECEIVE_DATA,
  data,
});
