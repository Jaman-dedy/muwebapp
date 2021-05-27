import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Image } from 'semantic-ui-react';

import UploadDocumentIcon from 'assets/images/profile/upload-document.svg';
import './style.scss';
import DisplayDocument from './DisplayDocument';
import SupportingDocModal from './SupportingDocModal';
import validateDocs from './validateDocs';

const DocumentTab = ({ supportingDocuments }) => {
  const [isImg1Correct, setIsImg1Correct] = useState(false);
  const [isImg2Correct, setIsImg2Correct] = useState(false);
  const [isImg3Correct, setIsImg3Correct] = useState(false);
  const [isImg4Correct, setIsImg4Correct] = useState(false);
  const [isImg5Correct, setIsImg5Correct] = useState(false);
  const [docToUpload, setDocToUpload] = useState('');
  const [hideUploadButton, setHideUploadButton] = useState(true);

  const {
    openDocModal,
    setOpenDocModal,
    userDoc,
  } = supportingDocuments;

  //check the doc to upload
  useEffect(() => {
    if (!isImg1Correct) {
      setDocToUpload('UserExtraDoc1URL');
      setHideUploadButton(false);
    } else if (!isImg2Correct) {
      setDocToUpload('UserExtraDoc2URL');
      setHideUploadButton(false);
    } else if (!isImg3Correct) {
      setDocToUpload('UserExtraDoc3URL');
      setHideUploadButton(false);
    } else if (!isImg4Correct) {
      setDocToUpload('UserExtraDoc4URL');
      setHideUploadButton(false);
    } else if (!isImg5Correct) {
      setDocToUpload('UserExtraDoc5URL');
      setHideUploadButton(false);
    } else {
      setHideUploadButton(true);
    }
  }, [
    isImg1Correct,
    isImg2Correct,
    isImg3Correct,
    isImg4Correct,
    isImg5Correct,
  ]);

  // Validate doc urls
  useEffect(() => {
    if (userDoc) {
      validateDocs(
        userDoc.UserExtraDoc1URL,
        setIsImg1Correct,
        userDoc.UserExtraDoc2URL,
        setIsImg2Correct,
        userDoc.UserExtraDoc3URL,
        setIsImg3Correct,
        userDoc.UserExtraDoc4URL,
        setIsImg4Correct,
        userDoc.UserExtraDoc5URL,
        setIsImg5Correct,
      );
    }
  }, [userDoc]);

  return (
    <div className="document-container">
      <div className="document-headers">
        <h3 className="document-header">
          {global.translate('Supporting document')}
        </h3>
        {!hideUploadButton ? (
          <Button
            className="document-button"
            onClick={() => setOpenDocModal(true)}
          >
            <Image src={UploadDocumentIcon} />
            {global.translate('Upload document')}
          </Button>
        ) : null}
      </div>

      <div className="document-description">
        {global.translate(
          'Any official document bearing your name and your address such as utilities bill, bank statement, and landline telephone bill. In respect of close relatives or roommates living together, a certified statement of the person with the name on the document is required.',
          893,
        )}
      </div>
      <div className="display-docs">
        {isImg1Correct ? (
          <DisplayDocument
            supportingDocuments={supportingDocuments}
            imgSrc={userDoc?.UserExtraDoc1URL}
            nameImgToUpload="UserExtraDoc1URL"
          />
        ) : null}
        {isImg2Correct ? (
          <DisplayDocument
            supportingDocuments={supportingDocuments}
            imgSrc={userDoc?.UserExtraDoc2URL}
            nameImgToUpload="UserExtraDoc2URL"
          />
        ) : null}
        {isImg3Correct ? (
          <DisplayDocument
            supportingDocuments={supportingDocuments}
            imgSrc={userDoc?.UserExtraDoc3URL}
            nameImgToUpload="UserExtraDoc3URL"
          />
        ) : null}

        {isImg4Correct ? (
          <DisplayDocument
            supportingDocuments={supportingDocuments}
            imgSrc={userDoc?.UserExtraDoc4URL}
            nameImgToUpload="UserExtraDoc4URL"
          />
        ) : null}
        {isImg5Correct ? (
          <DisplayDocument
            supportingDocuments={supportingDocuments}
            imgSrc={userDoc?.UserExtraDoc5URL}
            nameImgToUpload="UserExtraDoc5URL"
          />
        ) : null}
      </div>
      <SupportingDocModal
        open={openDocModal}
        setOpen={setOpenDocModal}
        nameImgToUpload={docToUpload}
        supportingDocuments={supportingDocuments}
      />
    </div>
  );
};
DocumentTab.propTypes = {
  openDocModal: PropTypes.func,
  setOpenDocModal: PropTypes.func,
  supportingDocuments: PropTypes.objectOf(PropTypes.any),
  userDoc: PropTypes.objectOf(PropTypes.any),
};
DocumentTab.defaultProps = {
  openDocModal: () => {},
  setOpenDocModal: () => {},
  supportingDocuments: {},
  userDoc: {},
};

export default DocumentTab;
