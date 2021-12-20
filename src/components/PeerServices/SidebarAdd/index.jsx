import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import EventsImage from 'assets/images/marketplace/marketplace-ad-banner.jpg';
import './style.scss';
import {
  APP_NAME,
  TERMS_AND_CONDITIONS_URL,
  PRIVACY_POLICY_URL,
} from 'constants/general';

const SidebarAd = ({ className = '' }) => {
  return (
    <div className={className}>
      <Card>
        <Image src={EventsImage} wrapped ui={false} />
        <Card.Content className="cp-footer">
          <div className="cp-footer">
            <a href={TERMS_AND_CONDITIONS_URL}>
              {global.translate('Terms and Conditions', 2177)}
            </a>{' '}
            {''}
            <a href={PRIVACY_POLICY_URL}>
              {global.translate('Privacy Policy.')}
            </a>
            <br />
            <br />
            &copy; {new Date().getFullYear()} {APP_NAME}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
};

export default SidebarAd;
