const key = 'counter';
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const initialState = {
  value: 0,
};

export const reducer = (draft, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER: {
      draft.value += 1;
      break;
    }
    case DECREMENT_COUNTER: {
      draft.value -= 1;
      break;
    }
  }
};

export const selectors = {};

selectors.get = state => state[key].value;

export const actions = {};

actions.incrementCounter = () => ({
  type: INCREMENT_COUNTER,
});

actions.decrementCounter = () => ({
  type: DECREMENT_COUNTER,
});
