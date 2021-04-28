import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';
import TestImg from 'assets/images/profile/test-img.png';
import ZoomDocIcon from 'assets/images/profile/zoom-doc.svg';
import EditDoc from 'assets/images/profile/edit-doc.svg';
import deleteDoc from 'assets/images/profile/delete-doc.svg';
import './style.scss';

const DisplayDocument = () => {
  return (
    <div className="images-container">
      <div className="images-doc-block">
        <div className="images-doc-actions">
          <Image src={ZoomDocIcon} />
        </div>
        <div className="edit-delete-doc">
          <Image src={EditDoc} />
          <Image src={deleteDoc} />
        </div>
        <div>
          <div className="doc-image">
            <div className="overlay" />
            <Image src={TestImg} />
          </div>
          <div className="doc-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
            aliquam
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayDocument;
