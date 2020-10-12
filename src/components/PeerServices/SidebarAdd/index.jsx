import React from 'react';
import { Image, List } from 'semantic-ui-react';
import EventsImage from 'assets/images/marketplace/liberation_day_rw.png';
import './style.scss';
import {
  COMPANY_NAME,
  TERMS_AND_CONDITIONS_URL,
  HOME_WEBSITE,
} from 'constants/general';

const SidebarAd = () => {
  return (
    <div>
      <Image src={EventsImage} />

      <div className="cp-footer">
        <List horizontal>
          <List.Item
            as="a"
            target="_blank"
            href={TERMS_AND_CONDITIONS_URL}
          >
            {global.translate('Terms and Conditions')}
          </List.Item>
          <List.Item
            as="a"
            target="_blank"
            href={TERMS_AND_CONDITIONS_URL}
          >
            {global.translate('Privacy Policy.')}
          </List.Item>
          <List.Item as="a" target="_blank" href={HOME_WEBSITE}>
            {global.translate('More')}
          </List.Item>
        </List>
        &copy; {new Date().getFullYear()} {COMPANY_NAME}
      </div>
    </div>
  );
};

export default SidebarAd;
