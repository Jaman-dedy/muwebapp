const displayTransactionType = type => {
  if (type === 'CP')
    return {
      description: 'Cash pick up in a CashPoint, or ATM',
      Action: 'Go to wallets',
      PathName: '/wallets',
    };
  if (type === 'CC')
    return {
      description: 'TransActions cancelled for voucher or send cash',
      Action: 'Go to wallets',
      PathName: '/wallets',
    };
  if (type === 'CA')
    return {
      Description:
        'Add money to wallet from Credit card, Paypal, or any future other means',
      Action: 'Go to wallets',
      PathName: '/wallets',
    };
  if (type === 'CS')
    return {
      Description: 'Cash sent from Cash CAshPoint or from the App',
      Action: 'Go to wallets',
      PathName: '/wallets',
    };
  if (type === 'CR')
    return {
      Description: 'Redeem cash from Voucher or from Virtual card',
      Action: 'Go to wallets',
      PathName: '/wallets',
    };
  if (type === 'WW')
    return {
      Description: 'Normal wallet to wallet operation',
      Action: 'Go to wallets',
      PathName: '/wallets',
    };
  if (type === 'GT')
    return {
      Description: 'Unclassified',
      Action: '',
      PathName: '/wallets',
    };
  if (type === 'FP')
    return {
      Description:
        'send money out to a partner like Wari or bank or MTN',
      Action: 'Go to wallets',
      PathName: '/wallets',
    };
  if (type === 'TP')
    return {
      Description: 'Get money from a partner',
      Action: 'Go to wallets',
      PathName: '/wallets',
    };
  if (type === 'CD')
    return {
      Description: 'Cash Deposit in CashPoints',
      action: 'Go to wallets',
      PathName: '/wallets',
    };
};

export default displayTransactionType;
