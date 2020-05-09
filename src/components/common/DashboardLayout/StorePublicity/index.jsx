import React from 'react';
import { Image, Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import './StorePublicity.scss';

const StorePublicity = ({ open, setOpen, publicityData }) => {
  const { Link, AdImageURL, Title, SubTitle, Detail } = publicityData;
  return (
    <Modal
      open={open}
      size="tiny"
      closeIcon
      onClose={() => setOpen(false)}
    >
      <Modal.Content>
        <div className="store-publicity xxlarge-h-padding">
          <div className="store-name center-align">{Title}</div>
          <div className="title center-align">{SubTitle}</div>
          <div className="descriptions">{Detail}</div>
          <div className="compaign-image">
            {AdImageURL && (
              <Image centered src={AdImageURL} alt="Campaign image" />
            )}
          </div>
          <div className="url-info flex justify-content-flex-end">
            {Link && (
              <a
                href={Link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>{global.translate('More Info')}</Button>
              </a>
            )}
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

StorePublicity.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  publicityData: PropTypes.instanceOf(Object),
};

StorePublicity.defaultProps = {
  open: false,
  setOpen: () => null,
  publicityData: {
    Link: '',
    Title: '',
    SubTitle: '',
    AdImageURL: '',
    Detail: '',
  },
};

export default StorePublicity;
