import axios from 'axios';

const {
  REACT_APP_FILE_SERVICES_URL,
  REACT_APP_LOGIN_NAME,
  REACT_APP_API_KEY,
  REACT_APP_ID,
} = process.env;

const saveTemporarily = async files => {
  const formData = new FormData();
  if (Array.isArray(files)) {
    files.map((file, index) =>
      formData.append(
        Object.keys(file)[0] || `file${index}`,
        file[Object.keys(file)[0]],
      ),
    );
  } else {
    formData.append(
      Object.keys(files)[0] || 'file',
      files[Object.keys(files)[0]],
    );
  }
  try {
    const res = await axios({
      url: `${REACT_APP_FILE_SERVICES_URL}/files`,
      method: 'POST',
      header: {
        'Content-Type': 'multipart/form-data',
        LoginName: REACT_APP_LOGIN_NAME,
        APIKey: REACT_APP_API_KEY,
        AppID: REACT_APP_ID,
      },
      data: formData,
    });

    if (res) return res.data;
    return null;
  } catch (error) {
    return error;
  }
};

export default saveTemporarily;
