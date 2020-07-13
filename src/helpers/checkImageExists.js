import axios from 'axios';

const { REACT_APP_UPLOAD_FILE_SERVICE } = process.env;

const checkImageExists = async srcUrl => {
  const url = `${REACT_APP_UPLOAD_FILE_SERVICE}/files/compress-remote-image?source=${srcUrl}&width=10&height=10&format=jpeg
    `;

  try {
    await axios.get(url);

    return true;
  } catch (error) {
    return false;
  }
};

export default checkImageExists;
