const key = 'counter';

enum t {
  INCREMENT_COUNTER = 'INCREMENT_COUNTER',
  DECREMENT_COUNTER = 'DECREMENT_COUNTER',
}
export type State = number;
const initialState: State = 0;

export default (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case t.INCREMENT_COUNTER: {
      return state + 1;
    }
    case t.DECREMENT_COUNTER: {
      return state - 1;
    }
    default:
      return state;
  }
};

export const selectors = {
  get: (state: Store) => state[key],
};

type ActionTypes = IncrementCounterAction | DecrementCounterAction;

interface IncrementCounterAction {
  type: t.INCREMENT_COUNTER;
}

interface DecrementCounterAction {
  type: t.DECREMENT_COUNTER;
}

export const actions = {
  incrementCounter: (): IncrementCounterAction => ({
    type: t.INCREMENT_COUNTER,
  }),
  decrementCounter: (): DecrementCounterAction => ({
    type: t.DECREMENT_COUNTER,
  }),
};
