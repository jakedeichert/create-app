import { apiEndpoint } from 'constants/app';
import { pickValid } from 'utils/obj';
import { createApi } from 'utils/api';

const api = createApi(apiEndpoint);

export const get = async id => {
  const { results } = await api.get(`/user/${id}`);
  return results;
};

export const create = async userModel => {
  const { results } = await api.post(
    `/user/${userModel.id}`,
    pickValid(userModel, 'name', 'email')
  );
  return results;
};

export const update = async userModel => {
  const { results } = await api.put(
    `/user/${userModel.id}`,
    pickValid(userModel, 'id', 'name', 'email')
  );
  return results;
};

export const remove = async id => {
  const { results } = await api.del(`/user/${id}`);
  return results;
};
