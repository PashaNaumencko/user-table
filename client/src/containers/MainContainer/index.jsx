import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Button, Icon, Header } from 'semantic-ui-react';
import BaseFormModal from '../BaseFormModal';
import { setModalVisibility } from '../BaseFormModal/actions';
import UsersTable from '../UsersTable';

import styles from './styles.module.scss';

const MainContainer = ({ setModalVisibility, isModalOpen }) => {
  const onModalOpen = () => setModalVisibility(true);

  return (
    <Container>
      <div className={styles.mainHeading}>
        <Header as='h2' size='large' content='Users Table' textAlign='center' />
        <Button
          onClick={onModalOpen}
          content='Add new user'
          color='green'
          icon={<Icon name='plus'/>}
        />
        {isModalOpen ? <BaseFormModal /> : null}
      </div>
      <UsersTable />
    </Container>
  );
};

MainContainer.propTypes = {
  setModalVisibility: PropTypes.func,
  isModalOpen: PropTypes.bool
};

const mapStateToProps = ({
  modalData: { isModalOpen }
}) => ({ isModalOpen });

const mapDispatchToProps = {
  setModalVisibility
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
