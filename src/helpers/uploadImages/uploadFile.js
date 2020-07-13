import saveTemp from './saveTemporarily';
import saveToBackend from './saveToBackend';

/**
 * Upload files to the temporary server and to the backend
 * @param {File} files the file to be uploaded should have a pair or an any array of pair of key-value
 * where the value is the FIle to be uploaded
 * @param {String} url the endpoint to the backend
 * @param {String} type the Type property specified by the endpoint
 * @returns {boolean} true if success
 * @returns {object} error if there was an error
 */
const uploadFile = async (files, url, type, PID) => {
  try {
    const res = await saveTemp(files);
    if (res.data && url) {
      const options = {
        MediaSourceURL: res.data[0].url,
        url,
        Type: type,
        PID,
        FileType: undefined,
      };
      const { status, data } = await saveToBackend(options);
      if (status) {
        return { status, data: { ...res.data, ...data } };
      }
      return { status, data: { ...res.data, ...data } };
    }
    return { status: true, data: res.data };
  } catch (error) {
    return { status: false, data: error };
  }
};

export default uploadFile;
