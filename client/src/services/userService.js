import callWebApi from '../helpers/callWebApi';

export const getAllUsers = async () => {
  const response = await callWebApi({
    endpoint: '/api/users',
    type: 'GET'
  });
  return response.json();
};

export const createUser = async (request) => {
  const response = await callWebApi({
    endpoint: '/api/users',
    type: 'POST',
    request
  });
  return response.json();
};

export const updateUser = async (request) => {
  const { userId } = request;
  const response = await callWebApi({
    endpoint: `/api/users/${userId}`,
    type: 'PUT',
    attachment: true,
    request
  });
  return response.json();
};

export const deleteUsers = async (ids) => {
  const response = await callWebApi({
    endpoint: '/api/users',
    type: 'DELETE',
    query: {
      ids
    }
  });
  return response.json();
};
