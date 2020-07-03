import axiosHelper from 'helpers/axiosHelper';
import handleAxiosError from 'helpers/handleAxiosError';

const {
  REACT_APP_LOGIN_NAME,
  REACT_APP_API_KEY,
  REACT_APP_ID,
} = process.env;

const saveToBackend = async options => {
  try {
    const { MediaSourceURL, url, Type, PID, FileType } = options;
    const { data } = await axiosHelper().request({
      method: 'post',
      url,
      data: {
        LoginName: REACT_APP_LOGIN_NAME || null,
        APIKey: REACT_APP_API_KEY || null,
        AppID: REACT_APP_ID || null,
        PID: PID || null,
        MediaSourceURL,
        Type: Type || undefined,
        FileType: FileType || undefined,
      },
    });

    if (data[0].Result === 'Success')
      return {
        status: true,
        data: data[0],
      };
    return {
      status: false,
      data: data[0],
    };
  } catch (e) {
    const error = handleAxiosError(e);
    return {
      status: false,
      data: error,
    };
  }
};

export default saveToBackend;
