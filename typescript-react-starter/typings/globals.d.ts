import { State as CounterState } from 'store/counter';
import { State as DataState } from 'store/data';
import DataModel from 'models/Data';

declare global {
  interface Store {
    data: DataState;
    counter: CounterState;
  }

  interface Window {
    __INITIAL_APP_DATA__: {
      data: DataModel;
    };
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
  }
}
