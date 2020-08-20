/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PinCodeForm from 'components/common/PinCodeForm';
import Message from 'components/common/Message';

import { restoreExecutePublicity } from 'redux/actions/publicity/executeCampaing';

const ConfirmExecutePublicity = ({
  open,
  setOpen,
  item,
  onPositiveConfirm,
  parentItem,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const { executePublicity: executedPublicity } = useSelector(
    state => state.publicity,
  );
  const {
    error: err,
    success,
    loading,
    Error,
    Description,
  } = executedPublicity;
  useEffect(() => {
    if (success) {
      history.push({
        pathname: '/publicity',
        state: {
          CampaignType: item.CampaignType,
          ItemID: item.ItemID,
          item: {
            ItemID: item.ItemID,
            Name: parentItem.Name,
          },
        },
      });
      restoreExecutePublicity()(dispatch);
    }

    if (Error) {
      setError(global.translate(Description));
      restoreExecutePublicity()(dispatch);
    }
  }, [executedPublicity]);

  const executePublicity = () => {
    const { digit0, digit1, digit2, digit3 } = form;
    const PIN = `${digit0}${digit1}${digit2}${digit3}`;
    if (PIN.length !== 4) {
      setError(
        global.translate('Please provide your PIN number.', 543),
      );
      return;
    }
    setError(null);
    onPositiveConfirm({ item, PIN });
  };
  return (
    <div>
      <Modal size="mini" open={open} onClose={() => setOpen(false)}>
        <Modal.Header className="modal-title">
          {global.translate('Would you like to proceed', 23)}?
        </Modal.Header>
        <Modal.Content centered className="main-content">
          <div className="description center-align bold">
            {item.Title}
          </div>
          <div className="description center-align">
            {item.SubTitle}
          </div>

          <div className="pin-number-inputs">
            <PinCodeForm
              label={global.translate(
                'Confirm  your PIN number',
                941,
              )}
              onChange={onChange}
              name="pin"
              value={form.pin || ''}
            />
          </div>

          {error && <Message message={error} />}
          {err && (
            <Message
              message={err.error ? err.error : err.Description}
            />
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button
            disabled={loading}
            negative
            onClick={() => setOpen(false)}
          >
            {global.translate('Cancel', 86)}
          </Button>
          <Button
            disabled={loading}
            loading={loading}
            positive
            onClick={() => executePublicity()}
          >
            {global.translate('Execute', 1557)}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
ConfirmExecutePublicity.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.objectOf(PropTypes.any).isRequired,
  parentItem: PropTypes.objectOf(PropTypes.any),
  onPositiveConfirm: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

ConfirmExecutePublicity.defaultProps = {
  parentItem: {},
  open: false,
};
export default ConfirmExecutePublicity;
