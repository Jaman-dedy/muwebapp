import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Button,
  Grid,
  Container,
  Form,
  Divider,
} from 'semantic-ui-react';

import PasswordInput from 'components/common/PasswordInput';

const Login = ({
  credentials,
  onInputChange,
  handleSubmit,
  login,
}) => {
  return (
    <Container>
      <Grid>
        <Grid.Column computer={5} tablet={3} mobile={16} />
        <Grid.Column computer={6} tablet={10} mobile={16}>
          <h1 className="center-align">
            Login - <Link to="/">Home</Link>
          </h1>
          <Divider />
          <Form>
            <Form.Field>
              <Form.Input
                placeholder="Personal ID"
                name="personalId"
                type="text"
                value={credentials.personalId}
                onChange={onInputChange}
              />
            </Form.Field>
            <Form.Field>
              <PasswordInput
                placeholder="Password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={onInputChange}
              />
            </Form.Field>
            <Form.Field>
              <PasswordInput
                placeholder="Pin"
                name="pin"
                type="password"
                value={credentials.pin}
                onChange={onInputChange}
              />
            </Form.Field>
            <Button
              type="submit"
              primary
              loading={login.loading}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column computer={5} tablet={3} mobile={16} />
      </Grid>
    </Container>
  );
};

Login.propTypes = {
  credentials: PropTypes.instanceOf(Object),
  login: PropTypes.instanceOf(Object),
  handleSubmit: PropTypes.func,
  onInputChange: PropTypes.func,
};

Login.defaultProps = {
  credentials: {},
  login: {},
  onInputChange: () => true,
  handleSubmit: () => true,
};

export default Login;
