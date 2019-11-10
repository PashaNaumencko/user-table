import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Dropdown, Input } from 'semantic-ui-react';
import { countryCodeOptions } from '../../helpers/constants';
import { getTelCode, getPhoneNumber } from '../../helpers/phoneNumberHelper';

const PhoneField = ({ field, form: { touched, errors }, placeholder, loading, onTelCodeChange, selectedTelCode }) => {
  const hasError = Boolean(touched[field.name] && errors[field.name]);

  console.log(selectedTelCode);

  return (
    <Input
      {...field}
      value={getPhoneNumber(field.value)}
      label={<Dropdown
        button
        size='large'
        onChange={onTelCodeChange}
        defaultValue={getTelCode(field.value)}
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
