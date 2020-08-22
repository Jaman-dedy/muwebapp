import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const ReloadApp = ({ onReload }) => {
  return (
    <div className="flex flex-column">
      <span className="medium-text text-light-black medium-padding border-bottom-1 b-light-grey medium-margin-bottom">
        {global.translate(
          'A new version is available, reload and close all tabs',
          2018,
        )}
        !
      </span>
      <div className="flex flex-row justify-content-flex-end">
        <Button
          onClick={onReload}
          content={global.translate('Reload', 2019)}
          className="reload-app-btn"
          icon="refresh"
          labelPosition="right"
        />
        <Button content={global.translate('Cancel', 86)} />
      </div>
    </div>
  );
};

ReloadApp.propTypes = {
  onReload: PropTypes.func,
};

ReloadApp.defaultProps = {
  onReload: () => undefined,
};

export default ReloadApp;
