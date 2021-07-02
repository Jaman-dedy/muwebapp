import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  Image,
  Modal,
  Form,
  TextArea,
  Item,
  Button,
  Select,
  Segment,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import TagsInput from 'react-tagsinput';
import getCurrenciesList from 'redux/actions/users/getCurrenciesList';
import FilePickerList from 'components/Chat/FilePreviewer/PickedList';
import Pricing from 'components/PeerServices/Pricing';
import './style.scss';
import MEDIA_ADD_BTN from 'assets/images/marketplace/mediauploader.svg';
import Thumbnail from 'components/common/Thumbnail';
import PositionPickerModal from 'components/common/PositionPicker';
import {
  PEER_SERVICE_VIDEO,
  PEER_SERVICE_IMAGE,
} from 'constants/general';
import openCreateModal from 'redux/actions/peerServices/openCreateModal';
import ManageMediaModal from './ManageMedia';
import 'react-tagsinput/react-tagsinput.css';

const NewService = ({
  form,
  onChange,
  setForm,
  handleInputChange,
  pickPositionOpen,
  setPickPositionOpen,
  onSubmit,
  loading,
  onPricingFormChange,
  pricingForm,
  formIsInvalid,
  setPricingForm,
  prevFiles,
  fileToRemove,
  setFileToRemove,
  setFiles,
  setPrevFiles,
  categoryOptions,
  onFileRemoved,
  manageAllMedia,
  setManageAllMedia,
  tags,
  handleTagsChange,
}) => {
  const { userLocationData } = useSelector(({ user }) => user);
  const { loading: updateLoading } = useSelector(
    state => state.peerServices.updateService,
  );

  const dispatch = useDispatch();
  const [textareaHeight, setTextareaHeight] = useState(0);
  const { open, service, editMedia } = useSelector(
    state => state.peerServices.modal,
  );
  const {
    userData: { data },
  } = useSelector(state => state.user);

  const handleClose = () => {
    openCreateModal({
      open: false,
      service: null,
      editMedia: false,
    })(dispatch);
    setForm({});
  };

  useEffect(() => {
    if (service) {
      setForm({ ...form, ...service });
    }
  }, [service]);

  useEffect(() => {
    getCurrenciesList({
      CountryCode:
        data?.CountryCode?.toLowerCase() ||
        userLocationData?.CountryCode,
    })(dispatch);
  }, [data?.CountryCode, userLocationData?.CountryCode]);
  const getFileType = (MediaType, Extension) => {
    if (MediaType === PEER_SERVICE_VIDEO) {
      return 'video/mp4';
    }
    if (MediaType === PEER_SERVICE_IMAGE) {
      return 'image/png';
    }
    if (['png', 'jpeg', 'jpg'].includes(Extension.toLowerCase())) {
      return 'image/png';
    }
    return '';
  };

  useEffect(() => {
    if (editMedia) {
      if (service?.Media.length > 0) {
        const files = [];
        [...service.ExternalMedia, ...service.Media].map(
          ({
            MediaURL,
            MediaNumber,
            MediaType,
            Link,
            Extension,
            ...rest
          }) => {
            const currentFile = {
              file: {
                file: new File([''], MediaURL),
                preview: MediaURL || Link,
                old: true,
                id: (Math.random() * new Date()).toString(),
                type: getFileType(MediaType, Extension),
                MediaURL: MediaURL || Link,
                Extension,
                isExternal: !!Link,
                MediaNumber,
                MediaType,
                ...rest,
              },
              caption: '',
            };

            files.push(currentFile);
          },
        );
        setPrevFiles([...files]);
      }
    }
  }, [service]);

  useEffect(() => {
    if (editMedia) {
      setManageAllMedia(true);
    }
    return () => {
      setManageAllMedia(false);
    };
  }, [editMedia]);

  return (
    <>
      {manageAllMedia && (
        <ManageMediaModal
          prevFiles={prevFiles}
          fileToRemove={fileToRemove}
          setFileToRemove={setFileToRemove}
          setFiles={setFiles}
          setPrevFiles={setPrevFiles}
          categoryOptions={categoryOptions}
          onFileRemoved={onFileRemoved}
          open={manageAllMedia}
          onSubmit={
            editMedia && service
              ? () =>
                  onSubmit({
                    updateMedia: true,
                    updateDetails: false,
                  })
              : undefined
          }
          setManageAllMedia={setManageAllMedia}
        />
      )}
      {!editMedia && (
        <Modal
          open={open}
          closeOnDimmerClick={false}
          onClose={handleClose}
          closeIcon={!loading || updateLoading}
        >
          <Modal.Header id="user-header">
            {data && (
              <Thumbnail
                name={data.FirstName}
                secondName={data.LastName}
                circular
                avatar={data?.PictureURL}
                width={49}
                height={49}
              />
            )}
            {service && !editMedia && (
              <span>{global.translate('Update Service')}</span>
            )}

            {!service && (
              <span>{global.translate('Create Post')}</span>
            )}

            {editMedia && (
              <span>{global.translate('Edit Media')}</span>
            )}
          </Modal.Header>
          <Modal.Content>
            {editMedia && (
              <FilePickerList
                prevFiles={prevFiles}
                setPrevFiles={setPrevFiles}
                setFiles={setFiles}
                setFileToRemove={setFileToRemove}
                fileToRemove={fileToRemove}
                setVisible={() => {}}
                setSelectedFile={() => {}}
                selectedFile={{}}
                classes={{}}
                onFileRemoved={onFileRemoved}
                accept="video/*,image/*"
              />
            )}
            {!editMedia && (
              <div className="create-service-wrapper">
                <Header size="medium">
                  {global.translate('Details')}
                </Header>
                <Form loading={loading || updateLoading} id="form">
                  <Form.Group widths="equal">
                    <Form.Input
                      name="Title"
                      onChange={onChange}
                      value={form.Title || ''}
                      placeholder={global.translate('Name')}
                    />
                    <Form.Input
                      name="SubTitle"
                      onChange={onChange}
                      value={form.SubTitle || ''}
                      placeholder={global.translate('Subtitle')}
                    />
                  </Form.Group>
                  <TextArea
                    label={global.translate('Description')}
                    name="Body"
                    onChange={(_, { value }) => {
                      onChange(_, { name: 'Body', value });
                      const height = document.querySelector(
                        'textarea[name="Body"]',
                      )?.scrollHeight;
                      setTextareaHeight(height > 42 ? height : 42);
                    }}
                    style={{
                      minHeight: `${
                        form.Body ? textareaHeight || 42 : 42
                      }px`,
                    }}
                    value={form.Body || ''}
                    rows={1}
                    placeholder={global.translate('Description')}
                    fluid
                  />
                  {!service && (
                    <>
                      <hr />
                      <Header>{global.translate('Media')}</Header>
                      <Item.Description>
                        {global.translate(
                          'Upload Media that describe your product or service',
                          1872,
                        )}
                      </Item.Description>

                      <div className="peer-service-mediauploader">
                        <Segment
                          pointing
                          id="manage-btn"
                          onClick={() => setManageAllMedia(true)}
                        >
                          <Image src={MEDIA_ADD_BTN} width={55} />
                          <p className="manage-all-text">
                            {global.translate('Manage all media')}
                          </p>
                        </Segment>

                        <FilePickerList
                          prevFiles={prevFiles}
                          setPrevFiles={setPrevFiles}
                          setFiles={setFiles}
                          setFileToRemove={setFileToRemove}
                          fileToRemove={fileToRemove}
                          setVisible={() => {}}
                          setSelectedFile={() => {}}
                          selectedFile={{}}
                          classes={{}}
                          disableAdd
                          accept="video/*,image/*"
                        />
                      </div>

                      <hr />
                      <br />
                    </>
                  )}
                  <Header>{global.translate('More', 1566)}</Header>
                  <div className="category-tagOptions">
                    <Form.Input
                      name="Category"
                      control={Select}
                      className="form-input"
                      options={categoryOptions}
                      search
                      noResultsMessage={global.translate(
                        'The search returns no result',
                      )}
                      onChange={onChange}
                      value={form.Category || ''}
                      placeholder={global.translate('Category', 343)}
                    />
                    <div className="tags-area">
                      <TagsInput
                        value={tags}
                        name="Tags"
                        inputProps={{
                          placeholder: global.translate('Add Tags'),
                        }}
                        onChange={handleTagsChange}
                      />
                    </div>
                  </div>
                  <Form.Group widths="equal">
                    <PositionPickerModal
                      open={pickPositionOpen}
                      setOpen={setPickPositionOpen}
                      handleInputChange={handleInputChange}
                      defaultLatitude={0}
                      defaultLongitude={0}
                      modalHeader={
                        <Modal.Header id="user-header">
                          <Image circular src={{}} width={49} />
                          <span>
                            {global.translate('Pick Location', 1873)}
                          </span>
                        </Modal.Header>
                      }
                    />
                    <Form.Input
                      icon="map marker"
                      placeholder={global.translate('Address', 1210)}
                      name="Address"
                      value={form.Address || ''}
                      onClick={() => {
                        setPickPositionOpen(true);
                      }}
                    />
                    <Form.Input
                      name="LinkURL"
                      onChange={onChange}
                      value={form.LinkURL || ''}
                      placeholder={global.translate('External Link')}
                    />
                  </Form.Group>
                  {!service && (
                    <>
                      <Header>{global.translate('Add Price')}</Header>
                      <Pricing
                        onChange={onPricingFormChange}
                        form={pricingForm}
                        setForm={setPricingForm}
                      />
                    </>
                  )}{' '}
                  <Button
                    className="bg-red white"
                    disabled={
                      loading || formIsInvalid || updateLoading
                    }
                    onClick={() => {
                      if (service) {
                        onSubmit({
                          updateMedia: false,
                          updateDetails: true,
                        });
                      } else {
                        onSubmit({
                          updateMedia: false,
                          updateDetails: false,
                        });
                      }
                    }}
                    style={{
                      color: 'white',
                      backgroundColor: '#d0342f',
                    }}
                  >
                    {global.translate(
                      !service
                        ? global.translate('Publish Now')
                        : global.translate('Save'),
                    )}
                  </Button>
                </Form>
              </div>
            )}
          </Modal.Content>
        </Modal>
      )}
    </>
  );
};

NewService.propTypes = {
  form: PropTypes.objectOf(PropTypes.any).isRequired,
  onChange: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  pickPositionOpen: PropTypes.bool.isRequired,
  setPickPositionOpen: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  onPricingFormChange: PropTypes.func.isRequired,
  pricingForm: PropTypes.objectOf(PropTypes.any).isRequired,
  formIsInvalid: PropTypes.bool.isRequired,
  prevFiles: PropTypes.arrayOf(PropTypes.any).isRequired,
  fileToRemove: PropTypes.objectOf(PropTypes.any).isRequired,
  setFileToRemove: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired,
  setPrevFiles: PropTypes.func.isRequired,
  categoryOptions: PropTypes.arrayOf(PropTypes.any).isRequired,
  onFileRemoved: PropTypes.func.isRequired,
};

export default NewService;
