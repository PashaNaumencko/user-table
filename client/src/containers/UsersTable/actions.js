import { isUsersSorting } from '../../routines';

export const sortUsers = (column, direction = 'ascending') => ({
  type: isUsersSorting,
  payload: {
    column,
    direction
  }
});
