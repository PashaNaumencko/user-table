import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Header, Table, Loader, Form as UIForm } from 'semantic-ui-react';
import { fetchUsers, deleteUsers } from '../../routines';
import { setModalVisibility } from '../../components/BaseFormModal/actions';
import { sortUsers } from './actions';


class UsersTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allSelected: false,
      selectedUserIds: [],
      sortedColumn: null,
      sortingDirection : 'ascending'
    };
  }

  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  onAllSelect = () => this.setState((prevState) => {
    const { users } = this.props;
    const updatedIdsArray = !prevState.allSelected ? users.map(user => user.id) : [];
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

  onColumnSort = (clickedColumn) => () => {
    const { sortedColumn, sortingDirection } = this.state;
    const { sortUsers } = this.props;

    if (sortedColumn !== clickedColumn) {
      this.setState({ sortedColumn: clickedColumn, direction: 'ascending' });
      sortUsers(clickedColumn);
      return;
    }

    this.setState({ sortingDirection: sortingDirection === 'ascending' ? 'descending' : 'ascending' });
    sortUsers(clickedColumn, 'descending');
  };

  onEditClick = (user) => () => this.props.setModalVisibility(true, user);

  onCancelClick = () => this.setState({ editingUserId: null });

  onDeleteSubmit = () => {
    const { selectedUserIds } = this.state;
    const { deleteUsers } = this.props;
    if(selectedUserIds.length) {
      deleteUsers(selectedUserIds);
      this.setState({ selectedUserIds: [], allSelected: false });
    }
  };

  render() {
    const { allSelected, selectedUserIds, sortedColumn, sortingDirection } = this.state;
    const { users, fetchUsersLoading, deleteUsersLoading } = this.props;
    const isIndeterminate = Boolean(selectedUserIds.length > 0 && users.length !== selectedUserIds.length);

    return fetchUsersLoading ? (
      <div>
        <Loader active />
      </div>
    ) : (
      <Segment basic>
        <Table celled padded sortable singleLine size='large'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>
                {users.length ? (
                  <UIForm.Checkbox
                    onChange={this.onAllSelect}
                    checked={allSelected}
                    indeterminate={isIndeterminate}
                  />
                ) : null}
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortedColumn === 'firstName' ? sortingDirection : null}
                onClick={this.onColumnSort('firstName')}
              >
                First Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortedColumn === 'lastName' ? sortingDirection : null}
                onClick={this.onColumnSort('lastName')}
              >
                Last Name
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortedColumn === 'phone' ? sortingDirection : null}
                onClick={this.onColumnSort('phone')}
              >
                Phone
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortedColumn === 'gender' ? sortingDirection : null}
                onClick={this.onColumnSort('gender')}
              >
                Gender
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={sortedColumn === 'age' ? sortingDirection : null}
                onClick={this.onColumnSort('age')}
              >
                Age
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map((user, idx) => (
              <Table.Row key={idx}>
                <Table.Cell textAlign='center'>
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
                <Table.Cell textAlign='center'>
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
  fetchUsers: PropTypes.func,
  deleteUsers: PropTypes.func,
  setModalVisibility: PropTypes.func,
  sortUsers: PropTypes.func,
  users: PropTypes.array,
  fetchUsersLoading: PropTypes.bool,
  deleteUsersLoading: PropTypes.bool
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
  setModalVisibility,
  sortUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersTable);

