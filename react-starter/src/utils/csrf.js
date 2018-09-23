import * as api from 'api';

const tokenKey = 'csrf_token';

export const getToken = () => {
  const csrfToken = localStorage.getItem(tokenKey);
  return csrfToken;
};

export const setToken = (stateMutator, csrfToken) => {
  localStorage.setItem(tokenKey, csrfToken);
  api.setCsrfToken(csrfToken);
  stateMutator(draft => {
    draft.csrfToken = csrfToken;
  });
};

export const removeToken = stateMutator => {
  localStorage.removeItem(tokenKey);
  api.setCsrfToken(null);
  stateMutator(draft => {
    draft.csrfToken = null;
  });
};
