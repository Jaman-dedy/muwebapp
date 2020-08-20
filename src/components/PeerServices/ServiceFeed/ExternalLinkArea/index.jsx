/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Image, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import openInNewTab from 'helpers/openInNewTab';
import isURL from 'utils/isURL';

const ExternalLinkArea = React.memo(
  ({ service }) => {
    const { data, serviceId, loading } = useSelector(
      ({ peerServices: { serviceLinkMetaData } }) =>
        serviceLinkMetaData,
    );

    if (serviceId !== service.ServiceID) {
      return <></>;
    }
    return (
      <div
        className={`preview-container  cursor-pointer ${
          loading ? 'deleting' : ''
        }`}
        onClick={() => openInNewTab(data?.url)}
      >
        <div className="left">
          <div className="favicon">
            {isURL(data?.favicon) ? (
              <Image src={data?.favicon} width={49} />
            ) : (
              <Icon name="linkify" size="large" />
            )}
          </div>
        </div>

        <div className="right">
          <div>
            <p className="title">{data?.title}</p>
          </div>

          <div>
            <p className="description">{data?.description}</p>
          </div>

          <div className="link">
            <Icon name="linkify" />
            <span>{data?.url}</span>
          </div>
        </div>
      </div>
    );
  },
  () => false,
);

ExternalLinkArea.propTypes = {
  service: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default ExternalLinkArea;
