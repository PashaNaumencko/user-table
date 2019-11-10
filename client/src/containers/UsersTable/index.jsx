import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Header, Table, Loader, Form as UIForm } from 'semantic-ui-react';
import { BaseFormModal } from '../../components';
import { fetchUsers, deleteUsers } from '../../routines';
import { setModalVisibility } from '../../components/BaseFormModal/actions';

import styles from './styles.module.scss';

class UsersTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allSelected: false,
      selectedUserIds: []
    };
  }

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  onAllSelect = () => this.setState((prevState) => {
    const { users } = this.props;
    const { selectedUserIds } = this.state;
    const updatedIdsArray = !prevState.allSelected ? users.map(user => user.id) : [];
    console.log(updatedIdsArray);
    //users.length === selectedUserIds.length
    return {
      ...prevState,
      allSelected: Boolean(!prevState.allSelected && users.length === updatedIdsArray.length),
      selectedUserIds: updatedIdsArray
    };
  });

  isUserSelected = userId => this.state.selectedUserIds.some(selectedUserId => userId === selectedUserId);

  onUserSelect = (id) => () => {
    const { users } = this.props;
    const { selectedUserIds } = this.state;
    let updatedIdsArray;
    if(this.isUserSelected(id)) {
      updatedIdsArray = selectedUserIds.filter(selectedUserId => selectedUserId !== id);
      this.setState({ selectedUserIds: updatedIdsArray, allSelected: false });
    }
    else {
      updatedIdsArray = [...selectedUserIds, id];
      this.setState({
        selectedUserIds: updatedIdsArray,
        allSelected: users.length === updatedIdsArray.length
      });
    }
  };

  onEditClick = (user) => () => {
    this.props.setModalVisibility(true, user);
    // this.setState({ editingUser: user });
  };

  onCancelClick = () => this.setState({ editingUserId: null });

  onDeleteSubmit = () => {
    const { selectedUserIds } = this.state;
    const { deleteUsers } = this.props;
    if(selectedUserIds.length) {
      deleteUsers(selectedUserIds);
      this.setState({ selectedUserId: [], allSelected: false });
    }
  };

  render() {
    const { allSelected, selectedUserIds } = this.state;
    const { users, fetchUsersLoading, deleteUsersLoading } = this.props;
    const isIndeterminate = Boolean(selectedUserIds.length && users.length !== selectedUserIds.length);

    return fetchUsersLoading ? (
      <div>
        <Loader active />
      </div>
    ) : (
      <Segment basic>
        <Table striped padded sortable singleLine size='large'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                {users.length ? (
                  <UIForm.Checkbox
                    onChange={this.onAllSelect}
                    checked={allSelected}
                    indeterminate={isIndeterminate}
                  />
                ) : null}
              </Table.HeaderCell>
              <Table.HeaderCell>First Name</Table.HeaderCell>
              <Table.HeaderCell>Last Name</Table.HeaderCell>
              <Table.HeaderCell>Phone</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
              <Table.HeaderCell>Age</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user, idx) => (
              <Table.Row key={idx}>
                <Table.Cell>
                  <UIForm.Checkbox
                    checked={this.isUserSelected(user.id)}
                    onChange={this.onUserSelect(user.id)}
                  />
                </Table.Cell>
                <Table.Cell>{user.firstName}</Table.Cell>
                <Table.Cell>{user.lastName}</Table.Cell>
                <Table.Cell>{user.phone}</Table.Cell>
                <Table.Cell>{user.gender}</Table.Cell>
                <Table.Cell>{user.age}</Table.Cell>
                <Table.Cell>
                  <Button type='button' icon={<Icon name='edit' />} onClick={this.onEditClick(user)} />
                </Table.Cell>
              </Table.Row>
            )
            )}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='7'>
                {users.length ? (
                  <Button
                    type='button'
                    animated
                    color='red'
                    size='medium'
                    onClick={this.onDeleteSubmit}
                    loading={deleteUsersLoading}
                  >
                    <Button.Content hidden>Delete</Button.Content>
                    <Button.Content visible>
                      <Icon name='trash' />
                      ({selectedUserIds.length})
                    </Button.Content>
                  </Button>
                ) : (
                  <Header as='h3' textAlign='center' content='No available users' />
                )}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        {/* {editingUser ? <BaseFormModal user={editingUser} /> : null} */}
      </Segment>
    );
  }
}

UsersTable.propTypes = {
  fetchAllRecipes: PropTypes.func,
  recipes: PropTypes.array,
  allRecipesLoading: PropTypes.bool
};

const mapStateToProps = ({
  fetchUsersData: { loading: fetchUsersLoading, users },
  deleteUsersData: { loading: deleteUsersLoading }
}) => ({
  users,
  fetchUsersLoading,
  deleteUsersLoading
});

const mapDispatchToProps = {
  fetchUsers,
  deleteUsers,
  setModalVisibility
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersTable);

