import { camelCaseDeep } from 'utils/obj';
import { mapById } from 'utils/storeHelpers';

/**
 * Let initial app data from server override reducer defaults.
 *
 * This is only useful when the html file is rendered on the server
 * to preload the state with data.
 *
 * See `/static/html/index.html` for example data.
 */
export default () => {
  const { data } = camelCaseDeep(window.__INITIAL_APP_DATA__ || { data: [] });
  return {
    data: {
      byId: mapById(data),
    },
  };
};
