import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import openDeleteServiceModal from 'redux/actions/peerServices/openDeleteServiceModal ';
import addCommentToService from 'redux/actions/peerServices/addCommentToService';
import deletePeerService, {
  clearDeletePeerService,
} from 'redux/actions/peerServices/deletePeerService';
import setServiceStatus from 'redux/actions/peerServices/setServiceStatus';
import updateServicePricing from 'redux/actions/peerServices/updateServicePricing';
import likePeerService from 'redux/actions/peerServices/likePeerService';
import ratePeerService from 'redux/actions/peerServices/ratePeerService';
import disLikePeerService from 'redux/actions/peerServices/disLikePeerService';
import deletePeerServiceComment from 'redux/actions/peerServices/deletePeerServiceComment';
import { UPDATE_FILE } from 'constants/general';
import { clearDeleteContact } from 'redux/actions/contacts/deleteContact';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { data: user = {} } = useSelector(
    ({ user: { userData } }) => userData,
  );
  const deleteServiceStore = useSelector(
    ({ peerServices: { deleteService } }) => deleteService,
  );
  const setServiceStatusStore = useSelector(
    ({ peerServices: { setServiceStatus } }) => setServiceStatus,
  );

  const { error: updateServicePricingError } = useSelector(
    state => state.peerServices.updateServicePricing,
  );

  const { newContact } = useSelector(state => state.contacts);

  useEffect(() => {
    if (updateServicePricingError) {
      toast.error(updateServicePricingError.Description);
    }
  }, [updateServicePricingError]);

  const deleteService = useCallback(item => {
    const payload = {
      ServiceID: item?.ServiceID,
      DeleteService: 'Yes',
      ...item,
    };
    deletePeerService(payload)(dispatch);
  }, []);

  const handleSetStoreStatus = useCallback(
    ({ Body: Description, ...item }) => {
      const payload = {
        ...item,
        Available: item.Available === 'YES' ? 'NO' : 'YES',
        DeleteService: 'No',
        Description,
        Media: item.Media.map(item => ({
          ...item,
          Action: UPDATE_FILE,
        })),
        ExternalMedia: item.ExternalMedia.map(item => ({
          ...item,
          Action: UPDATE_FILE,
        })),
      };
      setServiceStatus(payload)(dispatch);
    },
    [],
  );

  const handleAddComment = useCallback(
    (type, value, service) => {
      if (type === 'comment') {
        const payload = {
          Comment: value,
          ServiceID: service.ServiceID,
          Tumb: '',
          Rating: '',
        };

        addCommentToService(payload, {
          comment: {
            CommentOwnerPID: user?.PID,
            PictureURL: user?.PictureURL,
            Anonymous: 'NO',
            FullName: `${user?.FirstName}  ${user?.LastName}`,
            Comment: value,
            Date: new Date().toISOString(),
          },
        })(dispatch);
      }

      if (type === 'Like') {
        const payload = {
          Tumb: 'Up',
          Rating: '',
          Comment: '',
          ServiceID: service.ServiceID,
        };

        likePeerService(payload, service)(dispatch);
        return;
      }
      if (type === 'DisLike') {
        const payload = {
          Tumb: 'Dn',
          Rating: '',
          Comment: '',
          ServiceID: service.ServiceID,
        };
        disLikePeerService(payload, service)(dispatch);
      }

      if (type === 'Rating') {
        const payload = {
          Tumb: '',
          Rating: value,
          Comment: '',
          ServiceID: service.ServiceID,
        };

        ratePeerService(payload, service)(dispatch);
      }
    },
    [user],
  );

  const handleUpdateServicePricing = useCallback(
    (PriceList, { Body: Description, ...item }) => {
      const payload = {
        ...item,
        PriceList,
        DeleteService: 'No',
        Media: item.Media.map(item => ({
          ...item,
          Action: UPDATE_FILE,
        })),
        ExternalMedia: item.ExternalMedia.map(item => ({
          ...item,
          Action: UPDATE_FILE,
        })),
        Description,
      };
      updateServicePricing(payload)(dispatch);
    },
    [],
  );

  const handleDeleteServiceComment = useCallback(comment => {
    deletePeerServiceComment(comment)(dispatch);
  }, []);

  useEffect(() => {
    if (deleteServiceStore.data) {
      openDeleteServiceModal({ open: false, service: null })(
        dispatch,
      );
      clearDeletePeerService()(dispatch);

      history.push('/user-services/me');
    }
  }, [deleteServiceStore.data]);

  useEffect(() => {
    if (newContact.data) {
      clearDeleteContact()(dispatch);
    }
  }, [newContact.data]);

  return {
    deleteService,
    deleteServiceStore,
    handleSetStoreStatus,
    setServiceStatusStore,
    handleUpdateServicePricing,
    handleAddComment,
    handleDeleteServiceComment,
  };
};
