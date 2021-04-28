import React from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'semantic-ui-react';
import UploadDocumentIcon from 'assets/images/profile/upload-document.svg';
import './style.scss';
import DisplayDocument from './DisplayDocument';

const DocumentTab = () => {
  return (
    <div className="document-container">
      <div className="document-headers">
        <h3 className="document-header">
          {global.translate('Supporting document')}
        </h3>
        <Button className="document-button">
          <Image src={UploadDocumentIcon} />
          {global.translate('Upload document')}
        </Button>
      </div>

      <div className="document-description">
        {global.translate(
          'Any official document bearing your name and your address such as utilities bill, bank statement, and landline telephone bill. In respect of close relatives or roommates living together, a certified statement of the person with the name on the document is required.',
        )}
      </div>
      <div className="display-docs">
        <DisplayDocument />
        <DisplayDocument />
        <DisplayDocument />
        <DisplayDocument />
      </div>
    </div>
  );
};

export default DocumentTab;
