import React, { useState, useRef } from 'react';
import {
  Button,
  Icon,
  Modal,
  Radio,
  Divider,
} from 'semantic-ui-react';
import { CSVLink } from 'react-csv';
import './ExportCSV.scss';
import capitalize from 'utils/capitalize';
import camelToUnderscore from 'utils/camelToUnderscore';
import ToggleSwitch from '../ToggleButton';

const getLabel = key =>
  capitalize(camelToUnderscore(key).replace(/_/g, ' '));

const ExportCSV = ({
  data = [],
  fileName = 'file.csv',
  customHeaders,
  excludeHeaders,
  disabled = false,
}) => {
  const headers = useRef([]);
  const csvData = useRef([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedHeaders, setSelectedHeaders] = useState([]);
  const [CSVHeaders, setCSVHeaders] = useState([]);
  const [dataToExport, setDataToExport] = useState([]);

  csvData.current = (Array.isArray(data) ? data : []).map(item => {
    Object.keys(item).forEach(key => {
      if (
        excludeHeaders
          ?.map(header => header.toLowerCase())
          ?.includes(key.toLowerCase())
      ) {
        return;
      }
      const label = global.translate(getLabel(key));
      const newHeader = { label, key, children: [] };

      if (Array.isArray(item[key])) {
        item[key].forEach(subItem => {
          Object.keys(subItem).forEach((subKey, index) => {
            newHeader.children = [
              ...newHeader.children,
              {
                label: global.translate(getLabel(subKey)),
                key: subKey,
                checked: index === 0,
              },
            ];
          });
        });
      }

      headers.current = !headers.current.find(
        header => header.label === label,
      )
        ? [...headers.current, newHeader]
        : headers.current;
    });
    return item;
  });

  const setInitialDataToExport = () => {
    const initialDataToExport = JSON.parse(
      JSON.stringify(csvData.current),
    ).map(item => {
      Object.keys(item).forEach(key => {
        let value = '';
        if (Array.isArray(item[key])) {
          item[key].forEach(subItem => {
            if (subItem.name) {
              value += `, ${subItem.name}`;
            }
          });
          item[key] = value.replace(',', '') || item[key];
        }
      });
      return item;
    });
    setDataToExport(initialDataToExport);
  };

  const handleSelect = ({ key, label, checked }) => {
    setSelectedHeaders(
      checked
        ? [...selectedHeaders, { key, label }]
        : selectedHeaders.filter(
            header => String(header.key) !== String(key),
          ),
    );
  };

  const handleChildrenSelect = ({ parentKey, childKey }) => {
    const data = JSON.parse(JSON.stringify(csvData.current)).map(
      item => {
        let value = '';
        if (Array.isArray(item[parentKey])) {
          item[parentKey].forEach(subItem => {
            value += `, ${subItem[childKey]}`;
          });
          item[parentKey] = value.replace(',', '') || item[parentKey];
        }
        return item;
      },
    );

    setCSVHeaders(
      CSVHeaders.map(item => {
        if (item.key === parentKey) {
          item.children = (Array.isArray(item.children)
            ? item.children
            : []
          ).map(subItem => {
            subItem.checked = subItem.key === childKey;
            return subItem;
          });
        }
        return item;
      }),
    );

    setDataToExport(data);
  };

  const exportButton = (
    <Button
      style={{ width: '167px' }}
      className="btn-export-trigger dark-blue-important text-white-important"
      icon
      labelPosition="right"
      disabled={disabled}
      onClick={() => {
        if (disabled) {
          return false;
        }
        setOpenModal(true);
        setCSVHeaders(headers.current);
        setSelectedHeaders(headers.current);
        setInitialDataToExport();
      }}
    >
      {global.translate('Export to CSV')}
      <Icon name="external alternate" />
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
          {global.translate('Export to CSV')}
        </Modal.Header>
        <Modal.Content scrolling>
          {(CSVHeaders || []).map(({ key, label, children }) => (
            <div className="field-to-export" key={String(key)}>
              <ToggleSwitch
                id={String(key)}
                name={String(key)}
                toggle
                value={String(key)}
                checked={
                  !!selectedHeaders.find(header => header.key === key)
                }
                onChange={checked => {
                  handleSelect({
                    key: String(key),
                    label: String(label),
                    checked,
                  });
                }}
              />
              <span className="itemLabel">{label}</span>
              {Array.isArray(children) && children.length ? (
                <div className="radio">
                  {children.map(item => (
                    <div>
                      <Radio
                        label={item.label}
                        name={String(key)}
                        value={item.key}
                        checked={Boolean(item.checked)}
                        onChange={() =>
                          handleChildrenSelect({
                            parentKey: String(key),
                            childKey: item.key,
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : null}
              <Divider />
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
            headers={customHeaders || selectedHeaders}
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

export default ExportCSV;
