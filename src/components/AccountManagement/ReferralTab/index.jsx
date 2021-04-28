import React, { useState, useEffect } from 'react';
import { Table, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import Thumbnail from 'components/common/Thumbnail';
import EarnedPointIcon from 'assets/images/profile/points-icon.svg';
import RefereeIcon from 'assets/images/profile/referees-icon.svg';
import SendMoneyIcon from 'assets/images/profile/profile-send-money-icon.svg';
import SendCashIcon from 'assets/images/profile/profile-send-cash-icon.svg';
import SendVoucherIcon from 'assets/images/profile/profile-send-voucher.svg';
import ChatIcon from 'assets/images/profile/profile-chat-icon.svg';
import StatCards from './StatCards';
import './style.scss';

const ReferralTab = ({ userData, referreesList }) => {
  const { data } = referreesList;
  const [hasError, setHasError] = useState(false);
  const [refereesCount, setRefereesCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

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
                    <Image src={SendMoneyIcon} />
                    <Image src={SendCashIcon} />
                    <Image src={SendVoucherIcon} />
                    <Image src={ChatIcon} />
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
  userData: PropTypes.objectOf(PropTypes.any),
  referreesList: PropTypes.objectOf(PropTypes.any),
};
ReferralTab.defaultProps = {
  userData: {},
  referreesList: {},
};

export default ReferralTab;
