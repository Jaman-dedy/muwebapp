import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import createPeerService, {
  uploadPeerServicesMediaStart,
} from 'redux/actions/peerServices/createPeerService';
import NewService from 'components/PeerServices/OfferService/NewService';
import saveTemporarily from 'helpers/uploadImages/saveTemporarily';
import getCategories from 'redux/actions/peerServices/getCategories';
import { clearDeletePeerService } from 'redux/actions/peerServices/deletePeerService';
import updateService from 'redux/actions/peerServices/updateService';
import closeCreateModal from 'redux/actions/peerServices/closeCreateModal';
import openEditPricingModal from 'redux/actions/peerServices/openEditPricingModal';
import loadVideo from 'utils/loadVideo';
import {
  UPDATE_FILE,
  DELETE_FILE,
  CREATE_FILE,
  PEER_SERVICE_IMAGE,
  PEER_SERVICE_VIDEO,
} from 'constants/general';
import openCreateModal from 'redux/actions/peerServices/openCreateModal';

const NewServiceContainer = () => {
  const [form, setForm] = useState({});

  const [tags, setTags] = useState([]);

  const [pricingForm, setPricingForm] = useState([
    {
      Currency: '',
      Price: '',
      Title: '',
    },
  ]);

  const [pricingFormErrors, setPricingFormErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [filesToDelete, setFilesToDelete] = useState([]);
  const [externalFilesToDelete, setExternalFilesToDelete] = useState(
    [],
  );
  const [manageAllMedia, setManageAllMedia] = useState(false);
  const [files, setFiles] = useState(null);
  const [prevFiles, setPrevFiles] = useState([]);
  const [fileToRemove, setFileToRemove] = useState(null);

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };
  const onPricingFormChange = (index, event) => {
    const values = [...pricingForm];
    if (event.target.name === 'Title') {
      values[index].Title = event.target.value;
    } else if (event.target.name === 'Price') {
      values[index].Price = event.target.value.toString();
    } else {
      values[index].Currency = event.target.value;
    }

    setPricingForm(values);
  };

  const [pickPositionOpen, setPickPositionOpen] = useState(false);
  const { loading, data, error } = useSelector(
    state => state.peerServices.createService,
  );
  const { data: user } = useSelector(state => state.user.userData);
  const { data: updateServiceData } = useSelector(
    state => state.peerServices.updateService,
  );

  const { service, editMedia } = useSelector(
    state => state.peerServices.modal,
  );

  const handleTagsChange = tags => {
    setTags(tags);
  };

  const validatePricing = () => {
    pricingForm.forEach((item, index) => {
      if (item.Title === '' || item.Price === '') {
        pricingForm.splice(index, pricingForm.length);
      }
    });

    return true;
  };

  const filesToUpload = !editMedia
    ? prevFiles.filter(item => !item.external)
    : prevFiles.filter(item => !item.file.old && !item.external);

  const ExternalMedia = prevFiles
    .filter(file => file.external)
    .map(({ preview, type }) => ({
      MediaType: type.startsWith('image')
        ? PEER_SERVICE_IMAGE
        : PEER_SERVICE_VIDEO,
      Extension: '',
      MediaURL: preview,
      Action: CREATE_FILE,
      MediaNumber: '',
    }));

  const handleInputChange = async ({ target: { name, value } }) => {
    if (name === 'position') {
      return setForm({
        ...form,
        Latitude: value.Latitude?.toString(),
        Longitude: value.Longitude?.toString(),
        CountryCode: value.CountryCode?.toLowerCase(),
        City: value?.City,
        PhoneNumberCode: value?.PhoneNumberCode,
      });
    }
    setForm({ ...form, [name]: value });
  };

  const onFileRemoved = file => {
    if (!file.file.isExternal) {
      setFilesToDelete([...filesToDelete, file.file]);
    } else {
      setExternalFilesToDelete([...externalFilesToDelete, file.file]);
    }
  };

  const updateFileList = async files => {
    if (files) {
      const currentFile = { file: files[0], ...{ caption: '' } };
      if (currentFile.file.type.startsWith('video')) {
        const video = await loadVideo(currentFile.file);
        const size = parseFloat(currentFile.file.size / 1024).toFixed(
          0,
        );
        if (size > 100000) {
          toast.error(
            global.translate(
              'Invalid video, Video shouldn’t be more than 100 megabytes in size',
            ),
          );
          return;
        }

        if (video?.duration > 300) {
          toast.error(
            global.translate(
              'Invalid video, Video shouldn’t be more than 5 minutes',
              1851,
            ),
          );
        } else {
          setPrevFiles([currentFile, ...prevFiles]);
        }
      } else {
        setPrevFiles([currentFile, ...prevFiles]);
      }
    }
  };

  const getUpdatedExternalMediaFiles = () => {
    const updated = [
      ...ExternalMedia,
      ...externalFilesToDelete.map(
        ({ preview, MediaNumber, MediaType }) => ({
          Action: DELETE_FILE,
          Extension: '',
          MediaURL: preview,
          MediaType,
          MediaNumber,
        }),
      ),
    ];
    return updated;
  };

  const onSubmit = async (
    options = {
      updateMedia: false,
      updateDetails: false,
    },
  ) => {
    let Media = [];
    if (!form.Category) {
      toast.error(global.translate('Please choose a category', 1849));
      return;
    }

    if (!form.Address) {
      toast.error(global.translate('Please choose an address', 1850));
      return;
    }

    const { updateDetails, updateMedia } = options;

    const hasFiles =
      filesToUpload.length > 0 || filesToDelete.length > 0;

    const newMedia = [];
    const existingMedia = [];

    const newExternalMedia = [];
    const existingExternalMedia = [];

    if (editMedia) {
      for (let i = 0; i < service.Media.length; i += 1) {
        const element = service.Media[i];
        for (let j = 0; j < prevFiles.length; j += 1) {
          const element2 = prevFiles[j];
          if (element.MediaURL !== element2.file.preview) {
            newMedia.push(element2);
          } else {
            existingMedia.push(element);
          }
        }
      }
    }

    if (editMedia) {
      for (let i = 0; i < service.ExternalMedia.length; i += 1) {
        const element = service.ExternalMedia[i];
        for (let j = 0; j < prevFiles.length; j += 1) {
          const element2 = prevFiles[j];
          if (element.Link !== element2.file.preview) {
            newExternalMedia.push(element2);
          } else {
            existingExternalMedia.push(element);
          }
        }
      }
    }
    await validatePricing();
    if (hasFiles) {
      uploadPeerServicesMediaStart()(dispatch);
      const { data } =
        filesToUpload.length > 0
          ? await saveTemporarily(
              filesToUpload.map((item, messageIndex) => ({
                [`file${messageIndex}`]: item.file,
              })),
            )
          : { data: [] };

      const getFileExtension = file => {
        if (!file) {
          return '';
        }
        if (file.Extension) {
          return file.Extension;
        }
        return !file.field
          ? file.Extension
          : file.type.split('/')[1].toUpperCase();
      };

      const getNextAction = (file = {}) => {
        if (!file.Action) {
          return UPDATE_FILE;
        }

        if (file.Action === CREATE_FILE) {
          return UPDATE_FILE;
        }

        return file.Action;
      };

      if (data) {
        const mediaToSave = !editMedia
          ? data
          : [
              ...existingMedia,
              ...data,
              ...filesToDelete.map(
                ({ Extension, MediaURL, MediaNumber }) => ({
                  Action: DELETE_FILE,
                  Extension,
                  MediaURL,
                  MediaNumber,
                }),
              ),
            ];
        Media = mediaToSave.map(file => {
          return {
            Extension: getFileExtension(file),
            MediaURL: file.MediaURL ? file.MediaURL : file.url,
            Action: !file.field ? getNextAction(file) : CREATE_FILE,
            MediaNumber: file.MediaNumber ? file.MediaNumber : '',
          };
        });
      }
    }

    const requestObj = {
      ...form,
      ServiceID: form.ServiceID || '',
      DeleteService: 'No',
      Title: form.Title,
      SubTitle: form.SubTitle,
      Address: form.Address || form.City,
      City: form.City,
      Description: form.Body,
      Category: form.Category,
      CountryCode: form.CountryCode,
      Longitude: form.Longitude,
      Latitude: form.Latitude,
      Tags: tags || [],
      PriceList: pricingForm,
      Media,
      ExternalMedia: editMedia
        ? getUpdatedExternalMediaFiles()
        : ExternalMedia,
      LinkURL: form.LinkURL || '',
      Owner: {
        ...user,
        OwnerPID: user.PID,
      },
    };

    if (updateDetails || updateMedia) {
      updateService(requestObj)(dispatch);
    } else {
      createPeerService(requestObj)(dispatch);
    }
  };

  const resetState = () => {
    setForm({});
    setTags([]);
    setPricingForm([
      {
        Currency: '',
        Price: '',
        Title: '',
      },
    ]);
    setPrevFiles([]);
    setFilesToDelete([]);
    setManageAllMedia(false);
  };

  useEffect(() => {
    if (data) {
      toast.success(
        global.translate('Your post was created successfully', 2114),
      );
      history.push({
        pathname: `/marketplace/user/me`,
        state: { service, user },
      });
      resetState();
      closeCreateModal(dispatch);
      openCreateModal({
        open: false,
        service: null,
        editMedia: false,
      })(dispatch);
      clearDeletePeerService()(dispatch);
    }
  }, [data]);

  useEffect(() => {
    if (updateServiceData) {
      toast.success(
        global.translate('Your post was updated successfully', 2115),
      );
      resetState();
      openEditPricingModal({ open: false, service: null })(dispatch);
      closeCreateModal(dispatch);
      openCreateModal({
        open: false,
        service: null,
        editMedia: false,
      })(dispatch);
      clearDeletePeerService()(dispatch);
    }
  }, [updateServiceData]);

  useEffect(() => {
    updateFileList(files);
  }, [files]);

  const formIsInvalid =
    !form.Title?.trim().length || !form.Body?.trim().length;

  const { data: categories } = useSelector(
    ({ peerServices: { categories } }) => categories,
  );

  useEffect(() => {
    if (categories.length === 0) {
      getCategories({
        Language: localStorage.language || 'en',
        CountryCodes: localStorage.countryCode
          ? [localStorage.countryCode]
          : [],
        DistanceKms: '',
        Longitude: '',
        Latitude: '',
      })(dispatch);
    }
  }, []);

  const categoryOptions = categories.map(item => ({
    key: item.Category,
    value: item.Category,
    text: item.CategoryName,
  }));

  return (
    <NewService
      formIsInvalid={formIsInvalid}
      onChange={onChange}
      form={form}
      setForm={setForm}
      handleInputChange={handleInputChange}
      pickPositionOpen={pickPositionOpen}
      setPickPositionOpen={setPickPositionOpen}
      onSubmit={onSubmit}
      error={error}
      loading={loading}
      onPricingFormChange={onPricingFormChange}
      pricingForm={pricingForm}
      dispatch={dispatch}
      prevFiles={prevFiles}
      fileToRemove={fileToRemove}
      setPricingForm={setPricingForm}
      setFileToRemove={setFileToRemove}
      setFiles={setFiles}
      setPrevFiles={setPrevFiles}
      user={user}
      categoryOptions={categoryOptions}
      onFileRemoved={onFileRemoved}
      tags={tags}
      handleTagsChange={handleTagsChange}
      setManageAllMedia={setManageAllMedia}
      manageAllMedia={manageAllMedia}
      pricingFormErrors={pricingFormErrors}
      setPricingFormErrors={setPricingFormErrors}
    />
  );
};

export default NewServiceContainer;
