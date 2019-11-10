import { modalVisibility } from '../../routines';

export const setModalVisibility = (value, editingUser = null) => ({
  type: modalVisibility,
  payload: {
    value,
    editingUser
  },
});
