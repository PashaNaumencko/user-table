import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown, Input } from 'semantic-ui-react';
import { countryCodeOptions } from '../../helpers/constants';

const PhoneField = ({ field, form: { touched, errors }, placeholder, loading, onTelCodeChange, selectedTelCode }) => {
  const hasError = Boolean(touched[field.name] && errors[field.name]);

  return (
    <Input
      {...field}
      label={<Dropdown
        button
        size='large'
        onChange={onTelCodeChange}
        defaultValue={selectedTelCode}
        options={countryCodeOptions}
      />}
      labelPosition='left'
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

export default PhoneField;
