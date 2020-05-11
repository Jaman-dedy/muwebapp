import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Menu,
  Segment,
  Sidebar,
  Button,
  Dropdown,
  Form,
} from 'semantic-ui-react';

const TableFilters = ({
  setVisible,
  contentChildren,
  visible,
  allSourceFilterOptions,
  allDestFilterOptions,
  handleFilterItems,
  setIsSearching,
  fromStoreVouchers,
}) => {
  const [form, setForm] = useState({});
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const onSubmit = () => {
    handleFilterItems(form);
  };

  const resetForm = () => {
    setForm({});
    setVisible(!visible);
    setIsSearching(false);
  };

  const shouldReset = () => {
    if (form.sourceWallet || form.targetAccount) {
      return true;
    }
    return false;
  };

  return (
    <Sidebar.Pushable as={Segment} className="filter-sidebar">
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        direction="right"
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width="wide"
      >
        <div className="inner-filter-options">
          {shouldReset() && (
            <Button
              basic
              size="mini"
              color="orange"
              onClick={() => {
                resetForm();
              }}
              content="Reset all"
            />
          )}
          <Form onSubmit={onSubmit}>
            <div className="first">
              <p className="title">
                {fromStoreVouchers
                  ? global.translate('Sender')
                  : global.translate('Source Account')}
              </p>
              <Dropdown
                selection
                name="sourceWallet"
                onChange={onChange}
                search
                value={form.sourceWallet || ''}
                placeholder={global.translate('Select')}
                options={
                  allSourceFilterOptions &&
                  allSourceFilterOptions.map(item => ({
                    key: item,
                    text: item,
                    value: item,
                  }))
                }
              />
            </div>
            <div className="second">
              <p className="title">
                {fromStoreVouchers
                  ? global.translate('Recipient')
                  : global.translate('Target Account')}
                {}
              </p>
              <Dropdown
                selection
                onChange={onChange}
                search
                name="targetAccount"
                placeholder={global.translate('Select')}
                value={form.targetAccount || ''}
                options={
                  allDestFilterOptions &&
                  allDestFilterOptions.map(item => ({
                    key: item,
                    text: item,
                    value: item,
                  }))
                }
              />
            </div>
            <Button
              type="submit"
              className="filter-go-button"
              color="orange"
              content={global.translate('Filter')}
            />
          </Form>
        </div>
      </Sidebar>

      <Sidebar.Pusher
        dimmed={visible}
        style={visible ? { minHeight: 250 } : { minHeight: 200 }}
      >
        {contentChildren}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

TableFilters.propTypes = {
  setVisible: PropTypes.func.isRequired,
  contentChildren: PropTypes.node.isRequired,
  visible: PropTypes.bool.isRequired,
  allSourceFilterOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
  allDestFilterOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
  handleFilterItems: PropTypes.func.isRequired,
  setIsSearching: PropTypes.func.isRequired,
  fromStoreVouchers: PropTypes.bool,
};

TableFilters.defaultProps = {
  fromStoreVouchers: false,
};
export default TableFilters;
