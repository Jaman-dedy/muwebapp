import axiosHelper from 'helpers/axiosHelper';
import handleAxiosError from 'helpers/handleAxiosError';

const saveToBackend = async (MediaSourceURL, url, Type) => {
  try {
    const { data } = await axiosHelper().request({
      method: 'post',
      url,
      data: {
        MediaSourceURL,
        Type: Type || undefined,
      },
    });

    if (data[0].Result === 'Success')
      return { status: true, data: data[0] };
    return { status: false, data: data[0] };
  } catch (e) {
    const error = handleAxiosError(e);
    return { status: false, data: error };
  }
};

export default saveToBackend;
