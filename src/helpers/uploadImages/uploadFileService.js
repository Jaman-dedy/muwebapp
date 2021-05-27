import saveTemp from './saveTemporarily';

/**
 * Upload files to the temporary server and to the backend
 * @param {File} files the file to be uploaded should have a pair or an any array of pair of key-value
 * where the value is the FIle to be uploaded
 * @param {String} url the endpoint to the backend
 * @param {String} type the Type property specified by the endpoint
 * @returns {boolean} true if success
 * @returns {object} error if there was an error
 */
const uploadFileService = async (files, url, type, PID) => {
  const res = await saveTemp(files);

  if (res.data && url) {
    const options = {
      MediaSourceURL: res.data[0]?.url,
      url,
      Type: type,
      PID,
      FileType: undefined,
    };
    return options;
  }
  return res;
};

export default uploadFileService;
