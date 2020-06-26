import axiosHelper from 'helpers/axiosHelper';
import handleAxiosError from 'helpers/handleAxiosError';

const {
  REACT_APP_LOGIN_NAME,
  REACT_APP_API_KEY,
  REACT_APP_ID,
} = process.env;

const ConvertCurrency = async (SourceCcy, Amount, TargetCcy) => {
  try {
    const { data } = await axiosHelper().request({
      method: 'post',
      url: '/ConvertCurrency',
      data: {
        LoginName: REACT_APP_LOGIN_NAME,
        APIKey: REACT_APP_API_KEY,
        AppID: REACT_APP_ID,
        SourceCcy,
        Amount,
        TargetCcy,
      },
    });

    if (data[0].Result === 'TRUE')
      return { status: true, data: data[0] };
    return { status: false, data: data[0] };
  } catch (e) {
    const error = handleAxiosError(e);
    return { status: false, data: error };
  }
};

export default ConvertCurrency;
