import initialState from 'redux/initial-states/peerServices';
import getCategories from './getCategories';
import openModal from './openModal';
import closeModal from './closeModal';
import createService from './createService';
import getServicesList from './getServicesList';
import getMyServices from './getMyServices';
import deleteService from './deleteService';
import setServiceStatus from './setServiceStatus';
import updateService from './updateService';
import openEditPricingModal from './openEditModal';
import getRelatedServices from './getRelatedServices';
import openDeleteServiceModal from './openDeleteServiceModal';
import searchPeerServices from './searchPeerServices';
import addCommentToService from './addCommentToService';
import openReportServiceOrComment from './openReportServiceOrComment';
import reportServiceOrComment from './reportServiceOrComment';
import likePeerService from './likePeerService';
import disLikePeerService from './disLikePeerService';
import deletePeerServiceComment from './deletePeerServiceComment';
import getService from './getService';
import setService from './setService';
import getServiceLinksMetaData from './getServiceLinksMetaData';
import ratePeerService from './ratePeerService';
import handleSidebarHide from './handleSidebarHide';
import addUserBookMark from './addUserBookMark';
import removeUserBookMark from './removeUserBookMark';
import getBookmarkedServices from './getBookmarkedServices';

export default (state = initialState, action = {}) => ({
  ...state,
  ...getCategories(state, action),
  ...openModal(state, action),
  ...closeModal(state, action),
  ...getServicesList(state, action),
  ...getMyServices(state, action),
  ...getRelatedServices(state, action),
  ...createService(state, action),
  ...deleteService(state, action),
  ...setServiceStatus(state, action),
  ...updateService(state, action),
  ...openEditPricingModal(state, action),
  ...openDeleteServiceModal(state, action),
  ...searchPeerServices(state, action),
  ...addCommentToService(state, action),
  ...openReportServiceOrComment(state, action),
  ...reportServiceOrComment(state, action),
  ...likePeerService(state, action),
  ...disLikePeerService(state, action),
  ...deletePeerServiceComment(state, action),
  ...getService(state, action),
  ...setService(state, action),
  ...getServiceLinksMetaData(state, action),
  ...ratePeerService(state, action),
  ...handleSidebarHide(state, action),
  ...addUserBookMark(state, action),
  ...removeUserBookMark(state, action),
  ...getBookmarkedServices(state, action),
});
