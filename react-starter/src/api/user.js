import { apiEndpoint } from 'constants/app';
import * as api from 'utils/api';
import { pickValid } from 'utils/obj';

export const get = async id => {
  const { results } = await api.get(`${apiEndpoint}/user/${id}`);
  return results;
};

export const create = async userModel => {
  const { results } = await api.post(
    `${apiEndpoint}/user/${userModel.id}`,
    pickValid(userModel, 'name', 'email')
  );
  return results;
};

export const update = async userModel => {
  const { results } = await api.put(
    `${apiEndpoint}/user/${userModel.id}`,
    pickValid(userModel, 'id', 'name', 'email')
  );
  return results;
};

export const remove = async id => {
  const { results } = await api.del(`${apiEndpoint}/user/${id}`);
  return results;
};
