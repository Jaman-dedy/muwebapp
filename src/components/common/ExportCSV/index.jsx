import React, { useState, useEffect, useCallback } from 'react';
import {
  Button,
  Icon,
  Modal,
  Checkbox,
  Image,
} from 'semantic-ui-react';
import { CSVLink } from 'react-csv';
import PropTypes from 'prop-types';
import './ExportCSV.scss';
import capitalize from 'utils/capitalize';
import camelToUnderscore from 'utils/camelToUnderscore';
import ExportCsv from 'assets/images/transactions/export-csv.svg';
import ToggleSwitch from '../ToggleButton';

const getLabel = key =>
  capitalize(camelToUnderscore(key).replace(/_/g, ' '));

const ExportCSV = ({
  data = [],
  fileName = 'file.csv',
  disabled = false,
  excludeHeaders,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [CSVData, setCSVData] = useState([]);
  const [dataToExport, setDataToExport] = useState([]);
  const [dataHeaders, setDataHeaders] = useState([]);
  const [labelForm, setLabelForm] = useState([]);
  const [enableAll, setEnableAll] = useState(true);

  // INITIALIZE DATA TO EXPORT
  useEffect(() => {
    if (Array.isArray(data) && data[0]?.Data?.length) {
      const [transactionsList] = data;
      const { Data } = transactionsList;

      // get headers from data keys
      const headerLabels = Object.keys(Data[0]);
      setDataHeaders(
        headerLabels.filter(label => !excludeHeaders.includes(label)),
      );

      // set data to display from data object of transaction list
      setCSVData(Data);

      // initialize the labels form (default to all data headers) excluding excludeHeaders
      const headersObject = headerLabels
        .filter(label => !excludeHeaders.includes(label))
        .map(label => {
          return {
            label,
            checked: true,
          };
        });

      // update the labels form state
      setLabelForm(headersObject);
    }
  }, [data, enableAll]);

  const getCheckedLabels = useCallback(() => {
    return labelForm.filter(
      label => label.checked && !excludeHeaders.includes(label.label),
    );
  }, [labelForm]);

  // Update the list of csv headers whenever it is checked or unchecked
  const handleSelected = (index, checked) => {
    // update labels
    const formFields = [...labelForm];
    let formField = formFields[index];
    formField = { ...formField, checked };
    formFields[index] = formField;
    setLabelForm(formFields);
  };

  // update table data whenever there is a change in the csv table headers (checked || unchecked)
  useEffect(() => {
    let labelsToDisplay = getCheckedLabels();
    labelsToDisplay = labelsToDisplay.map(({ label }) => label);
    setDataHeaders(labelsToDisplay);
  }, [labelForm, getCheckedLabels]);

  useEffect(() => {
    if (
      Array.isArray(CSVData) &&
      CSVData.length &&
      dataHeaders.length
    ) {
      const keysToOmit = Object.keys(CSVData[0]).filter(
        key => !dataHeaders.includes(key),
      );
      let newData = [...CSVData];

      // remove unwanted keys
      newData = newData.map(dataRow => {
        const dataRowClone = { ...dataRow };
        keysToOmit
          .concat(excludeHeaders)
          .forEach(key => delete dataRowClone[key]);
        return dataRowClone;
      });

      setDataToExport(newData);
    }
  }, [dataHeaders, CSVData]);

  const exportButton = (
    <Button
      disabled={disabled}
      onClick={() => {
        if (disabled) {
          return false;
        }
        setOpenModal(true);
      }}
    >
      <Image src={ExportCsv} />
      {global.translate('Export transactions to CSV')}
    </Button>
  );

  return (
    <div className="ExportCSV">
      <Modal
        trigger={exportButton}
        size="mini"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>
          {global.translate('Export transactions to CSV')}
        </Modal.Header>
        <Modal.Content scrolling>
          <div className="data-to-export">
            <ToggleSwitch
              id="data"
              name="data"
              toggle
              value="data"
              checked={enableAll}
              onChange={checked => {
                setEnableAll(checked);
              }}
            />
            <span className="itemLabel">
              {global.translate('All data')}
            </span>
          </div>
          {labelForm.map(({ label, checked }, index) => (
            <div className="field-to-export">
              <Checkbox
                disabled={enableAll}
                label={label}
                checked={enableAll ? true : checked}
                onChange={(_, { checked }) => {
                  handleSelected(index, checked);
                }}
              />
            </div>
          ))}
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            color="red"
            onClick={() => setOpenModal(false)}
          >
            {global.translate('Close')}
          </Button>
          <CSVLink
            data={dataToExport}
            filename={fileName}
            headers={dataHeaders.map(label => ({
              label: getLabel(label),
              key: label,
            }))}
          >
            <Button
              className="dark-blue-important text-white-important"
              onClick={() => setOpenModal(false)}
              icon
            >
              {global.translate('Export')}{' '}
              <Icon name="external alternate" />
            </Button>
          </CSVLink>
        </Modal.Actions>
      </Modal>
    </div>
  );
};
ExportCSV.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  fileName: PropTypes.string,
  excludeHeaders: PropTypes.arrayOf(PropTypes.any),
  disabled: PropTypes.bool,
};
ExportCSV.defaultProps = {
  data: [],
  fileName: '',
  excludeHeaders: [],
  disabled: false,
};

export default ExportCSV;
