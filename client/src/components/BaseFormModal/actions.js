import { modalVisibility } from '../../routines';

export const setModalVisibility = (value) => ({
  type: modalVisibility,
  payload: value
});
