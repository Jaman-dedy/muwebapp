import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MicroLoanComponent from 'components/Microloan';
import getLoanList from 'redux/actions/microloan/getLoanList';

const MicroloanContainer = () => {
  const dispatch = useDispatch();
  const {
    loanList: {
      data: listData,
      loading: listLoading,
      error: listError,
    },
  } = useSelector(({ microloan }) => microloan);
  const { userData } = useSelector(({ user }) => user);

  useEffect(() => {
    if (!listData?.length) {
      const data = {
        PageNumber: '1',
        RecordPerPage: '20',
      };
      getLoanList(data)(dispatch);
    }
  }, []);

  return (
    <MicroLoanComponent
      listData={listData}
      listLoading={listLoading}
      userData={userData?.data}
    />
  );
};

export default MicroloanContainer;
