import React, { useState, useEffect } from 'react';
import { Modal, Form, TextArea, Button } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import { toast } from 'react-toastify';
import openReportServiceOrComment from 'redux/actions/peerServices/openReportServiceOrComment';
import reportServiceOrComment, {
  clearReportServiceOrComment,
} from 'redux/actions/peerServices/reportServiceOrComment';

const ReportModal = () => {
  const dispatch = useDispatch();
  const { open, type, service } = useSelector(
    state => state.peerServices.reportModal,
  );
  const { loading, data: reportData } = useSelector(
    state => state.peerServices.reportServiceOrComment,
  );

  const [form, setForm] = useState({});

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const handleClose = () => {
    openReportServiceOrComment({
      open: false,
      service: null,
      type: null,
    })(dispatch);

    setForm({});
  };

  const formIsInvalid = !form.Body || form.Body?.trim().length < 9;

  const onSubmit = () => {
    reportServiceOrComment({
      ItemID: service.itemId,
      ItemNumber: service.itemNumber || '0',
      ItemType: service.itemType || 'Service',
      Comment: form.Body || '',
    })(dispatch);
  };

  useEffect(() => {
    if (reportData) {
      toast.success(reportData.Description);
      clearReportServiceOrComment()(dispatch);
      handleClose();
    }
  }, [reportData]);

  return (
    <Modal
      open={open}
      className="report-modal"
      onClose={handleClose}
      closeOnDimmerClick={false}
      closeIcon={!loading}
    >
      <Modal.Header id="user-header">
        <span>
          {global.translate('Report')} {type}
        </span>
      </Modal.Header>
      <Modal.Content>
        <Form>
          <TextArea
            label={global.translate('Description')}
            name="Body"
            onChange={onChange}
            value={form.Body || ''}
            rows={2}
            id="report-peer-textarea"
            placeholder={global.translate(
              'Enter a description  (minimum 10 characters)',
            )}
            fluid
          />

          <Button
            onClick={onSubmit}
            disabled={loading || formIsInvalid}
            loading={loading}
            className="bg-orange"
            style={{ color: 'white', marginTop: 5 }}
          >
            {loading
              ? global.translate('Please wait...')
              : global.translate('Report')}
          </Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};

ReportModal.propTypes = {};

export default ReportModal;
