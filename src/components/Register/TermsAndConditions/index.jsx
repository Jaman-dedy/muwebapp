/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import './style.scss';

const TermsAndConditions = ({
  open,
  setOpen,
  handleTermsAndCondition,
}) => {
  const {
    language: { preferred },
  } = useSelector(({ user }) => user);
  return (
    <Modal onOpen={() => setOpen(true)} open={open} size="small">
      <Modal.Content scrolling>
        <iframe
          src={`https://2u.money/terms-and-conditions?view=simple&platform=M2U&lang=${
            preferred === 'fr' ? 'fr' : 'en'
          }`}
          frameBorder="0"
        />
      </Modal.Content>
      <Modal.Actions>
        <button
          type="button"
          className="btn-cancel"
          onClick={() => setOpen(false)}
        >
          {global.translate('Cancel')}
        </button>
        <button
          type="button"
          className="btn-agree"
          onClick={handleTermsAndCondition}
        >
          {global.translate('I agree')}
        </button>
      </Modal.Actions>
    </Modal>
  );
};

TermsAndConditions.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleTermsAndCondition: PropTypes.func,
};
TermsAndConditions.defaultProps = {
  open: false,
  setOpen: () => {},
  handleTermsAndCondition: () => {},
};

export default TermsAndConditions;
