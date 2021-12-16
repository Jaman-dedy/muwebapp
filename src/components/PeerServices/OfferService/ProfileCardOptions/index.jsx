import React from 'react';
import { List, Image, Card, Segment } from 'semantic-ui-react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import WalletIcon from 'assets/images/profilecard/mywallet.svg';
import paybillsIcon from 'assets/images/profilecard/paybills.png';
import SendCashIcon from 'assets/images/profilecard/sendcash.svg';
import SettingsIcon from 'assets/images/profilecard/settings.svg';
import MessageIcon from 'assets/images/h-chat.svg';
import './style.scss';
import {
  setIsendingCash,
  openChatList,
} from 'redux/actions/dashboard/dashboard';
import openEditPricingModal from 'redux/actions/peerServices/openEditPricingModal';
import { setGlobalChat } from 'redux/actions/chat/globalchat';
import {
  ONE_TO_ONE,
  LOGIN_RETURN_URL,
  REPORT_SERVICE_COMMENT,
  REPORT_SERVICE,
  PEER_SERVICE_IMAGE,
  PEER_SERVICE_VIDEO,
} from 'constants/general';

export default function ProfileCardOptions() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const {
    allContacts: { data: allContacts },
    newContact: { loading },
  } = useSelector(state => state.contacts);
  const { data } = useSelector(({ user: { userData } }) => userData);
  const {
    myServices: { data: peerServices },
  } = useSelector(state => state.peerServices);

  const owner = peerServices?.Data?.[0]?.Owner || data;

  const isAuthUser =
    data?.PID === owner?.OwnerPID ||
    data?.PID === owner?.PID ||
    false;

  const handleOpenChat = ({ OwnerPID: ContactPID, ...rest }) => {
    setGlobalChat({
      currentChatType: ONE_TO_ONE,
      currentChatTarget: { ...rest, ContactPID },
      isChattingWithSingleUser: true,
    })(dispatch);
    openChatList(dispatch);
  };

  const onStartChatClick = Owner => {
    if (data?.PID === Owner.OwnerPID) {
      openEditPricingModal({ open: true })(dispatch);
    } else if (!data?.PID) {
      localStorage.toOpenChat = '1';
      localStorage.lastServiceOwner = Owner.OwnerPID;

      history.push({
        pathname: `/login`,
        search: `${LOGIN_RETURN_URL}=${location.pathname}`,
        state: {
          [LOGIN_RETURN_URL]: location.pathname,
          toOpenChat: true,
        },
      });
    } else {
      handleOpenChat(Owner);
    }
  };

  const isContact = () => {
    if (isAuthUser) {
      return false;
    }

    if (
      allContacts
        ?.map(item => item.ContactPID)
        .includes(owner.OwnerPID)
    ) {
      return true;
    }
    return false;
  };

  return (
    <>
      {isAuthUser || (
        <Card className="profile-options-card">
          <Card.Content id="profile-options-card-content">
            <List>
              {isContact() ? (
                <>
                  <Segment
                    basic
                    className="item"
                    as={Link}
                    to={`/contacts?ref=send-money&PID=${owner?.OwnerPID}`}
                    onClick={() => {
                      setIsendingCash(dispatch);
                    }}
                  >
                    <Image src={WalletIcon} />
                    <List.Content className="item-content">
                      {global.translate('Send money', 65)}
                    </List.Content>
                  </Segment>
                  <Segment
                    basic
                    className="item"
                    as={Link}
                    to={`/contacts?ref=send-cash&PID=${owner?.OwnerPID}`}
                    onClick={() => {
                      setIsendingCash(dispatch);
                    }}
                  >
                    <Image src={SendCashIcon} />
                    <List.Content className="item-content">
                      {global.translate('Send Cash', 1948)}
                    </List.Content>
                  </Segment>
                </>
              ) : (
                <Segment
                  basic
                  className="item"
                  as={Link}
                  to={`/quick-pay?w=${owner?.Wallet}`}
                  onClick={() => {
                    setIsendingCash(dispatch);
                  }}
                >
                  <Image src={WalletIcon} />
                  <List.Content className="item-content">
                    {global.translate('Quick pay', 65)}
                  </List.Content>
                </Segment>
              )}

              {owner?.OwnerPID !== data?.PID && (
                <Segment
                  basic
                  className="item"
                  as={Link}
                  onClick={() => {
                    onStartChatClick(owner);
                  }}
                >
                  <Image src={MessageIcon} />
                  <List.Content className="item-content">
                    {global.translate('Chat')}
                  </List.Content>
                </Segment>
              )}
            </List>
          </Card.Content>
        </Card>
      )}
    </>
  );
}

ProfileCardOptions.propTypes = {};
