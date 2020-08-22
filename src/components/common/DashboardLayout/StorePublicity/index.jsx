/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Image, Modal, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import updateCampaignViewsCount from 'redux/actions/publicity/updateCampaignViewsCount';

import './StorePublicity.scss';

const StorePublicity = ({ open, setOpen, publicityData }) => {
  const dispatch = useDispatch();
  const { Link, AdImageURL, Title, SubTitle, Detail } = publicityData;

  useEffect(() => {
    if (open) {
      updateCampaignViewsCount({
        CampaignID: publicityData.CampaignID,
      })(dispatch);
    }
  }, [open]);

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
                <Button>{global.translate('More Info', 2003)}</Button>
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
