import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Button, Modal, Form as UIForm} from 'semantic-ui-react';
import { TextField, PhoneField, RadioButton, InputError } from '../../components';
import { createUser, updateUser } from '../../routines';
import { setModalVisibility } from './actions';
import { Formik, Form, Field } from 'formik';
import { FormSchema } from '../../helpers/constants';

import styles from './styles.module.scss';
import { getTelCode, getPhoneNumber } from '../../helpers/phoneNumberHelper';

const defaultFormValues = {
  firstName: '',
  lastName: '',
  phone: '',
  gender: '',
  age: '',
};

class BaseFormModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedGender: null,
      selectedTelCode: '+38'
    };
  }

  componentDidMount() {
    const { user } = this.props;
    if(user) {
      const { user: { gender } } = this.props;
      this.setState({ selectedGender: gender });
    }

    document.addEventListener('keydown', this.onEscapePress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEscapePress);
  }

  onEscapePress = (event) => {
    const { setModalVisibility } = this.props;
    if(event.keyCode === 27) {
      setModalVisibility(false);
    }
  }

  validateRadioButton = () => this.state.selectedGender ? undefined : 'Select a gender';

  onRadioChange = (validateField) => (e, { value }) => {
    this.setState({ selectedGender: value });
    validateField('gender');
  };

  onRadioClick = (validateField) => () => validateField('gender');

  onTelCodeChange = (e, { value }) => this.setState({ selectedTelCode: value });

  onModalClose = () => this.props.setModalVisibility(false);

  onSubmit = (values) => {
    const { createUser, updateUser, user, setModalVisibility } = this.props;
    const { selectedGender, selectedTelCode } = this.state;
    if (user) {
      updateUser({
        ...values,
        id: user.id,
        phone: `(${selectedTelCode})${values.phone}`,
        gender: selectedGender,
        setModalVisibility
      });
    } else {
      createUser({
        ...values,
        phone: `(${selectedTelCode})${values.phone}`,
        gender: selectedGender,
        setModalVisibility
      });
    }

  };

  render() {
    const { selectedGender, selectedTelCode } = this.state;
    const {
      createUserLoading,
      updateUserLoading,
      user,
      isModalOpen
    } = this.props;
    const loading = createUserLoading || updateUserLoading;

    return (
      <Modal open={isModalOpen} size='large'>
        <Modal.Header>{user ? 'Edit Existing User' : 'Add New User'}</Modal.Header>
        <Modal.Content>
          <Segment basic>
            <Formik
              initialValues={user ? {
                firstName: user.firstName,
                lastName: user.lastName,
                phone: getPhoneNumber(user.phone),
                age: user.age
              } : defaultFormValues}
              validationSchema={FormSchema}
              onSubmit={this.onSubmit}
            >
              {({ errors, touched, validateField }) => (
                <Form className='ui form large'>
                  <UIForm.Field required>
                    <label htmlFor='firstName'>First Name</label>
                    <Field
                      id='firstName'
                      name='firstName'
                      type='text'
                      placeholder='Enter your first name'
                      component={TextField}
                      loading={loading}
                    />
                    <InputError name='firstName' />
                  </UIForm.Field>
                  <UIForm.Field required>
                    <label htmlFor='lastName'>Last Name</label>
                    <Field
                      id='lastName'
                      name='lastName'
                      placeholder='Enter your last name'
                      component={TextField}
                      loading={loading}
                    />
                    <InputError name='lastName' />
                  </UIForm.Field>

                  <UIForm.Field required>
                    <label htmlFor='phoneNumber'>Phone number</label>
                    <Field
                      id='phoneNumber'
                      name='phone'
                      placeholder='Enter your phone number'
                      onTelCodeChange={this.onTelCodeChange}
                      selectedTelCode={user && getTelCode(user.phone) ? getTelCode(user.phone)[0] : selectedTelCode}
                      component={PhoneField}
                      loading={loading}
                    />
                    <InputError name='phone' />
                  </UIForm.Field>

                  <UIForm.Group inline>
                    <UIForm.Field required>
                      <label>Gender</label>
                    </UIForm.Field>

                    <Field
                      name='gender'
                      label='Male'
                      value='Male'
                      checked={selectedGender === 'Male'}
                      error={errors.gender && touched.gender}
                      onClick={this.onRadioClick(validateField)}
                      onChange={this.onRadioChange(validateField)}
                      component={RadioButton}
                      validate={this.validateRadioButton}
                      loading={loading}
                    />

                    <Field
                      name='gender'
                      label='Female'
                      value='Female'
                      checked={selectedGender === 'Female'}
                      error={errors.gender && touched.gender}
                      onClick={this.onRadioClick(validateField)}
                      onChange={this.onRadioChange(validateField)}
                      component={RadioButton}
                      validate={this.validateRadioButton}
                      loading={loading}
                    />
                  </UIForm.Group>
                  {errors.gender && touched.gender && <div className={styles.inputError}>{errors.gender}</div>}

                  <UIForm.Field required>
                    <label htmlFor='age'>Age</label>
                    <Field
                      id='age'
                      name='age'
                      placeholder='Enter your age'
                      component={TextField}
                      loading={loading}
                    />
                    <InputError name='age' />
                  </UIForm.Field>
                  <Button type='button' basic color='black' size='large' onClick={this.onModalClose}>Cancel</Button>
                  <Button type='submit' color='green' size='large' loading={loading}>Submit</Button>
                </Form>
              )}
            </Formik>
          </Segment>
        </Modal.Content>
      </Modal>
    );
  }
}

BaseFormModal.propTypes = {
  createUser: PropTypes.func,
  updateUser: PropTypes.func,
  setModalVisibility: PropTypes.func,
  user: PropTypes.object,
  isModalOpen: PropTypes.bool,
  createUserLoading: PropTypes.bool,
  updateUserLoading: PropTypes.bool
};

const mapStateToProps = ({
  createUserData: { loading: createUserLoading },
  updateUserData: { loading: updateUserLoading },
  modalData: { isModalOpen, editingUser }
}) => ({
  createUserLoading,
  updateUserLoading,
  isModalOpen,
  user: editingUser
});

const mapDispatchToProps = {
  createUser,
  updateUser,
  setModalVisibility
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BaseFormModal);
