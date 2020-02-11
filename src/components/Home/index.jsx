import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Grid,
  Input,
  Divider,
  Card,
  Image,
  Icon,
} from 'semantic-ui-react';

const Home = ({ handleSearchUser, currentUser }) => {
  const userCard = (
    <Card>
      <Image src={currentUser.data.avatar} wrapped ui={false} />
      <Card.Content>
        <Card.Header>
          {currentUser.data.first_name} {currentUser.data.last_name}
        </Card.Header>
        <Card.Meta>
          <Icon name="mail" /> {currentUser.data.email}
        </Card.Meta>
      </Card.Content>
    </Card>
  );
  return (
    <>
      <Grid>
        <Grid.Column computer={5} tablet={3} mobile={16} />
        <Grid.Column computer={6} tablet={10} mobile={16}>
          <h1 className="center-align">
            Home - <Link to="/login">Login</Link> -{' '}
            <Link to="/resetPassword">Reset Password</Link>-{' '}
            <Link to="/dashboard">Dashboard</Link>
          </h1>
          <Divider />
          <Input
            loading={currentUser.loading}
            name="handleSearchUser"
            type="number"
            onChange={handleSearchUser}
            fluid
            icon="search"
            placeholder="Enter a user ID (example: 2, 4...)"
          />
          <Divider />
          <div className="flex justify-content-center">
            {currentUser.loading ? 'Loading...' : ''}
            {!currentUser.loading &&
            !currentUser.error &&
            currentUser.data.id
              ? userCard
              : ''}
          </div>
        </Grid.Column>
        <Grid.Column computer={5} tablet={3} mobile={16} />
      </Grid>
    </>
  );
};

Home.propTypes = {
  handleSearchUser: PropTypes.func,
  currentUser: PropTypes.instanceOf(Object),
};

Home.defaultProps = {
  handleSearchUser: () => true,
  currentUser: { data: {} },
};
export default Home;
