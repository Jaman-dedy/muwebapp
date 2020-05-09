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
import getUserLocationData from 'redux/actions/users/userLocationData';
import initSocketIOClientEvents from 'services/socketIO/events';
import * as welcomeEvent from 'services/socketIO/events/welcome';
import notifAction from 'redux/actions/users/notifications';
import getContactList from 'redux/actions/contacts/getContactList';
import walletEvent from 'services/socketIO/events/wallet';
import generalEvent from 'services/socketIO/events/general';
import cashRequestEvent from 'services/socketIO/events/cashRequest';
import contactRequestEvent from 'services/socketIO/events/contactRequest';
import voucherEvent from 'services/socketIO/events/voucher';
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

  initSocketIOClientEvents();
  walletEvent();
  generalEvent();
  cashRequestEvent();
  contactRequestEvent();
  voucherEvent();

  const {
    language: {
      loading: getLanguageLoading,
      supported: { loading: getSupportedLanguagesLoading },
    } = {},
    currentUser: { loading: getMeLoading } = {},
    userData: { data, loading: userDataLoading },
  } = useSelector(({ user }) => user);

  useEffect(() => {
    if (localStorage.token) {
      getUserData()(dispatch);
      getUserInfo()(dispatch);
    }
    getUserLocationData()(dispatch);
    getLanguage()(dispatch);
    getSupportedLanguages()(dispatch);
  }, []);

  useEffect(() => {
    if (!userDataLoading && data && Object.keys(data).length) {
      notifAction({ PID: data.PID })(dispatch);
      getContactList()(dispatch);
    }
  }, [data && data.PID]);

  useEffect(() => {
    welcomeEvent.listen();

    return () => {
      welcomeEvent.off();
    };
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
