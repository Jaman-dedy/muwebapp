import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FileSaver from 'file-saver';
import GetPaidComponent from 'components/GetPaid';

const GetPaid = () => {
  const [selectWallet, setSelectedWallet] = useState(null);
  const {
    myWallets: { walletList },
  } = useSelector(({ user }) => user);
  useEffect(() => {
    if (walletList) {
      walletList.map(wallet => {
        if (wallet.Default === 'YES') {
          setSelectedWallet(wallet);
        }
      });
    }
  }, [walletList]);
  const onDownLoadImageHandler = () => {
    FileSaver.saveAs(
      selectWallet?.WalletQRCode,
      selectWallet?.AccountNumber,
    );
  };
  return (
    <GetPaidComponent
      walletList={walletList && walletList}
      selectWallet={selectWallet}
      setSelectedWallet={setSelectedWallet}
      onDownLoadImageHandler={onDownLoadImageHandler}
    />
  );
};

export default GetPaid;
