import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import FeedDetailComponent from 'components/PeerServices/FeedDetail';

import getRelatedServices from 'redux/actions/peerServices/getRelatedServices';

import getService from 'redux/actions/peerServices/getService';
import setLocalService from 'redux/actions/peerServices/setLocalService';
import useGeoLocation from 'hooks/useGeoLocation';
import getServiceLinkPreview from 'redux/actions/peerServices/getServiceLinkPreview';

const ServiceDetailContainer = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const serviceIdRef = useRef(null);

  const { longitude, latitude } = useGeoLocation();
  const { service } = useSelector(state => state.peerServices);

  const [currentService, setCurrentService] = useState(null);
  const serviceId = location.pathname.split('/')?.[2];

  useEffect(() => {
    if (service.data.Data?.[0]) {
      serviceIdRef.current = service.data.Data?.[0].ServiceID;
      setCurrentService(service.data.Data?.[0]);
    }
  }, [service.data]);

  const serviceExists = false;

  const formattedService = {
    loading: false,
    data: {
      Meta: null,
      Data: serviceExists ? [currentService] : null,
    },
    error: null,
  };

  useEffect(() => {
    if (formattedService) {
      setLocalService(formattedService)(dispatch);
    }
  }, []);

  const fetchServiceDetail = service => {
    getService(
      {
        ServiceID: serviceId,
        Categories: [],
        CountryCodes: [],
        Tags: [],
        FreeText: [],
        DistanceKms: '',
        Longitude: '',
        Latitude: '',
        PageNumber: '1',
        RecordPerPage: '20',
        CommentCount: '20',
        GettingRelated: 'NO',
      },
      service,
    )(dispatch);
  };

  const fetchRelatedServices = () => {
    getRelatedServices(
      {
        ServiceID: currentService.ServiceID,
        Categories: currentService.Category
          ? [currentService.Category]
          : [],
        CountryCodes: currentService.CountryCode
          ? [currentService.CountryCode]
          : [],
        Tags: currentService.Tags || [],
        FreeText: [],
        DistanceKms: '',
        Longitude: longitude?.toString() || '',
        Latitude: latitude?.toString() || '',
        PageNumber: '1',
        RecordPerPage: '20',
        CommentCount: '20',
        GettingRelated: 'YES',
      },
      service,
    )(dispatch);
  };

  useEffect(() => {
    if (currentService?.ServiceID) {
      fetchRelatedServices();
    }
  }, [currentService?.ServiceID]);

  useEffect(() => {
    if (currentService && currentService.LinkURL !== '') {
      getServiceLinkPreview(
        currentService?.LinkURL,
        currentService.ServiceID,
      )(dispatch);
    }
  }, [currentService?.LinkURL]);

  useEffect(() => {
    if (!serviceExists) {
      fetchServiceDetail();
    }
  }, []);

  useEffect(() => {
    if (serviceIdRef.current !== serviceId) {
      fetchServiceDetail();
    }
  }, [serviceId]);

  return <FeedDetailComponent currentService={currentService} />;
};

export default ServiceDetailContainer;
