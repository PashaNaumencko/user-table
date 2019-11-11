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
/>;

RadioButton.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  loading: PropTypes.bool
};

export default RadioButton;
