import React, { useState, useEffect, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Label,
  Form,
  Dropdown,
  Message,
  Button,
} from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import ReactFlagsSelect from 'react-flags-select';
import Img from 'components/common/Img';
import checkImageExists from 'helpers/checkImageExists';
import ImagePreviewModal from 'components/common/ImagePreviewModal';
import getUserInfo from 'redux/actions/users/getUserInfo';

import './Documents.scss';
import {
  idID,
  idPassport,
  idDriverLicence,
  idOther,
} from 'constants/general';

import 'react-flags-select/scss/react-flags-select.scss';
import DocPlaceholder from './DocPlaceholder';

const Documents = ({ userData, documents }) => {
  const {
    userDocs,
    onImageChange,
    onOptionsChange,
    submitHandler,
    expiryDate,
    setExpiryDate,
    setIssueDate,
    issueDate,
    errors,
    loading,
    iDCardInfo,
    onSelectFlag,
    imageUploadState,
    form,
  } = documents;

  const { data } = userData;

  const [open, setOpen] = useState(false);
  const [imagePreviewSrc, setImagePreviewSrc] = useState('');
  const [IdDocExist, setIdDocExist] = useState(false);
  const [PoRDocExist, setPoRDocExist] = useState(false);
  const [newIssueDate, setNewIssueDate] = useState(null);
  const [newExpiryDate, setNewExpiryDate] = useState(null);
  const [defaultCountryCode, setDefaultCountryCode] = useState('');

  let selectFlagRef = useRef();
  const dispatch = useDispatch();

  const {
    userData: { IDCardInfo },
  } = useSelector(({ user }) => user);

  const options = [
    {
      key: idID,
      text: global.translate('ID card', 1143),
      value: idID,
    },
    {
      key: idPassport,
      text: global.translate('Passport', 1142),
      value: idPassport,
    },
    {
      key: idDriverLicence,
      text: global.translate("Driver's license", 1144),
      value: idDriverLicence,
    },
    {
      key: idOther,
      text: global.translate('Other', 1409),
      value: idOther,
    },
  ];

  useEffect(() => {
    getUserInfo({})(dispatch);
  }, []);
  useEffect(() => {
    if (data) {
      checkImageExists(data.UserIDURL).then(data => {
        setIdDocExist(data);
      });
      checkImageExists(data.UserProofOfAddressURL).then(data => {
        setPoRDocExist(data);
      });
    }
  }, [data]);

  useEffect(() => {
    setExpiryDate(IDCardInfo?.ExpirationDate);
    setIssueDate(IDCardInfo?.IssueDate);
  }, [IDCardInfo]);

  useEffect(() => {
    if (defaultCountryCode) {
      selectFlagRef.updateSelected(defaultCountryCode);
    }
  }, [defaultCountryCode]);

  useEffect(() => {
    if (iDCardInfo?.IssueDate) {
      setNewIssueDate(moment(iDCardInfo?.IssueDate).format('l'));
    }
    if (iDCardInfo?.ExpirationDate) {
      setNewExpiryDate(
        moment(iDCardInfo?.ExpirationDate).format('l'),
      );
    }

    if (iDCardInfo?.IDCountryCode) {
      setDefaultCountryCode(iDCardInfo?.IDCountryCode.toUpperCase());
    }
  }, [iDCardInfo]);

  useEffect(() => {
    setNewExpiryDate(moment(expiryDate).format('l'));
  }, [expiryDate]);

  useEffect(() => {
    setNewIssueDate(moment(issueDate).format('l'));
  }, [issueDate]);

  const getDocStatus = doc => {
    switch (doc) {
      case '0':
        return {
          label: global.translate('Rejected', 1742),
          color: 'red',
        };

      case '1':
        return {
          label: global.translate('Verified', 1480),
          color: 'green',
        };

      case '2':
        return {
          label: global.translate('Pending', 1743),
          color: null,
        };

      default:
        return null;
    }
  };

  return (
    <div className="documents-container">
      <ImagePreviewModal
        open={open}
        setOpen={setOpen}
        src={imagePreviewSrc}
      />
      <div className="doc-title">
        <span>{global.translate('Official ID document', 890)}</span>
      </div>
      <span className="doc-sub-title">
        {global.translate(
          'This could be any government issued picture ID such as Passport, driving license, national ID card.',
          891,
        )}
      </span>
      <div className="doc-status">
        {IdDocExist && (
          <Label
            color={getDocStatus(data && data.IDVerified)?.color}
            className="status-label"
          >
            Status : {getDocStatus(data && data.IDVerified)?.label}
          </Label>
        )}
      </div>
      <div className="justify-content-space-between id-forms">
        <div className="document-image">
          <Img
            compress
            format="png"
            height="138px"
            width="235px"
            hasError
            src={
              (userDocs.UserIDURL && userDocs.UserIDURL.imageUrl) ||
              (data && data.UserIDURL)
            }
            onImageChange={onImageChange}
            name="UserIDURL"
            className="id-doc cursor-pointer"
            onClick={() => {
              setOpen(!open);
              setImagePreviewSrc(
                (userDocs.UserIDURL && userDocs.UserIDURL.imageUrl) ||
                  (data && data.UserIDURL),
              );
            }}
            alt={
              <DocPlaceholder
                name="UserIDURL"
                onChooseFile={onImageChange}
                loading={imageUploadState.loading}
              />
            }
            uploadIsLoading={
              userDocs.UserIDURL && imageUploadState.loading
            }
          />
        </div>

        <div className="id-doc-form">
          <Form size="mini">
            <div>
              <span>
                {' '}
                {global.translate('Select the ID type', 2200)}{' '}
              </span>
              <br />
              <Dropdown
                style={{ height: '42px', fontSize: '14px' }}
                fluid
                label={global.translate('Select the ID type', 2200)}
                options={options}
                selection
                placeholder="ID type"
                onChange={onOptionsChange}
                name="IDType"
                defaultValue={form?.IDType ?? iDCardInfo?.IDType}
                value={form?.IDType ?? iDCardInfo?.IDType}
              />
              {errors?.IDType && (
                <Message color="orange">{errors.IDType}</Message>
              )}
            </div>
            <br />
            <div>
              <Form.Input
                style={{
                  fontSize: '14px',
                }}
                fluid
                label={global.translate('ID Number', 2201)}
                placeholder="ID number"
                onChange={onOptionsChange}
                name="IDNumber"
                value={form?.IDNumber ?? iDCardInfo?.IDNumber}
              />
              {errors?.IDNumber && (
                <Message color="orange">{errors.IDNumber}</Message>
              )}
            </div>
            <br />
            <div>
              <span> {global.translate('Date of issue', 2202)}</span>
              <br />

              <DatePicker
                selected={IDCardInfo?.IssueDate ?? new Date()}
                onChange={date => setIssueDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                maxDate={new Date()}
                value={newIssueDate}
              />
            </div>

            <br />
            <div>
              <span>{global.translate('Expiration date', 2203)}</span>
              <br />
              <DatePicker
                selected={IDCardInfo?.ExpirationDate || new Date()}
                onChange={date => setExpiryDate(date)}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                minDate={issueDate}
                value={newExpiryDate}
              />
            </div>
            <br />

            <div>
              <span>
                {' '}
                {global.translate('Select Country', 2204)}{' '}
              </span>
              <br />
              <ReactFlagsSelect
                searchable
                onSelect={onSelectFlag}
                className="menu-flags"
                defaultCountry={
                  form?.IDCountryCode?.toUpperCase() ??
                  defaultCountryCode
                }
                ref={flagRef => {
                  selectFlagRef = flagRef;
                }}
                selected={form?.IDCountryCode?.toUpperCase()}
              />
              {errors?.IDCountryCode && (
                <Message color="orange">
                  {errors.IDCountryCode}
                </Message>
              )}
            </div>
            <div className="submit-button">
              <Button
                loading={loading}
                disabled={
                  loading ||
                  !!errors?.IDCountryCode ||
                  !!errors?.IDNumber ||
                  !!errors?.IDType
                }
                onClick={() => {
                  submitHandler();
                }}
                secondary
                color="grey"
              >
                {global.translate('Submit', 1695)}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

Documents.propTypes = {
  userData: PropTypes.instanceOf(Object),
  documents: PropTypes.instanceOf(Object),
};

Documents.defaultProps = {
  userData: {},
  documents: {},
};

export default Documents;
