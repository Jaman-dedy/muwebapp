import React, { useState, useCallback } from 'react';
import { Table, Button } from 'semantic-ui-react';
import ResetPINModal from 'components/common/ResetPINModal';

import './style.scss';

const SecurityTab = () => {
  const [openResetModal, setOpenResetModal] = useState(false);
  const [shouldResetPassword, setShouldResetPassword] = useState(
    false,
  );

  const closeResetModalHandler = useCallback(() => {
    setOpenResetModal(false);
  }, []);

  return (
    <div className="security-container">
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell className="security-header">
              {global.translate('Security')}
            </Table.HeaderCell>
            <Table.HeaderCell />
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell> {global.translate('Password')}</Table.Cell>
            <Table.Cell>
              {global.translate(
                "It's a good idea to use a strong password that you don't use elsewhere",
              )}
            </Table.Cell>
            <Table.Cell textAlign="right" className="security-action">
              <Button
                onClick={() => {
                  setOpenResetModal(true);
                  setShouldResetPassword(true);
                }}
                className="security-action"
              >
                {global.translate('Change')}
              </Button>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell> {global.translate('PIN Number')}</Table.Cell>
            <Table.Cell>
              {global.translate(
                'Provide a set 4 digits security code for verifying your identity when performing substantial operations such as transactions',
              )}
            </Table.Cell>
            <Table.Cell textAlign="right" className="security-action">
              <Button
                onClick={() => {
                  setShouldResetPassword(false);
                  setOpenResetModal(true);
                }}
                className="security-action"
              >
                {global.translate('Change')}
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <ResetPINModal
        open={openResetModal}
        setOpen={() => setOpenResetModal(true)}
        close={closeResetModalHandler}
        isOnResetPassword={shouldResetPassword}
      />
    </div>
  );
};

export default SecurityTab;
