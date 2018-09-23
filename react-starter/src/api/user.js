import { pickValid } from 'utils/obj';
import { api, json } from './index';

export const get = async id => {
  const results = await json(api.get, `/user/${id}`);
  return results;
};

export const create = async userModel => {
  const results = await json(
    api.post,
    `/user/${userModel.id}`,
    pickValid(userModel, 'name', 'email')
  );
  return results;
};

export const update = async userModel => {
  const results = await json(
    api.put,
    `/user/${userModel.id}`,
    pickValid(userModel, 'id', 'name', 'email')
  );
  return results;
};

export const remove = async id => {
  const results = await json(api.del, `/user/${id}`);
  return results;
};
