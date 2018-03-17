const key = 'counter';
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

const initialState = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER: {
      return state + 1;
    }
    case DECREMENT_COUNTER: {
      return state - 1;
    }
    default:
      return state;
  }
};

export const selectors = {};

selectors.get = state => state[key];

export const actions = {};

actions.incrementCounter = () => ({
  type: INCREMENT_COUNTER,
});

actions.decrementCounter = () => ({
  type: DECREMENT_COUNTER,
});
