import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Header, Table, Loader, Form as UIForm } from 'semantic-ui-react';
// import UpdateUserForm from '../../components/UpdateUserForm';
import { fetchUsers, deleteUsers } from '../../routines';

import styles from './styles.module.scss';

class UsersTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allSelected: false,
      selectedUserIds: [],
      editingUser: {}
    };
  }

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  onAllSelect = () => this.setState((prevState) => ({ ...prevState, allSelected: !prevState.allSelected }));

  isUserSelected = userId => this.state.allSelected
    || this.state.selectedUserIds.some(selectedUserId => userId === selectedUserId);

  onUserSelect = (id) => () => {
    const { selectedUserIds } = this.state;
    if(this.isUserSelected(id)) {
      const updatedIdsArray = selectedUserIds.filter(selectedUserId => selectedUserId !== id);
      this.setState({ selectedUserIds: updatedIdsArray });
    }
    else {
      this.setState({ selectedUserIds: [...selectedUserIds, id] });
    }
  };

  onEditClick = (user) => () => this.setState({ editingUser: user });

  onCancelClick = () => this.setState({ editingUserId: null });

  onDeleteSubmit = () => {
    const { selectedUserIds } = this.state;
    const { deleteUsers } = this.props;
    if(selectedUserIds.length) {
      deleteUsers(selectedUserIds);
      this.setState({ selectedUserId: [] });
    }
  };

  render() {
    const { allSelected, selectedUserIds, editingUser } = this.state;
    const { users, fetchUsersLoading, deleteUsersLoading } = this.props;

    console.log(editingUser);

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
  deleteUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersTable);

