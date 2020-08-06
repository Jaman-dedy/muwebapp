/* eslint-disable react-hooks/exhaustive-deps */
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
import IdleTimer from 'react-idle-timer';
import { Modal, Button } from 'semantic-ui-react';

import 'assets/styles/style.scss';
import getUserInfo from 'redux/actions/users/getUserInfo';
import getUserLocationData from 'redux/actions/users/userLocationData';
import handleSocketIOClientEvents from 'services/socketIO/events';
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
import routes from 'routes';
import isAuth from 'utils/isAuth';
import scroll from 'helpers/scroll';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';
import getUserData from 'redux/actions/users/getUserData';
import getLanguage from 'redux/actions/users/getLanguage';
import getSupportedLanguages from 'redux/actions/users/getSupportedLanguages';
import useTranslate from 'hooks/useTranslate';
import useInstallApp from 'hooks/useInstallApp';
import deleteMessages from 'services/socketIO/chat/deleteMessages';
import updateUnreadCount from 'services/socketIO/chat/updateUnreadCount';
import chatThreads from 'services/socketIO/chat/chatThreads';
import userPresence from 'services/socketIO/events/contactPresence';
import blockUnblock from 'services/socketIO/events/blockUnblock';
import useNotifyOnlineStatus from 'containers/Dashboard/useNotifyOnlineStatus';
import checkUserConnected from 'services/socketIO/events/checkUserConnected';
import PageLoader from 'components/common/PageLoader';
import ChatModal from 'components/MessagingComponent/ChatModal';
import UserLeaveConfirmation from 'components/common/UserConfirmation';
import NotFoundPage from 'components/NotFoundPage';
import InstallApp from 'components/InstallApp';
import ReloadApp from 'components/ReloadApp';
import * as serviceWorker from './serviceWorker';

const App = () => {
  const dispatch = useDispatch();
  global.translate = useTranslate();

  handleSocketIOClientEvents();

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
    showInstallBtn,
    deferredPrompt,
    installApp,
    cancelInstallApp,
  } = useInstallApp();
  const [waitingWorker, setWaitingWorker] = React.useState(null);

  const routeRef = useRef(null);
  const appRef = useRef(null);
  const sessionTimeoutRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(true);

  const {
    language: { loading: getLanguageLoading } = {},
    currentUser: { loading: getMeLoading } = {},
    userData: { data, loading: userDataLoading },
  } = useSelector(({ user }) => user);
  const { open: chatOpen } = useSelector(state => state.chat.appChat);

  const MAX_USER_IDLE_TIME = Number(
    localStorage.getItem('MAX_USER_IDLE_TIME'),
  );

  const DEBOUNCE_TIME = MAX_USER_IDLE_TIME * (1 / 4);
  const INITIAL_TIMEOUT_DURATION = Math.floor(
    MAX_USER_IDLE_TIME * (3 / 4),
  );

  const reloadPage = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    window.location.reload(true);
  };

  const onSWUpdate = registration => {
    const reloadAppBtn = document.querySelector('.reload-app-toast');
    if (!reloadAppBtn && !isAppDisplayedInWebView()) {
      setWaitingWorker(registration?.waiting);
      toast(<ReloadApp onReload={reloadPage} />, {
        autoClose: false,
        closeButton: false,
        className: 'reload-app-toast',
      });
    } else if (registration?.waiting && isAppDisplayedInWebView()) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  };

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
    const installAppBtn = document.querySelector(
      '.install-app-toast',
    );
    if (
      showInstallBtn &&
      deferredPrompt &&
      !installAppBtn &&
      !isAppDisplayedInWebView()
    ) {
      toast(
        <InstallApp
          onInstall={() => installApp(deferredPrompt)}
          onCancel={cancelInstallApp}
        />,
        {
          autoClose: false,
          closeButton: false,
          className: 'install-app-toast',
        },
      );
    }
  }, [showInstallBtn, deferredPrompt]);

  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
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

  useEffect(() => {
    scroll();
  }, [window.location.href]);

  const AppRoutes = (
    <Router
      ref={routeRef}
      getUserConfirmation={(message, callback) => {
        return UserLeaveConfirmation(
          message,
          confirmOpen,
          setConfirmOpen,
          callback,
        );
      }}
    >
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
  );

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
                'Your account has been idle for a while, you are going to be logged out soon.',
                1341,
              )}
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button
              basic
              color="red"
              onClick={() => {
                logUserOut();
              }}
            >
              {global.translate('Log me out', 1342)}
            </Button>
            <Button
              positive
              onClick={stayActive}
              content={global.translate('Keep me signed in.')}
            />
          </Modal.Actions>
        </Modal>

        {isAppDisplayedInWebView() ? (
          AppRoutes
        ) : (
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
            {AppRoutes}
          </IdleTimer>
        )}
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
