import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Segment, Button, Icon, Header, Table, Divider, Loader, Form as UIForm } from 'semantic-ui-react';
import { fetchUsers } from '../../routines';

class UsersTable extends React.Component {
  componentDidMount() {
    const { fetchUsers } = this.props;
    fetchUsers();
  }

  render() {
    const { users, fetchUsersLoading } = this.props;

    return(
      <Segment basic>
        <Header as='h2' size='large' content='Users table' textAlign='center' />
        <Divider />
        <Table striped padded selectable singleLine size='large'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <UIForm.Checkbox />
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
            {users.map(({ firstName, lastName, phone, gender, age }, idx) => (
              <Table.Row key={idx}>
                <Table.HeaderCell>
                  <UIForm.Checkbox />
                </Table.HeaderCell>
                <Table.HeaderCell>{firstName}</Table.HeaderCell>
                <Table.HeaderCell>{lastName}</Table.HeaderCell>
                <Table.HeaderCell>{phone}</Table.HeaderCell>
                <Table.HeaderCell>{gender}</Table.HeaderCell>
                <Table.HeaderCell>{age}</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            ))}
            {fetchUsersLoading ? (
              <div>
                <Loader active />
              </div>
            ) : null}

          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan='7'>
                {users.length ? (
                  <Button animated color='red' size='medium'>
                    <Button.Content hidden>Delete</Button.Content>
                    <Button.Content visible>
                      <Icon name='trash' />
                      (4)
                    </Button.Content>
                  </Button>
                ) : (
                  <Header as='h3' content='No available users' />
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
  fetchUsersData: { loading: fetchUsersLoading, users }
}) => ({
  users,
  fetchUsersLoading
});

const mapDispatchToProps = {
  fetchUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersTable);

