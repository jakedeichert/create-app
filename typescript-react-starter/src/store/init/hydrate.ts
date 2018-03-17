import Data from 'models/Data';
import { camelCaseDeep } from 'utils/obj';

interface Newable {
  new (param: any): any;
}

export default () => {
  const { data } = camelCaseDeep(window.__INITIAL_APP_DATA__ || {});
  const modelIdMapper = (entries: any[], model: Newable) =>
    entries.reduce((map, i) => {
      map[`${i.id}`] = new model(i);
      return map;
    }, {});

  return {
    data: {
      byId: modelIdMapper(data, Data),
    },
  };
};
