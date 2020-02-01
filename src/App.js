import React from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './assets/styles/style.scss';
import NotFoundPage from './components/NotFoundPage';
import routes from './routes';
import isAuth from './utils/isAuth';

const App = () => {
  return (
    <div className="App">
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <Router>
        <Switch>
          {routes.map(route => (
            <Route
              key={route.name}
              exact
              path={route.path}
              render={props => {
                document.title = route.name;
                if (route.protected && !isAuth()) {
                  return <Redirect to="/login" />;
                }
                return (
                  <route.component
                    location={props.location}
                    history={props.history}
                    match={props.match}
                  />
                );
              }}
            />
          ))}
          <Route path="*" exact component={NotFoundPage} />
        </Switch>
      </Router>
    </div>
  );
};

App.defaultProps = {
  location: {},
  history: {},
  match: {},
};

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({}),
};

export default App;
