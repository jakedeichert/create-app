import * as api from 'utils/api';
import DataModel from 'models/Data';
import { pickValid } from '../utils/obj';

export const get = async (id: number) => {
  const [results] = await api.get(`/examples/${id}`);
  return results;
};

export const create = async (data: DataModel) => {
  const [results] = await api.post(
    '/examples',
    pickValid(data, 'title', 'desc')
  );
  return results;
};

export const update = async (data: DataModel) => {
  const [results] = await api.patch(
    `/examples/${data.id}`,
    pickValid(data, 'title', 'desc')
  );
  return results;
};

export const remove = async (data: DataModel) => {
  const [results] = await api.del(`/examples/${data.id}`);
  return results;
};
