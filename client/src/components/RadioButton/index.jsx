import React from 'react';
import PropTypes from 'prop-types';
import { Form as UIForm } from 'semantic-ui-react';

const RadioButton = ({ value, label, error, checked, onChange, loading }) => <UIForm.Radio
  value={value}
  label={label}
  error={error}
  disabled={loading}
  onChange={onChange}
  checked={checked}
  disabled={loading}
/>;

export default RadioButton;
