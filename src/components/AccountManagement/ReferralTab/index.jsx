import React, { useState, useEffect } from 'react';
import { Table, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Thumbnail from 'components/common/Thumbnail';
import EarnedPointIcon from 'assets/images/profile/points-icon.svg';
import RefereeIcon from 'assets/images/profile/referees-icon.svg';
import SendMoneyIcon from 'assets/images/profile/profile-send-money-icon.svg';
import SendCashIcon from 'assets/images/profile/profile-send-cash-icon.svg';
import SendVoucherIcon from 'assets/images/profile/profile-send-voucher.svg';
import ChatIcon from 'assets/images/profile/profile-chat-icon.svg';
import { ONE_TO_ONE } from 'constants/general';
import {
  openChatList,
  setGlobalChat,
} from 'redux/actions/chat/globalchat';
import {
  setIsendingCash,
  setIsSendingMoney,
  setIsSendingVoucher,
} from 'redux/actions/dashboard/dashboard';
import StatCards from './StatCards';
import './style.scss';

const ReferralTab = ({ referreesList }) => {
  const { data } = referreesList;
  const [hasError, setHasError] = useState(false);
  const [refereesCount, setRefereesCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setRefereesCount(data.length);
      let points = 0;
      data.forEach(({ Points }) => {
        points += Number(Points) || 0;
      });
      setTotalPoints(points);
    }
  }, [data]);

  const goToTransferMoney = contact => {
    setIsSendingMoney(dispatch);
    history.push({
      pathname: '/contacts',
      search: '?ref=send-money',
      state: { moneyTransfer: contact },
    });
  };

  const goToSendCash = contact => {
    setIsendingCash(dispatch);
    history.push({
      pathname: '/contacts',
      search: '?ref=send-cash',
      state: { sendCash: contact },
    });
  };
  const goToChat = contact => {
    setGlobalChat({
      currentChatType: ONE_TO_ONE,
      currentChatTarget: contact,
      isChattingWithSingleUser: true,
    })(dispatch);
    openChatList()(dispatch);
  };
  const goToVoucher = contact => {
    setIsSendingVoucher(dispatch);
    history.push({
      pathname: '/vouchers',
      search: '?ref=send-voucher',
      state: {
        contact,
      },
    });
  };

  return (
    <div className="referral-tab-container">
      <div className="stats-cards">
        <StatCards
          title="Points earned"
          number={totalPoints}
          icon={EarnedPointIcon}
        />
        <StatCards
          title="Referees"
          number={refereesCount}
          icon={RefereeIcon}
        />
      </div>
      <div className="referral-tab">
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="transaction-header">
                <h3> {global.translate('Referrals')}</h3>
              </Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {referreesList?.data?.map(contact => (
              <Table.Row>
                <Table.Cell>
                  <div className="user-profile">
                    <div className="user-avatar">
                      <Thumbnail
                        avatar={contact.PictureURL}
                        circular
                        name={contact?.FirstName}
                        secondName={contact?.LastName}
                        hasError={hasError}
                        setHasError={setHasError}
                        style={{ height: 50, width: 50 }}
                      />
                    </div>
                    <div className="user-text">
                      <div>
                        {contact.FirstName}&nbsp;{contact.LastName}
                      </div>
                      <div className="user-last-name">
                        {contact.ContactPID}
                      </div>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell />
                <Table.Cell textAlign="right">
                  <div className="quick-actions">
                    <Image
                      onClick={() => goToTransferMoney(contact)}
                      src={SendMoneyIcon}
                    />
                    <Image
                      onClick={() => goToSendCash(contact)}
                      src={SendCashIcon}
                    />
                    <Image
                      onClick={() => goToVoucher(contact)}
                      src={SendVoucherIcon}
                    />
                    <Image
                      onClick={() => goToChat(contact)}
                      src={ChatIcon}
                    />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

ReferralTab.propTypes = {
  referreesList: PropTypes.objectOf(PropTypes.any),
};
ReferralTab.defaultProps = {
  referreesList: {},
};

export default ReferralTab;
