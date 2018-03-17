import Data from 'models/Data';
import { camelCaseDeep } from 'utils/obj';

/**
 * Let initial app data from server override reducer defaults.
 *
 * This is only useful when the html file is rendered on the server
 * to preload the state with data.
 *
 * See `/static/html/index.html` for example data.
 */
export default () => {
  const { data } = camelCaseDeep(window.__INITIAL_APP_DATA__ || {});
  const modelIdMapper = (entries, model) =>
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
