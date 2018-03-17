import * as api from 'utils/api';
import { pickValid } from '../utils/obj';

export const get = async id => {
  const [results] = await api.get(`/examples/${id}`);
  return results;
};

export const create = async dataModel => {
  const [results] = await api.post(
    '/examples',
    pickValid(dataModel, 'title', 'desc')
  );
  return results;
};

export const update = async dataModel => {
  const [results] = await api.patch(
    `/examples/${dataModel.id}`,
    pickValid(dataModel, 'title', 'desc')
  );
  return results;
};

export const remove = async dataModel => {
  const [results] = await api.del(`/examples/${dataModel.id}`);
  return results;
};
