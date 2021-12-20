import React from 'react';
import { Tab } from 'semantic-ui-react';
import FormCheckBox from 'components/common/CheckBox';
import './style.scss';

const NotificationSettingsTab = () => {
  return (
    <Tab.Pane>
      <h2>{global.translate('Subscribe to')}:</h2>
      <div>
        <div className="current-item">
          <FormCheckBox
            checkLabel={global.translate('Ratings')}
            value={false}
            name="storeAvailable"
            defaultChecked
            onChange={() => {}}
          />
        </div>

        <p className="_7LpC8">
          {global.translate(
            'Get notified when a new rating is made on my store',
            773,
          )}
        </p>
      </div>
      <div>
        <div className="current-item">
          <FormCheckBox
            checkLabel={global.translate('Comments', 869)}
            value={false}
            name="storeAvailable"
            defaultChecked
            onChange={() => {}}
          />
        </div>

        <p className="_7LpC8">
          {global.translate(
            'Get notified when a new comment is made on my store',
            774,
          )}
        </p>
      </div>
      <div>
        <div className="current-item">
          <FormCheckBox
            checkLabel={global.translate('Likes', 854)}
            value={false}
            name="storeAvailable"
            defaultChecked
            onChange={() => {}}
          />
        </div>

        <p className="_7LpC8">
          {global.translate(
            'Get notified when a new like is made on the store',
            775,
          )}
        </p>
      </div>
    </Tab.Pane>
  );
};

export default NotificationSettingsTab;
