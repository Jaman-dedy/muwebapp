import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const InstallApp = ({ onInstall, onCancel }) => {
  return (
    <div className="flex flex-column">
      <span className="medium-text text-light-black medium-padding border-bottom-1 b-light-grey medium-margin-bottom">
        {global.translate('Add to home screen')}
      </span>
      <div className="flex flex-row justify-content-flex-end">
        <Button
          onClick={onInstall}
          content={global.translate('Install')}
          className="install-btn"
          icon="plus"
          labelPosition="right"
        />
        <Button
          content={global.translate('Cancel')}
          onClick={onCancel}
        />
      </div>
    </div>
  );
};

InstallApp.propTypes = {
  onInstall: PropTypes.func,
  onCancel: PropTypes.func,
};

InstallApp.defaultProps = {
  onInstall: () => undefined,
  onCancel: () => undefined,
};

export default InstallApp;
