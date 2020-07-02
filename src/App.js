import React, { useEffect, useRef, useState } from 'react';
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
import 'assets/styles/style.scss';
import IdleTimer from 'react-idle-timer';
import { Modal, Button } from 'semantic-ui-react';
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
import logout from 'redux/actions/users/logout';
import directMessage from 'services/socketIO/chat/directMessage';
import ChatModal from 'components/MessagingComponent/ChatModal';
import NotFoundPage from 'components/NotFoundPage';
import routes from 'routes';
import isAuth from 'utils/isAuth';
import getUserData from 'redux/actions/users/getUserData';
import getLanguage from 'redux/actions/users/getLanguage';
import getSupportedLanguages from 'redux/actions/users/getSupportedLanguages';
import translate from 'helpers/translate';
import PageLoader from 'components/common/PageLoader';
import deleteMessages from 'services/socketIO/chat/deleteMessages';
import updateUnreadCount from 'services/socketIO/chat/updateUnreadCount';
import chatThreads from 'services/socketIO/chat/chatThreads';
import userPresence from 'services/socketIO/events/contactPresence';
import blockUnblock from 'services/socketIO/events/blockUnblock';
import useNotifyOnlineStatus from 'containers/Dashboard/useNotifyOnlineStatus';
import checkUserConnected from 'services/socketIO/events/checkUserConnected';

const App = () => {
  const dispatch = useDispatch();
  initSocketIOClientEvents();
  walletEvent();
  generalEvent();
  cashRequestEvent();
  contactRequestEvent();
  voucherEvent();

  // chat
  chatThreads();
  directMessage();
  deleteMessages();
  updateUnreadCount();

  // check user went offline

  checkUserConnected();

  // user presence
  userPresence();

  // contact block/unblock updates
  blockUnblock();

  // notify user online

  useNotifyOnlineStatus();

  const {
    language: { loading: getLanguageLoading } = {},
    currentUser: { loading: getMeLoading } = {},
    userData: { data, loading: userDataLoading },
  } = useSelector(({ user }) => user);

  const routeRef = useRef(null);

  const { open: chatOpen } = useSelector(state => state.chat.appChat);
  const appRef = useRef(null);
  const sessionTimeoutRef = useRef(null);

  const MAX_USER_IDLE_TIME = Number(
    localStorage.getItem('MAX_USER_IDLE_TIME'),
  );

  const DEBOUNCE_TIME = MAX_USER_IDLE_TIME * (1 / 4);
  const INITIAL_TIMEOUT_DURATION = Math.floor(
    MAX_USER_IDLE_TIME * (3 / 4),
  );
  const [open, setOpen] = useState(false);

  const stayActive = () => {
    clearTimeout(sessionTimeoutRef.current);
    setOpen(false);
  };

  const logUserOut = () => {
    setOpen(false);
    localStorage.setItem('userWasIdle', true);
    logout()(dispatch);
  };

  const onIdle = () => {
    setOpen(true);
    sessionTimeoutRef.current = setTimeout(logUserOut, DEBOUNCE_TIME);
  };
  useEffect(() => {
    getUserLocationData()(dispatch);
    getSupportedLanguages()(dispatch);
    if (localStorage.token) {
      getUserData()(dispatch);
      getUserInfo()(dispatch);
    }
    if (!localStorage.getItem('fromUserLogout')) {
      getLanguage()(dispatch);
    }
  }, []);

  useEffect(() => {
    if (!userDataLoading && data && Object.keys(data).length) {
      notifAction({ PID: data.PID })(dispatch);
      getContactList()(dispatch);
    }
  }, [userDataLoading, data, dispatch]);

  useEffect(() => {
    welcomeEvent.listen();

    return () => {
      welcomeEvent.off();
    };
  }, []);

  global.translate = translate();
  return (
    <>
      <ChatModal open={chatOpen} routeRef={routeRef} />
      {getMeLoading || getLanguageLoading ? <PageLoader /> : ''}

      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
      <div className="App">
        <Modal
          size="tiny"
          className="session-timeout-modal"
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          closeOnDimmerClick={false}
          closeOnDocumentClick={false}
        >
          <Modal.Header>
            {global.translate('Account has no activity')}!
          </Modal.Header>
          <Modal.Content>
            <p className="sub-title">
              {global.translate(
                'Your account has been idle for a while, you are going to be logged out soon',
              )}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              negative
              onClick={() => {
                logUserOut();
              }}
            >
              {global.translate('Log me out')}
            </Button>
            <Button
              positive
              onClick={stayActive}
              content={global.translate('Keep me signed in')}
            />
          </Modal.Actions>
        </Modal>

        <IdleTimer
          ref={appRef}
          element={document}
          timeout={INITIAL_TIMEOUT_DURATION}
          onIdle={() => {
            if (isAuth()) {
              onIdle();
            }
          }}
        >
          <Router ref={routeRef}>
            <Switch>
              {routes.map(route => (
                <Route
                  key={route.name}
                  exact
                  path={route.path}
                  render={props => {
                    if (route.protected && !isAuth()) {
                      return <Redirect to="/login" />;
                    }
                    document.title = route.name;
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
        </IdleTimer>
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
