import React from 'react';
import { Loader } from 'semantic-ui-react';

import './PageLoader.scss';

const PageLoader = () => {
  return (
    <div className="PageLoader">
      <Loader active size="massive">
        <span className="text-grey">
          {global.translate('Loading')}...
        </span>
      </Loader>
    </div>
  );
};

export default PageLoader;
