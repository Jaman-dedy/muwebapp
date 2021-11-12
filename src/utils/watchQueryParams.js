import queryString from 'query-string';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  clearContactAction,
  setIsendingCash,
  setIsSendingMoney,
  setIsSendingOhters,
  setIsSendingVoucher,
  setIsTopingUp,
  setManageContacts,
} from 'redux/actions/dashboard/dashboard';

const useWatchQueryParams = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const { ref } = queryParams;

  const dispatch = useDispatch();

  const checkQueryParams = useCallback(() => {
    switch (ref) {
      case 'send-cash':
        setIsendingCash(dispatch);
        break;
      case 'send-money':
        setIsSendingMoney(dispatch);
        break;
      case 'to-others':
        setIsSendingOhters(dispatch);
        break;
      case 'to-up':
        setIsTopingUp(dispatch);
        break;
      case 'send-voucher':
        setIsSendingVoucher(dispatch);
        break;
      default:
        setManageContacts(dispatch);
    }

    return () => {
      clearContactAction(dispatch);
    };
  }, [ref, dispatch]);

  useEffect(() => {
    checkQueryParams();
  }, [checkQueryParams]);

  return {
    checkQueryParams,
  };
};

export default useWatchQueryParams;
