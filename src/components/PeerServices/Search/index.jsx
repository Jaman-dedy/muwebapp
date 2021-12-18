import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import EditPricingModal from 'components/PeerServices/OfferService/NewService/PricingModal';
import { useSelector, useDispatch } from 'react-redux';
import openEditPricingModal from 'redux/actions/peerServices/openEditPricingModal';

const SearchView = ({ style, title, hideSearch }) => {
  const dispatch = useDispatch();
  const { open, service } = useSelector(
    state => state.peerServices.editPricingModal,
  );

  const handleEditClose = () => {
    openEditPricingModal({ open: false, service: null })(dispatch);
  };

  return (
    <>
      <EditPricingModal
        service={service}
        open={open}
        onClose={handleEditClose}
      />
      <div
        data-after={
          hideSearch
            ? title || global.translate('Offer a service')
            : global.translate(
                'Find anything you want near you',
                1787,
              )
        }
        className={
          hideSearch
            ? 'no-search-view-wrapper'
            : 'search-view-wrapper'
        }
        style={{ ...style, ...{ paddingTop: hideSearch ? 35 : 0 } }}
      />
    </>
  );
};
SearchView.propTypes = {
  style: PropTypes.instanceOf(PropTypes.object),
  hideSearch: PropTypes.bool,
  title: PropTypes.string,
};

SearchView.defaultProps = {
  style: {},
  hideSearch: false,
  title: null,
};
export default SearchView;
