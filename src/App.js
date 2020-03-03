import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './assets/styles/style.scss';
import getUserInfo from 'redux/actions/users/getUserInfo';
import NotFoundPage from './components/NotFoundPage';
import routes from './routes';
import isAuth from './utils/isAuth';

import getUserData from './redux/actions/users/getUserData';
import getLanguage from './redux/actions/users/getLanguage';
import getSupportedLanguages from './redux/actions/users/getSupportedLanguages';
import translate from './helpers/translate';
import PageLoader from './components/common/PageLoader';

const App = () => {
  const dispatch = useDispatch();
  const {
    language: {
      loading: getLanguageLoading,
      supported: { loading: getSupportedLanguagesLoading },
    } = {},
    currentUser: { loading: getMeLoading } = {},
  } = useSelector(({ user }) => user);

  useEffect(() => {
    if (localStorage.token) {
      getUserData()(dispatch);
      getUserInfo()(dispatch);
    }
    getLanguage()(dispatch);
    getSupportedLanguages()(dispatch);
  }, []);

  global.translate = translate();

  return (
    <>
      {getLanguageLoading ||
      getMeLoading ||
      getSupportedLanguagesLoading ? (
        <PageLoader />
      ) : (
        ''
      )}

      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <div className="App">
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
    </>
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
