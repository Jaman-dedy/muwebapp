/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { WALLET_UPDATED } from 'constants/events/wallet';
import socketIOClient from 'services/socketIO';
import getMyWalletsAction from 'redux/actions/users/getMyWallets';
import getWalletTransactions from 'redux/actions/transactions/getWalletTransactions';
import notifAction from 'redux/actions/users/notifications';
import isAppDisplayedInWebView from 'helpers/isAppDisplayedInWebView';

export default () => {
  const dispatch = useDispatch();

  const { userData: { data } = {} } = useSelector(({ user }) => user);

  const fromDate = moment()
    .subtract(12, 'months')
    .format('YYYY-MM-DD');
  const toDate = moment().format('YYYY-MM-DD');

  const newDispatch = ({ type, payload }) => {
    delete payload.onStart;
    delete payload.onFailure;
    delete payload.onEnd;
    const action = {
      type,
      payload,
    };
    return dispatch(action);
  };

  useEffect(() => {
    if (data && data.PID) {
      socketIOClient.off(WALLET_UPDATED);
      socketIOClient.on(WALLET_UPDATED, notification => {
        getMyWalletsAction()(newDispatch);
        getWalletTransactions({
          WalletNumber: notification.data.TargetWallet,
          DateFrom: fromDate,
          DateTo: toDate,
          PageNumber: '1',
          RecordPerPage: '7',
          Proxy: 'Yes',
        })(newDispatch);

        notifAction({ PID: data.PID })(newDispatch);

        const { message } = notification || {};

        if (!isAppDisplayedInWebView()) {
          toast.success(global.translate(message));
        }
      });
    }
    return () => {
      socketIOClient.off(WALLET_UPDATED);
    };
  }, [data && data.PID]);
};
