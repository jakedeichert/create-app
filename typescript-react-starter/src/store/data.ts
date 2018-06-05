import immer from 'immer';
import { actionErr } from 'utils/storeHelpers';
import * as exampleService from 'api/example';
import DataModel from 'models/Data';

const key = 'data';

enum t {
  RECEIVE_DATA = 'RECEIVE_DATA',
  RECEIVE_DATA_ERR = 'RECEIVE_DATA_ERR',
}

export type State = {
  byId: StateById;
};
type StateById = {
  [id: string]: DataModel;
};

const initialState: State = {
  byId: {
    '1': {
      id: 1,
      value: 'default value',
    },
  },
};

export default function data(state = initialState, action: ActionTypes) {
  return immer(state, draft => {
    switch (action.type) {
      case t.RECEIVE_DATA: {
        const { allData } = action;
        allData.forEach(d => {
          draft.byId[`${d.id}`] = d;
        });
        break;
      }
    }
  });
}

export const selectors = {
  get: (state: Store, id: number): DataModel => state[key].byId[id],
  getAll: (state: Store): StateById => state[key].byId,
  getAllValues: (state: Store): DataModel[] =>
    Object.values(selectors.getAll(state)),
};

type ActionTypes = RecieveDataAction;

interface RecieveDataAction {
  type: t.RECEIVE_DATA;
  allData: DataModel[];
}

export const actions = {
  loadData: (id: number) => {
    return async (dispatch: Function) => {
      const results = await exampleService
        .get(id)
        .catch(actionErr(dispatch, t.RECEIVE_DATA_ERR));
      dispatch(recieveData(results));
    };
  },
};

const recieveData = (allData: DataModel[]): RecieveDataAction => ({
  type: t.RECEIVE_DATA,
  allData,
});
