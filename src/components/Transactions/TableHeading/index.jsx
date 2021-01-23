import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button } from 'semantic-ui-react';
import CustomDropDown from '../CustomDropDown';
import ActionFilter from '../SearchFilter';
import FilterWallet from '../FilterWallet';
import DatePickerSelect from '../DatePickerSelect';
import './style.scss';

const TableHeading = ({
  walletList,
  fetchAllTransaction,
  setCurrentOption,
  currentOption,
  form,
  setForm,
  getTransactions,
  setSourceWallet,
  setTargetWallet,
  targetWallet,
  sourceWallet,
  onFilterWallet,
  allTransactions,
  setAllTransactionData,
}) => {
  return (
    <div className="table-heading">
      <CustomDropDown
        walletList={walletList}
        fetchAllTransaction={fetchAllTransaction}
        setCurrentOption={setCurrentOption}
        currentOption={currentOption}
      />
      <DatePickerSelect
        form={form}
        setForm={setForm}
        getTransactions={getTransactions}
      />
      <FilterWallet
        walletList={walletList}
        setTargetWallet={setTargetWallet}
        setSourceWallet={setSourceWallet}
        targetWallet={targetWallet}
        sourceWallet={sourceWallet}
        onFilterWallet={onFilterWallet}
        fetchAllTransaction={fetchAllTransaction}
        allTransactionData={allTransactions}
      />
      <ActionFilter
        search
        icon="search"
        setAllTransactionData={setAllTransactionData}
        allTransactionData={allTransactions}
      />
      <div className="refresh-button">
        <Button icon onClick={fetchAllTransaction}>
          <Icon name="refresh" />
        </Button>
      </div>
    </div>
  );
};

TableHeading.propTypes = {
  walletList: PropTypes.arrayOf(PropTypes.any),
  fetchAllTransaction: PropTypes.func,
  setCurrentOption: PropTypes.func,
  currentOption: PropTypes.objectOf(PropTypes.any),
  form: PropTypes.func,
  setForm: PropTypes.func,
  getTransactions: PropTypes.func,
  setSourceWallet: PropTypes.func,
  setTargetWallet: PropTypes.func,
  targetWallet: PropTypes.objectOf(PropTypes.any),
  sourceWallet: PropTypes.objectOf(PropTypes.any),
  onFilterWallet: PropTypes.func,
  allTransactions: PropTypes.arrayOf(PropTypes.any),
  setAllTransactionData: PropTypes.func,
};
TableHeading.defaultProps = {
  walletList: [],
  fetchAllTransaction: () => {},
  setCurrentOption: () => {},
  currentOption: {},
  form: () => {},
  setForm: () => {},
  getTransactions: () => {},
  setSourceWallet: () => {},
  setTargetWallet: () => {},
  targetWallet: {},
  sourceWallet: {},
  onFilterWallet: () => {},
  allTransactions: [],
  setAllTransactionData: () => {},
};

export default TableHeading;
