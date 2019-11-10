import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Form as UIForm } from 'semantic-ui-react';

const TextField = ({ field, form: { touched, errors }, placeholder, loading }) => {
  const hasError = Boolean(touched[field.name] && errors[field.name]);

  return (
    <UIForm.Input
      {...field}
      type='text'
      placeholder={placeholder}
      error={hasError}
      disabled={loading}
      icon={touched[field.name] &&
        <Icon
          name={hasError ? 'exclamation circle' : 'check circle'}
          color={hasError ? 'red' : 'green'}
        />
      }
    />
  );
};

export default TextField;
