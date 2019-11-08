import React from 'react';
import { Grid, Container } from 'semantic-ui-react';
import CreateUserForm from '../CreateUserForm';
import UsersTable from '../UsersTable';

const MainContainer = () => (
  <Container>
    <Grid>
      <Grid.Column computer={6} tablet={8} mobile={16}>
        <CreateUserForm />
      </Grid.Column>
      <Grid.Column computer={10} tablet={8} mobile={16}>
        <UsersTable />
      </Grid.Column>
    </Grid>
  </Container>
);

export default MainContainer;
