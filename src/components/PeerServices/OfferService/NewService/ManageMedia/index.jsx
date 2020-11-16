import React, { useState } from 'react';
import {
  Modal,
  Tab,
  Button,
  Form,
  Input,
  Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
import { toast } from 'react-toastify';
import Thumbnail from 'components/common/Thumbnail';
import './style.scss';
import FilePickerList from 'components/Chat/FilePreviewer/PickedList';
import LoaderComponent from 'components/common/Loader';
import openCreateModal from 'redux/actions/peerServices/openCreateModal';
import fetchExternalMedia from './fetchExternalMedia';

const ManageMediaModal = ({
  open,
  setManageAllMedia,
  prevFiles,
  fileToRemove,
  setFileToRemove,
  setFiles,
  setPrevFiles,
  onFileRemoved,
  onSubmit,
}) => {
  const {
    userData: { data },
  } = useSelector(state => state.user);

  const {
    fetching,
    error,
    resource,
    fetchFileURL,
  } = fetchExternalMedia();
  const [hasError, setHasError] = useState(false);
  const { editMedia } = useSelector(
    state => state.peerServices.modal,
  );
  const dispatch = useDispatch();
  const [form, setForm] = useState({});
  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const { loading: updateLoading } = useSelector(
    state => state.peerServices.updateService,
  );

  const onFileFetched = (file, type = 'image/') => {
    const currentFile = {
      file: {
        file: new File([''], file, {
          type,
          preview: file,
        }),
        preview: file,
        external: true,
        id: (Math.random() * new Date()).toString(),
        type,
      },
      caption: '',
    };
    setPrevFiles([currentFile.file, ...prevFiles]);
    toast.success(global.translate('File added successfully'));
    setForm({});
  };

  const handleFileLookUpImage = () => {
    if (form.image) {
      fetchFileURL(
        { file: form.image, type: 'image/' },
        onFileFetched,
      );
    } else {
      toast.error(
        global.translate('Please enter a valid image source URL'),
      );
    }
  };

  const handleVideoFileLookUpImage = () => {
    if (form.video) {
      fetchFileURL(
        { file: form.video, type: 'video/' },
        onFileFetched,
      );
    } else {
      toast.error(
        global.translate('Please enter a valid video source URL'),
      );
    }
  };

  const onClose = (options = {}) => {
    if (options.clearMedia) {
      setPrevFiles([]);
    }
    setManageAllMedia(false);

    if (editMedia) {
      openCreateModal({
        open: false,
        service: null,
        editMedia: false,
      })(dispatch);
    }
  };

  const panes = [
    {
      menuItem: {
        key: 'All media',
        icon: 'folder',
        content: global.translate('All media'),
      },
      render: () => (
        <Tab.Pane>
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
            accept="image/jpeg, image/png"
            disableAdd
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: {
        key: 'Upload images',
        icon: 'image outline',
        content: global.translate('Upload images'),
      },
      render: () => (
        <Tab.Pane>
          <FilePickerList
            prevFiles={prevFiles.filter(item =>
              item.file?.type.startsWith('image/'),
            )}
            setPrevFiles={setPrevFiles}
            setFiles={setFiles}
            setFileToRemove={setFileToRemove}
            fileToRemove={fileToRemove}
            setVisible={() => {}}
            setSelectedFile={() => {}}
            selectedFile={{}}
            classes={{}}
            onFileRemoved={onFileRemoved}
            accept="image/jpeg, image/png"
          />
        </Tab.Pane>
      ),
    },

    {
      menuItem: {
        key: 'Add photo by URL',
        icon: 'linkify',
        content: global.translate('Add image URL here'),
      },
      render: () => (
        <Tab.Pane>
          <div>
            <Form>
              <Form.Group>
                <Form.Field width="13" error={error || false}>
                  <Input
                    type="url"
                    name="image"
                    value={form.image || ''}
                    onChange={onChange}
                    placeholder={global.translate(
                      'Add image url here',
                    )}
                  />
                </Form.Field>

                <Form.Field width="3">
                  <Button
                    disabled={!form.image || form.image?.length < 5}
                    onClick={handleFileLookUpImage}
                    className="bg-orange white"
                    style={{ color: 'white' }}
                  >
                    {global.translate('Insert image')}
                  </Button>
                </Form.Field>
              </Form.Group>
            </Form>

            {fetching && <LoaderComponent />}

            {resource.type === 'image' && (
              <Image
                style={{
                  objectFit: 'cover',
                  maxHeight: '300px',
                }}
                src={resource.file}
                fluid
              />
            )}
          </div>
        </Tab.Pane>
      ),
    },

    {
      menuItem: {
        key: 'Upload video',
        icon: 'film',
        content: global.translate('Upload video'),
      },
      render: () => (
        <Tab.Pane>
          <FilePickerList
            prevFiles={prevFiles.filter(item =>
              item.file?.type.startsWith('video/'),
            )}
            setPrevFiles={setPrevFiles}
            setFiles={setFiles}
            setFileToRemove={setFileToRemove}
            fileToRemove={fileToRemove}
            setVisible={() => {}}
            setSelectedFile={() => {}}
            selectedFile={{}}
            classes={{}}
            onFileRemoved={onFileRemoved}
            accept="video/*"
          />
        </Tab.Pane>
      ),
    },

    {
      menuItem: {
        key: 'Add video by URL',
        icon: 'linkify',
        content: global.translate('Add video by URL'),
      },
      render: () => (
        <Tab.Pane>
          {' '}
          <div>
            <Form>
              <Form.Group>
                <Form.Field width="13">
                  <Input
                    type="url"
                    name="video"
                    value={form.video || ''}
                    onChange={onChange}
                    placeholder={global.translate(
                      'Add video URL here',
                      1904,
                    )}
                  />
                </Form.Field>

                <Form.Field width="3">
                  <Button
                    disabled={!form.video || form.video?.length < 5}
                    onClick={() => handleVideoFileLookUpImage()}
                    className="bg-orange white"
                    style={{ color: 'white' }}
                  >
                    {global.translate('Insert video', 1903)}
                  </Button>
                </Form.Field>
              </Form.Group>
            </Form>
            {fetching && <LoaderComponent />}

            {resource.type === 'video' && (
              <ReactPlayer
                className="video-player-picker"
                controls
                url={[resource.file]}
              />
            )}
          </div>
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Modal closeIcon={!updateLoading} open={open} onClose={onClose}>
      <Modal.Header id="user-header">
        {data && (
          <Thumbnail
            name={data.FirstName}
            secondName={data.LastName}
            circular
            avatar={data?.PictureURL}
            width={49}
            height={49}
            setHasError={setHasError}
          />
        )}
        <span>{global.translate('Manage images and videos')}</span>
      </Modal.Header>

      <Modal.Content id="manage-media-content">
        <Tab panes={panes} />
      </Modal.Content>

      <Modal.Actions>
        <Button
          disabled={updateLoading}
          onClick={() => onClose({ clearMedia: true })}
        >
          {global.translate('Cancel')}
        </Button>

        <Button
          loading={updateLoading}
          disabled={updateLoading}
          onClick={onSubmit || onClose}
          className="bg-orange white"
          style={{ color: 'white' }}
        >
          {global.translate('Done')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

ManageMediaModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setManageAllMedia: PropTypes.func.isRequired,
  prevFiles: PropTypes.arrayOf(PropTypes.any).isRequired,
  fileToRemove: PropTypes.objectOf(PropTypes.any).isRequired,
  setFileToRemove: PropTypes.func.isRequired,
  setFiles: PropTypes.func.isRequired,
  setPrevFiles: PropTypes.func.isRequired,
  onFileRemoved: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
export default ManageMediaModal;
