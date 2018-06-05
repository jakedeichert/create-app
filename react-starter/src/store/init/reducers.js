import immer from 'immer';
import * as counter from '../counter';
import * as data from '../data';

const immerReducer = store => (state = store.initialState, action) => {
  return immer(state, draft => {
    store.reducer(state, action, draft);
  });
};

export default {
  counter: immerReducer(counter),
  data: immerReducer(data),
};
