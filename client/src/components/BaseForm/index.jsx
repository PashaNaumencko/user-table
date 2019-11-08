import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Button, Header, Icon, Divider, Form as UIForm, Dropdown, Input, Radio } from 'semantic-ui-react';
import InputError from '../InputError';

import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';

import styles from './styles.module.scss';

const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Minimum length - 2 characters')
    .max(255, 'Maximum length - 255 characters')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Minimum length - 2 characters')
    .max(255, 'Maximum length - 255 characters')
    .required('Required'),
  phone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Phone number is not valid'
    )
    .min(8, 'Minimum length - 8 characters')
    .required('Required'),
  // gender: Yup.string()
  //   .matches(
  //     /^('male' | 'female')$/,
  //     'Gender value is not valid'
  //   )
  //   .required('Required'),
  age: Yup.string()
    .matches(
      /^\d+$/,
      'Age should be a number'
    )
    .required('Required'),
});

const countryCodeOptions = [
  { key: 'ua', text: '+38', value: '+38' },
  { key: 'rus', text: '+7', value: '+7' },
  { key: 'usa', text: '+1', value: '+1' },
  { key: 'gm', text: '+49', value: '+49' },
  { key: 'bel', text: '+375', value: '+375' },
  { key: 'pl', text: '+48', value: '+48' },
  { key: 'ltv', text: '+371', value: '+371' },
  { key: 'lith', text: '+370', value: '	+370' },
];

class BaseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGender: null,
    };
  }

  renderField = ({ field, form, meta, placeholder }) => {
    const hasError = Boolean(meta.touched && meta.error);

    return (
      <UIForm.Input
        // error={meta.touched && meta.error && { content: meta.error }}
        {...field}
        type='text'
        placeholder={placeholder}
        error={hasError}
        icon={meta.touched &&
          <Icon
            name={hasError ? 'exclamation circle' : 'check circle'}
            color={hasError ? 'red' : 'green'}
          />
        }
      />
    );
  };

  renderPhoneField = ({ field, meta }) => {
    const hasError = Boolean(meta.touched && meta.error);

    return (
      <Input
        {...field}
        label={<Dropdown button size='large' defaultValue='+38' options={countryCodeOptions} />}
        labelPosition='left'
        // error={meta.touched && meta.error && { content: meta.error }}
        error={hasError}
        icon={meta.touched &&
          <Icon
            name={hasError ? 'exclamation circle' : 'check circle'}
            color={hasError ? 'red' : 'green'}
          />
        }
      />
    );
  };

  renderRadiobutton = ({ value, label, error, checked, onChange }) =>
    <UIForm.Radio
      value={value}
      label={label}
      error={error}
      onChange={onChange}
      checked={checked}
    />;

  validateRadioButton = () => this.state.selectedGender ? undefined : 'Select a gender';

  onRadioChange = (e, { value }) => this.setState({ selectedGender: value });

  onSubmit = (values) => {
    console.log(values);
  };

  render() {
    const { selectedGender } = this.state;

    return (
      <Segment basic>
        <Header as='h2' size='large' content='Add new user' textAlign='center' />
        <Divider />
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            phone: '',
            gender: '',
            age: ''
          }}
          validationSchema={FormSchema}
          onSubmit={this.onSubmit}
        >
          {({ errors, touched }) => (
            <Form className='ui form large'>

              <UIForm.Field required>
                <label htmlFor='firstName'>First Name</label>
                <Field
                  id='firstName'
                  name='firstName'
                  type='text'
                  placeholder='Enter your first name'
                >
                  {this.renderField}
                </Field>
                <InputError name='firstName' />
              </UIForm.Field>
              <UIForm.Field required>
                <label htmlFor='lastName'>Last Name</label>
                <Field
                  id='lastName'
                  name='lastName'
                  placeholder='Enter your last name'
                >
                  {this.renderField}
                </Field>
                <InputError name='lastName' />
              </UIForm.Field>

              <UIForm.Field required>
                <label htmlFor='phoneNumber'>Phone number</label>
                <Field
                  id='phoneNumber'
                  name='phone'
                  placeholder='Enter your phone number'
                >
                  {this.renderPhoneField}
                </Field>
                <InputError name='phone' />
              </UIForm.Field>

              <UIForm.Group inline>
                <UIForm.Field required>
                  <label>Gender</label>
                </UIForm.Field>

                <Field
                  name='gender'
                  label='Male'
                  value='male'
                  checked={selectedGender === 'male'}
                  error={errors.gender && touched.gender}
                  onChange={this.onRadioChange}
                  component={this.renderRadiobutton}
                  validate={this.validateRadioButton}
                />

                <Field
                  name='gender'
                  label='Female'
                  value='female'
                  checked={selectedGender === 'female'}
                  error={errors.gender && touched.gender}
                  onChange={this.onRadioChange}
                  component={this.renderRadiobutton}
                  validate={this.validateRadioButton}
                />
              </UIForm.Group>
              {errors.gender && touched.gender && <div className={styles.inputError}>{errors.gender}</div>}


              <UIForm.Field required>
                <label htmlFor='age'>Age</label>
                <Field
                  id='age'
                  name='age'
                  placeholder='Enter your age'
                >
                  {this.renderField}
                </Field>
                <InputError name='age' />
              </UIForm.Field>
              <Button type='submit' color='green' size='large'>Submit</Button>
            </Form>
          )}
        </Formik>
      </Segment>
    );
  }
}

export default BaseForm;
